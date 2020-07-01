import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as authServices from '../services/auth';
import { setMe } from '../actions/auth';
import { AUTH_SIGN_IN, AUTH_GET_ME } from '../constants/auth';
import { setToken } from '../helpers/api';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* signIn(action) {
  try {
    const result = yield call(authServices.signIn, action.user);
    const { token, user } = result.data;
    
    setToken(token);
    yield put(setMe(user));
    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* getMe(action) {
  try {
    const result = yield call(authServices.getMe);

    const { user } = result.data;
    yield put(setMe(user));
    action.onSuccess();
  } catch (error) {
    action.onError(error);
  }
}

export function* watchSignIn() {
  yield takeLatest(AUTH_SIGN_IN, signIn);
}

export function* watchGetMe() {
  yield takeLatest(AUTH_GET_ME, getMe);
}

export default function* auth() {
  yield fork(watchSignIn);
  yield fork(watchGetMe);
}

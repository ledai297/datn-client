import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as services from '../services/dummy';
import { setData } from '../actions/dummy';
import { DUMMY_FETCH_DATA } from '../constants/dummy';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* fetchData(action) {
  try {
    const result = yield call(services.fetchData);
    const data = {
      user: result.data.user,
      friends: result.data.friends,
    };
    yield put(setData(data));
    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* watchFetchData() {
  yield takeLatest(DUMMY_FETCH_DATA, fetchData);
}

export default function* dummy() {
  yield fork(watchFetchData);
}

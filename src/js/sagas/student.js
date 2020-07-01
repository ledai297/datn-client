import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as studentServices from '../services/student';
import { setData } from '../actions/dummy';
import { ROLL_UP } from '../constants/student';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* rollUp(action) {
  try {
    const params = {
      lesson_id: action.lessonId,
      student_code: action.studentCode.value,
      device_id: action.deviceId,
    };
    const result = yield call(studentServices.rollUp, params);
    action.onSuccess(result);
  } catch (err) {
    action.onError(err);
  }
}

export function* watchRollUp() {
  yield takeLatest(ROLL_UP, rollUp);
}

export default function* student() {
  yield fork(watchRollUp);
}

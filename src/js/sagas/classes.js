import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as classesServices from '../services/classes';
import {
  CLASSES_FETCH_DATA,
  FETCH_CLASS_STUDENTS_ROLLED_UP,
  FETCH_CLASS_STUDENTS_BY_LESSON_ID,
} from '../constants/classes';
import { setClassesData, setClassStudentsRolledUp } from '../actions/classes';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* fetchClassesData(action) {
  try {
    const {
      keySearch,
      currentPage,
      perPage,
    } = action;
    const result = yield call(classesServices.fetchClassesData, keySearch, currentPage, perPage);
    yield put(setClassesData(result.data));

    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* fetchClassStudentsRolledUp(action) {
  try {
    const { classId, searchKey } = action;
    const result = yield call(classesServices.fetchClassStudentsRolledUp, classId, searchKey);
    yield put(setClassStudentsRolledUp(result.data));
    action.onSuccess();
  } catch (error) {
    action.onError();
  }
}

export function* fetchClassStudentsByLessonId(action) {
  try {
    const { lessonId } = action;
    const result = yield call(classesServices.fetchClassStudentsByLessonId, lessonId);
    yield put(setClassStudentsRolledUp(result.data.data));
    action.onSuccess();
  } catch (error) {
    action.onError();
  }
}

export function* watchFetchClassesData() {
  yield takeLatest(CLASSES_FETCH_DATA, fetchClassesData);
}

export function* watchFetchClassStudentsRolledUp() {
  yield takeLatest(FETCH_CLASS_STUDENTS_ROLLED_UP, fetchClassStudentsRolledUp);
}

export function* watchFetchClassStudentsByLessonId() {
  yield takeLatest(FETCH_CLASS_STUDENTS_BY_LESSON_ID, fetchClassStudentsByLessonId);
}

export default function* classes() {
  yield fork(watchFetchClassesData);
  yield fork(watchFetchClassStudentsRolledUp);
  yield fork(watchFetchClassStudentsByLessonId);
}

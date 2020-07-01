import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as lessonServices from '../services/lesson';
import {
  LESSON_FETCH_DATA, LESSON_CREATE,
  FETCH_CLASS_BY_LESSON_ID, FETCH_LESSON_STUDENTS_ROLLED_UP,
  TOGGLE_ROLL_UP, DELETE_LESSON, CONFIRM_LESSON,
  SET_START_ROLL_UP_TIME, LESSON_BATCH_CREATE,
} from '../constants/lesson';
import { setLessons, setLessonStudentsRolledUp, setClass } from '../actions/lesson';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* fetchLessons(action) {
  try {
    const {
      currentPage, perPage, classId, from, to,
    } = action;
    const result = yield call(lessonServices.fetchLessons, classId, currentPage, perPage, from, to);
    yield put(setLessons(result.data));

    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* createLesson(action) {
  try {
    const payloads = {
      class_id: action.classId,
      start_time: action.startTime,
      end_time: action.endTime,
    };

    yield call(lessonServices.createLesson, payloads);
    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* fetchLessonStudentsRolledUp(action) {
  try {
    const { lessonId, keySearch, rollUp } = action;
    const result = yield call(lessonServices.fetchLessonStudentsRolledUp, lessonId, keySearch, rollUp);
    yield put(setLessonStudentsRolledUp(result.data));
    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* fetchClassByLessonId(action) {
  try {
    const result = yield call(lessonServices.fetchClassByLessonId, action.lessonId);
    yield put(setClass(result.data.data));

    action.onSuccess();
  } catch (error) {
    action.onError(error);
  }
}

export function* toggleRollUp(action) {
  try {
    const params = {
      student_id: action.studentId,
      lesson_id: action.lessonId,
    }
    yield call(lessonServices.toggleRollUp, params);
    action.onSuccess();
  } catch (error) {
    action.onError(error);
  }
}

export function* deleteLesson(action) {
  try {
    const result = yield call(lessonServices.deleteLesson, action.lessonId);
    action.onSuccess(result.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* confirmLesson(action) {
  try {
    const result = yield call(lessonServices.confirmLesson, action.lessonId);
    action.onSuccess(result.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* setStartRollUpTime(action) {
  try {
    const result = yield call(lessonServices.setStartRollUpTime, action.lessonId, action.start);
    action.onSuccess(result.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* batchCreateLessons(action) {
  try {
    const { classId, lessons, totalLessons } = action;
    const result = yield call(lessonServices.batchCreateLessons, classId, lessons, totalLessons);
    action.onSuccess(result.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* filterByRollUpStatus(action) {
  try {
    const { lessonId, isRolledUp } = action;
    const params = {
      lesson_id: lessonId,
      is_rolled_up: isRolledUp,
    };
    const result = yield call(lessonServices.batchCreateLessons, params);
    action.onSuccess(result.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchFetchLessons() {
  yield takeLatest(LESSON_FETCH_DATA, fetchLessons);
}

export function* watchCreateLesson() {
  yield takeLatest(LESSON_CREATE, createLesson);
}

export function* watchFetchLessonStudentsRolledUp() {
  yield takeLatest(FETCH_LESSON_STUDENTS_ROLLED_UP, fetchLessonStudentsRolledUp);
}

export function* watchFetchClassByLessonId() {
  yield takeLatest(FETCH_CLASS_BY_LESSON_ID, fetchClassByLessonId);
}

export function* watchToggleRollUp() {
  yield takeLatest(TOGGLE_ROLL_UP, toggleRollUp);
}

export function* watchDeleteLesson() {
  yield takeLatest(DELETE_LESSON, deleteLesson);
}

export function* watchConfirmLesson() {
  yield takeLatest(CONFIRM_LESSON, confirmLesson);
}

export function* watchSetStartRollUpTime() {
  yield takeLatest(SET_START_ROLL_UP_TIME, setStartRollUpTime);
}

export function* watchBatchCreateLessons() {
  yield takeLatest(LESSON_BATCH_CREATE, batchCreateLessons);
}

export default function* lesson() {
  yield fork(watchFetchLessons);
  yield fork(watchCreateLesson);
  yield fork(watchFetchLessonStudentsRolledUp);
  yield fork(watchFetchClassByLessonId);
  yield fork(watchToggleRollUp);
  yield fork(watchDeleteLesson);
  yield fork(watchConfirmLesson);
  yield fork(watchSetStartRollUpTime);
  yield fork(watchBatchCreateLessons);
}

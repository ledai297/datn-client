import {
  LESSON_FETCH_DATA,
  LESSON_SET_DATA,
  LESSON_CREATE,
  FETCH_LESSON_STUDENTS_ROLLED_UP,
  SET_LESSON_STUDENTS_ROLLED_UP,
  FETCH_CLASS_BY_LESSON_ID,
  SET_CLASS,
  TOGGLE_ROLL_UP,
  DELETE_LESSON,
  CONFIRM_LESSON,
  SET_START_ROLL_UP_TIME,
  LESSON_BATCH_CREATE,
  FILTER_BY_ROLL_UP_STATUS,
} from '../constants/lesson';

export const fetchLessons = (classId, currentPage, perPage, from, to, onSuccess, onError) => ({
  type: LESSON_FETCH_DATA,
  classId,
  currentPage,
  perPage,
  from,
  to,
  onSuccess,
  onError,
});

export const setLessons = (data) => ({
  type: LESSON_SET_DATA,
  data,
});

export const createLesson = (classId, startTime, endTime, onSuccess, onError) => ({
  type: LESSON_CREATE,
  classId,
  startTime,
  endTime,
  onSuccess,
  onError,
});

export const fetchLessonStudentsRolledUp = (lessonId, keySearch, rollUp, onSuccess, onError) => ({
  type: FETCH_LESSON_STUDENTS_ROLLED_UP,
  lessonId,
  keySearch,
  rollUp,
  onSuccess,
  onError,
});

export const setLessonStudentsRolledUp = (data) => ({
  type: SET_LESSON_STUDENTS_ROLLED_UP,
  data,
});

export const fetchClassByLessonId = (lessonId, onSuccess, onError) => ({
  type: FETCH_CLASS_BY_LESSON_ID,
  lessonId,
  onSuccess,
  onError,
});

export const setClass = (data) => ({
  type: SET_CLASS,
  data,
});

export const toggleRollUp = (lessonId, studentId, onSuccess, onError) => ({
  type: TOGGLE_ROLL_UP,
  lessonId,
  studentId,
  onSuccess,
  onError,
});

export const deleteLesson = (lessonId, onSuccess, onError) => ({
  type: DELETE_LESSON,
  lessonId,
  onSuccess,
  onError,
});

export const confirmLesson = (lessonId, onSuccess, onError) => ({
  type: CONFIRM_LESSON,
  lessonId,
  onSuccess,
  onError,
});

export const setStartRollUpTime = (lessonId, start, onSuccess, onError) => ({
  type: SET_START_ROLL_UP_TIME,
  lessonId,
  start,
  onSuccess,
  onError,
});

export const batchCreateLessons = (classId, lessons, totalLessons, onSuccess, onError) => ({
  type: LESSON_BATCH_CREATE,
  classId,
  lessons,
  totalLessons,
  onSuccess,
  onError,
});

export const filterByRollUpStatus = (lessonId, isRolledUp) => ({
  type: FILTER_BY_ROLL_UP_STATUS,
  lessonId,
  isRolledUp,
})


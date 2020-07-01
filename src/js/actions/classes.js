import {
  CLASSES_FETCH_DATA,
  CLASSES_SET_DATA,
  FETCH_CLASS_STUDENTS_ROLLED_UP,
  SET_CLASS_STUDENTS_ROLLED_UP,
  FETCH_CLASS_STUDENTS_BY_LESSON_ID,
} from '../constants/classes';

export const fetchClassesData = (keySearch, currentPage, perPage, onSuccess, onError) => ({
  type: CLASSES_FETCH_DATA,
  keySearch,
  currentPage,
  perPage,
  onSuccess,
  onError,
});

export const setClassesData = (data) => ({
  type: CLASSES_SET_DATA,
  data,
});

export const fetchClassStudentsRolledUp = (classId, searchKey, onSuccess, onError) => ({
  type: FETCH_CLASS_STUDENTS_ROLLED_UP,
  classId,
  searchKey,
  onSuccess,
  onError,
});

export const setClassStudentsRolledUp = (data) => ({
  type: SET_CLASS_STUDENTS_ROLLED_UP,
  data,
});

export const fetchClassStudentsByLessonId = (lessonId, onSuccess, onError) => ({
  type: FETCH_CLASS_STUDENTS_BY_LESSON_ID,
  lessonId,
  onSuccess,
  onError,
});

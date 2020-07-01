import { api } from '../helpers/api';
import dayjs from 'dayjs';

export function fetchLessons(classId, currentPage, perPage, from, to) {
  const fromDate = from ? dayjs(from).format('YYYY-MM-DD') : '';
  const toDate = to ? dayjs(to).format('YYYY-MM-DD') : '';
  return api.get(`classes/${
    classId}/lessons?current_page=${currentPage}&per_page=${perPage}&from=${fromDate}&to=${toDate}`);
}

export function createLesson(payloads) {
  return api.post('lesson/create', payloads);
}

export function fetchLessonStudentsRolledUp(lessonId, keySearch, rollUp) {
  return api.get(`lessons/${lessonId}/students-rolled-up?key_search=${keySearch}&roll_up=${rollUp}`);
}

export function fetchClassByLessonId(lessonId) {
  return api.get(`lesson/${lessonId}/class`);
}

export function toggleRollUp(params) {
  return api.put('/student/roll-up/toggle', params);
}

export function deleteLesson(lessonId) {
  return api.delete(`/lesson/${lessonId}/delete`);
}

export function confirmLesson(lessonId) {
  return api.put(`/lesson/${lessonId}/confirm`);
}

export function setStartRollUpTime(lessonId, start) {
  return api.post(`/lessons/${lessonId}/set-start-roll-up-time`, { start });
}

export function batchCreateLessons(classId, lessons, totalLessons) {
  const params = {
    weekly_lessons: lessons,
    total_lessons: totalLessons,
  }
  return api.post(`lessons/${classId}/batch-create`, params);
}

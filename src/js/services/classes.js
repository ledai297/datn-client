import { api } from '../helpers/api';

export function fetchClassesData(keySearch, currentPage, perPage) {
  return api.get(`/classes?key_search=${(keySearch)}&current_page=${currentPage}&per_page=${perPage}`);
}

export function fetchClassStudentsRolledUp(classId, keySearch) {
  return api.get(`/classes/${classId}/students-roll-up?search_key=${keySearch}`);
}

export function fetchClassStudentsByLessonId(lessonId) {
  return api.get(`/class/${lessonId}/students`);
}

export function foo() {}

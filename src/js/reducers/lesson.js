import {
  LESSON_SET_DATA,
  LESSON_DEFAULT,
  SET_LESSON_STUDENTS_ROLLED_UP,
  SET_CLASS,
} from '../constants/lesson';

const initState = {
  data: [],
  total: 0,
  currentPage: 1,
  perPage: 10,
  detail: {},
  studentsRolledUp: [],
  classDetail: {},
};

const lesson = (state = initState, action = {}) => {
  switch (action.type) {
    case LESSON_SET_DATA: {
      const { data } = action;
      const result = { ...state };
      result.data = data.data;
      result.total = data.total;
      result.currentPage = data.current_page;
      result.perPage = data.per_page;
      result.classDetail = data.class_detail;
      return result;
    }

    case SET_LESSON_STUDENTS_ROLLED_UP: {
      const { data } = action;
      const result = { ...state };
      result.studentsRolledUp = data.students;
      result.detail = data.detail;
      return result;
    }

    case SET_CLASS: {
      const { data } = action;
      const result = { ...state };
      result.classDetail = data;
      return result;
    }

    case LESSON_DEFAULT:
      return state;
    default:
      return state;
  }
};

export default lesson;

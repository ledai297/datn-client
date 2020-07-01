import {
  CLASSES_SET_DATA,
  CLASSES_DEFAULT,
  SET_CLASS_STUDENTS_ROLLED_UP,
} from '../constants/classes';

const initState = {
  data: [],
  total: 0,
  currentPage: 1,
  perPage: 10,
  studentsRolledUp: [],
  lessonsDate: [],
};

const classes = (state = initState, action = {}) => {
  switch (action.type) {
    case CLASSES_SET_DATA: {
      const { data } = action;
      const result = { ...state };
      result.data = data.data;
      result.total = data.total;
      result.currentPage = data.current_page;
      result.perPage = data.per_page;
      return result;
    }

    case SET_CLASS_STUDENTS_ROLLED_UP: {
      const { data } = action;
      const result = { ...state };
      result.studentsRolledUp = data.students;
      result.lessonsDate = data.lessons_date;
      return result;
    }

    case CLASSES_DEFAULT:
      return state;
    default:
      return state;
  }
};

export default classes;

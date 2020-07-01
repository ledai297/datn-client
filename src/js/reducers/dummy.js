import {
  DUMMY_SET_DATA,
  DUMMY_DEFAULT,
} from '../constants/dummy';

const initState = {
  user: {},
  friends: [],
};

const dummy = (state = initState, action = {}) => {
  switch (action.type) {
    case DUMMY_SET_DATA: {
      const result = { ...state };
      result.user = action.data.user;
      result.friends = action.data.friends;
      return result;
    }
    case DUMMY_DEFAULT:
      return state;
    default:
      return state;
  }
};

export default dummy;

import {
  AUTH_SET_ME, AUTH_DEFAULT,
} from '../constants/auth';

const initState = {
  me: {}
};

const auth = (state = initState, action = {}) => {
  switch (action.type) {
    case AUTH_SET_ME: {
      const result = { ...state };
      result.me = action.data;
      return result;
    }
    case AUTH_DEFAULT:
      return state;
    default:
      return state;
  }
};

export default auth;

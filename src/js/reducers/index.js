import { combineReducers } from 'redux';
import dummy from './dummy';
import auth from './auth';
import classes from './classes';
import lesson from './lesson';
import { AUTH_LOGOUT } from '../constants/auth';
import { clearToken } from '../helpers/storage';

const appReducer = combineReducers({
  dummy,
  auth,
  classes,
  lesson,
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_LOGOUT) {
    clearToken();
    location.reload();
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;

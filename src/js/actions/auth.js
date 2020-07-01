import {
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
  AUTH_GET_ME,
  AUTH_LOGOUT,
  AUTH_SET_ME,
} from '../constants/auth';

export const signUp = (data, onSuccess, onError) => ({
  type: AUTH_SIGN_UP,
  data,
  onSuccess,
  onError,
});

export const signIn = (user, onSuccess, onError) => ({
  type: AUTH_SIGN_IN,
  user,
  onSuccess,
  onError,
});

export const getMe = (onSuccess, onError) => ({
  type: AUTH_GET_ME,
  onSuccess,
  onError,
});

export const setMe = (data) => ({
  type: AUTH_SET_ME,
  data,
});

export const logout = () => ({
  type: AUTH_LOGOUT,
});

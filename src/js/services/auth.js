import { api } from '../helpers/api';

export function signIn(user) {
  return api.post('/login', user);
}

export function getMe() {
  return api.get('/me');
}

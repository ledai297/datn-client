import { api } from '../helpers/api';

export function rollUp(params) {
  return api.post('/student/rollUp', params);
}

export function foo() {}

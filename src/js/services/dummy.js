import { api } from '../helpers/api';

export function fetchData() {
  return api.get('https://demo9847903.mockable.io/user');
}

export function foo() {}

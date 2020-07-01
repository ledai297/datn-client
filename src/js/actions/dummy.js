import {
  DUMMY_FETCH_DATA,
  DUMMY_SET_DATA,
} from '../constants/dummy';

export const fetchData = (onSuccess, onError) => ({
  type: DUMMY_FETCH_DATA,
  onSuccess,
  onError,
});

export const setData = data => ({
  type: DUMMY_SET_DATA,
  data,
});

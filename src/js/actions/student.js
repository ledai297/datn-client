import {
  ROLL_UP, FILTER_BY_ROLL_UP_STATUS,
} from '../constants/student';

export const rollUp = (lessonId, studentCode, deviceId, onSuccess, onError) => ({
  type: ROLL_UP,
  deviceId,
  lessonId,
  studentCode,
  onSuccess,
  onError,
});

export const foo = () => {};

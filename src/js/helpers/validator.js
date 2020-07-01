import validator from 'validator';
import { VALIDATE_TYPES } from './constants';

const messages = {
  required: 'This field is required',
  email: 'This field must be email format',
  min: 'This field must be more than 8 characters'
}

function validateRequired(input) {
  if (!input || validator.isEmpty(input)) {
    return messages.required;
  }
  return '';
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return messages.email;
  }

  return '';
}

function validateMinLength(value, minLength) {
  if (!value) {
    return messages.required;
  } else if (value.length < minLength) {
    return messages.min;
  } else {
    return '';
  }
}

export function getValidateErrors(value, validateTypes) {
  const errors = [];

  validateTypes.forEach(type => {
    switch(type) {
      case VALIDATE_TYPES.REQUIRED:
        if (validateRequired(value)) {
          errors.push(validateRequired(value));
        }
        break;
      case VALIDATE_TYPES.EMAIL:
        if (validateEmail(value)) {
          const emailError = validateEmail(value);
          errors.push(emailError);
        }
        break;
      case VALIDATE_TYPES.MIN:
        if (validateMinLength(value)) {
          errors.push(validateMinLength(value));
        }
        break;
      default: break;
    }
  });
  return errors;
}

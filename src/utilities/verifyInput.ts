import { UserCreateError, UserCreateInput } from '../generated/graphql';

export const verifyUserCreateData = (
  data: UserCreateInput,
): UserCreateError | null => {
  const errors: UserCreateError = {};

  let isErrored = false;
  if (data.email.length < 8 || !data.email.includes('@')) {
    errors.email = 'Invalid email format.';
    isErrored = true;
  }
  if (data.password.length < 7) {
    isErrored = true;
    errors.password =
      'Password length must be greater than or equal to 8 characters.';
  }

  if (data.fullName.length < 4) {
    isErrored = true;
    errors.fullName = 'Full Name must be greater than 4 characters.';
  }
  return isErrored ? errors : null;
};

type Inputs = {
  fullName?: string;
  email?: string;
  password?: string;
};

export type InputErrors = {
  fullName?: string;
  email?: string;
  password?: string;
};

export const verifyInput = (inputs: Inputs) => {
  let errored = false;
  const errors: InputErrors = {};
  for (let key of Object.keys(inputs)) {
    if (key === 'fullName') {
      if (inputs.fullName!.length < 4) {
        errored = true;
        errors.fullName = 'Full Name must be greater than 4 characters.';
      }
    } else if (key === 'email') {
      if (inputs.email!.length < 8 || !inputs.email!.includes('@')) {
        errors.email = 'Invalid email format.';
        errored = true;
      }
    } else if (key === 'password') {
      if (inputs.password!.length < 7) {
        errored = true;
        errors.password =
          'Password length must be greater than or equal to 8 characters.';
      }
    }
  }

  return errored ? errors : null;
};

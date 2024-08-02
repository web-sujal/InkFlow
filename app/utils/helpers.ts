import { ValidationError } from "yup";

import { AuthErrors, BlogErrors } from "~/types";

export const createAuthErrorObj = (error: ValidationError): AuthErrors => {
  const errors: AuthErrors = {};

  error.inner.forEach((validationError) => {
    validationError.path && // checking if validationError.path exists
      (errors[validationError.path as keyof AuthErrors] =
        validationError.message);
  });

  return errors;
};

export const createBlogErrorObj = (error: ValidationError): BlogErrors => {
  const errors: BlogErrors = {};

  error.inner.forEach((validationError) => {
    validationError.path && // checking if validationError.path exists
      (errors[validationError.path as keyof BlogErrors] =
        validationError.message);
  });

  return errors;
};

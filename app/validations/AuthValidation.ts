import * as yup from "yup";

const email = yup
  .string()
  .email()
  .required("Please provide a valid email address");

const password = yup
  .string()
  .min(4, "must be at least 4 characters")
  .max(12, "must be less than 12 characters")
  .required();

export const loginSchema = yup.object().shape({
  email,
  password,
});

export const signupSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email,
  password,
});

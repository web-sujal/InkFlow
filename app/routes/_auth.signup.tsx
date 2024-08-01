import { registerUser } from "@directus/sdk";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { ValidationError } from "yup";

import AuthForm from "~/components/AuthForm/AuthForm";
import directus from "~/lib/directus.server";
import { AuthErrors } from "~/types";
import { signupSchema } from "~/validations/AuthValidation";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const first_name = String(formData.get("first_name"));
  const last_name = String(formData.get("last_name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  try {
    await signupSchema.validate(data, { abortEarly: false });

    // create user
    await directus.request(
      registerUser(email, password, {
        first_name,
        last_name,
      })
    );

    return redirect("/login");
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors: AuthErrors = {};

      // checking for errors and creating error obj
      error.inner.forEach((validationError) => {
        validationError.path && // checking if validationError.path exists
          (errors[validationError.path as keyof AuthErrors] =
            validationError.message);
      });
      return json({ errors }, { status: 400 });
    }

    return json(
      { errors: { invalidCredentials: "An unknown error occurred" } },
      { status: 500 }
    );
  }
};

const Signup = () => {
  return <AuthForm type="signup" />;
};

export default Signup;

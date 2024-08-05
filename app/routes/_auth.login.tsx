import { readMe } from "@directus/sdk";
import {
  ActionFunctionArgs,
  json,
  // LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { ValidationError } from "yup";

import AuthForm from "~/components/AuthForm/AuthForm";
import directus from "~/lib/directus.server";
import { AuthErrors } from "~/types";
import { createAuthErrorObj } from "~/utils/helpers";
import { loginSchema } from "~/validations/AuthValidation";
import { commitSession, getSession } from "../sessions";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const session = await getSession(request.headers.get("cookie"));

//   if (session.has("userId")) {
//     return redirect("/");
//   }

//   const data = { error: session.get("error") };

//   return json(data, {
//     headers: {
//       "Set-Cookie": await commitSession(session),
//     },
//   });
// }

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("cookie"));

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const inputEmail = String(formData.get("email"));
  const password = String(formData.get("password"));

  try {
    await loginSchema.validate(data, { abortEarly: false });

    // logging user
    const { access_token, expires, expires_at, refresh_token } =
      await directus.login(inputEmail, password);

    // fetch userId
    await directus.setToken(access_token);
    const userData = await directus.request(readMe());
    const userId = userData.id;
    const first_name = userData.first_name;
    const last_name = userData.last_name;
    const email = userData.email;

    if (userId == null) {
      session.flash("error", "Invalid username/password");

      // Redirect back to the login page with errors.
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    // setting cookies
    access_token && session.set("access_token", access_token);
    expires && session.set("expires", String(expires));
    expires_at && session.set("expires_at", String(expires_at));
    refresh_token && session.set("refresh_token", refresh_token);

    session.set("userId", userData.id);
    first_name && session.set("first_name", first_name);
    last_name && session.set("last_name", last_name);
    email && session.set("email", email);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors: AuthErrors = createAuthErrorObj(error);
      return json({ errors }, { status: 400 });
    }

    return json(
      {
        errors: {
          invalidCredentials: "Invalid Credentials. Please retry again.",
        },
      },
      { status: 500 }
    );
  }
};

const Login = () => {
  return <AuthForm type="login" />;
};

export default Login;

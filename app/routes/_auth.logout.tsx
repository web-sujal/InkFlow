import { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/react";

import { destroySession, getSession } from "../sessions";
import directus from "~/lib/directus.server";

export const loader = async () => {
  return redirect("/");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  // logout
  try {
    await directus.logout();

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  } catch (error) {
    return json(
      { error: "Something went wrong while logging out." },
      { status: 500 }
    );
  }
};

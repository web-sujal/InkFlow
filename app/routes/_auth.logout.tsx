import { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/react";
import { logout } from "@directus/sdk";

import { destroySession, getSession } from "../sessions";
import directus from "~/lib/directus.server";

export const loader = async () => {
  return redirect("/");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const refresh_token = session.get("refresh_token");

  try {
    // refresh_token && (await directus.setToken(refresh_token));
    // await directus.logout();
    await directus.request(logout(refresh_token));
    console.log("logged out successfully :)");

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

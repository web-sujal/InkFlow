import { deleteItem } from "@directus/sdk";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import directus from "~/lib/directus.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  const id = params.id;
  invariant(id, "Missing id in params");

  try {
    await directus.request(deleteItem("Blogs", id));

    return redirect("/blogs");
  } catch (error) {
    console.log("error while deleting blog: ", (error as Error).message);

    return json(
      { error: "An unknown error occurred while deleting task" },
      { status: 500 }
    );
  }
};

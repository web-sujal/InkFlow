import { createItem } from "@directus/sdk";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { ValidationError } from "yup";

import BlogForm from "~/components/BlogForm/BlogForm";
import directus from "~/lib/directus.server";
import { getSession } from "~/sessions";
import { BlogErrors } from "~/types";
import { createBlogErrorObj } from "~/utils/helpers";
import { blogSchema } from "~/validations/BlogValidation";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = getSession(request.headers.get("cookie"));
  const userId = (await session).get("userId");

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  const full_name = String(formData.get("full_name"));

  const blog = { title, content, full_name, author: userId };

  try {
    await blogSchema.validate(data, { abortEarly: false });

    // save to directus
    await directus.request(createItem("Blogs", blog));

    return redirect("/blogs");
  } catch (error) {
    console.log("Error while creating blog: ", (error as Error).message);
    if (error instanceof ValidationError) {
      const errors: BlogErrors = createBlogErrorObj(error);
      return json({ errors }, { status: 400 });
    }

    return json(
      { errors: { unknown_error: "An unknown error occurred" } },
      { status: 500 }
    );
  }
};

const CreateBlog = () => {
  return <BlogForm type="create" />;
};

export default CreateBlog;

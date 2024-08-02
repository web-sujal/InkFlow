import { readItem, updateItem } from "@directus/sdk";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ValidationError } from "yup";

import BlogForm from "~/components/BlogForm/BlogForm";
import directus from "~/lib/directus.server";
import { Blog, BlogErrors } from "~/types";
import { createBlogErrorObj } from "~/utils/helpers";
import { blogSchema } from "~/validations/BlogValidation";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  invariant(id, "Missing id in params");

  try {
    const blog = await directus.request(readItem("Blogs", id));

    if (!blog) {
      throw new Error("Failed to fetch blog.");
    }

    return json(blog);
  } catch (error) {
    console.log("error while fetching blog data: ", error);
    return json(error);
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  invariant(id, "Missing id in params");

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  const full_name = String(formData.get("full_name"));

  const blog = { title, content, full_name };

  try {
    await blogSchema.validate(data, { abortEarly: false });

    // save to directus
    await directus.request(updateItem("Blogs", id, blog));

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

const EditBlog = () => {
  const blog = useLoaderData<typeof loader>() as Blog;

  return <BlogForm type="edit" blog={blog} />;
};

export default EditBlog;

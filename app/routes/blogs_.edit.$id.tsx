import { readItem, updateItem, uploadFiles } from "@directus/sdk";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import BlogForm from "~/components/BlogForm/BlogForm";
import directus from "~/lib/directus.server";
import { getSession } from "~/sessions";
import { Blog } from "~/types";

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

  // fetch userId from session cookie
  const session = getSession(request.headers.get("cookie"));
  const userId = (await session).get("userId");

  const formData = await request.formData();

  // extracting details form formData
  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  const full_name = String(formData.get("full_name"));
  const featured_image = formData.get("featured_image") as File;

  console.log("edit: ", {
    title,
    content,
    full_name,
    featured_image,
    id,
    userId,
  });

  let imageId: string | undefined;

  try {
    // update blog if no image is provided
    if (!featured_image.size) {
      console.log("inside no featured img if block");
      const newBlogWithoutImg = {
        title,
        content,
        full_name,
      };

      await directus.request(updateItem("Blogs", id, newBlogWithoutImg));
      console.log("inside no featured img if block: success");
      return redirect("/blogs");
    }

    // upate blog when image is provided
    if (featured_image.size && featured_image instanceof Blob) {
      const imageData = new FormData();
      imageData.append("file", featured_image);

      userId && imageData.append("uploaded_by", userId);

      const result = await directus.request(uploadFiles(imageData));
      imageId = result.id;
    }

    const image_url = `${process.env.DIRECTUS_URL}/assets/${imageId}`;
    console.log("image_url: ", image_url); // getting a working url for img

    const newBlog = {
      title,
      content,
      full_name,
      featured_image: imageId,
      image_url,
    };

    // save to directus
    await directus.request(updateItem("Blogs", id, newBlog));
    return redirect("/blogs");
  } catch (error) {
    console.log("Error while creating blog: ", (error as Error).message);
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

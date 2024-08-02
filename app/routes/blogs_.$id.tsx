import { readItem } from "@directus/sdk";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import BlogCard from "~/components/BlogCard/BlogCard";
import directus from "~/lib/directus.server";
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

const BlogPost = () => {
  const blog = useLoaderData<typeof loader>() as Blog;

  return <BlogCard blog={blog} />;
};

export default BlogPost;

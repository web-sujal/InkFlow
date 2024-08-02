import axios from "axios";

import { getSession } from "~/sessions";
import { Blog } from "~/types";
import directus from "./directus.server";
import { createItem } from "@directus/sdk";

// BLOG

export const addBlog = async (
  blog: Pick<Blog, "title" | "content" | "full_name">
) => {
  console.log("inside action: ");
  try {
    const res = await directus.request(
      createItem("Blogs", {
        title: blog.title,
        content: blog.content,
        full_name: blog.full_name,
      })
    );

    console.log("successful: ", res);

    return res;
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};

// AUTH

export const getUserDetails = async (request: Request) => {
  const session = getSession(request.headers.get("cookie"));

  const access_token = (await session).get("access_token");
  console.log("access_token: ", access_token);

  // fetch user object
  const user = await axios.get(`${process.env.DIRECTUS_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  console.log("user object: ", user.data);
};

import { readItems } from "@directus/sdk";
import { Flex } from "@mantine/core";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import BlogCard from "~/components/BlogCard/BlogCard";
import directus from "~/lib/directus.server";
import { Blog } from "~/types";

export const loader = async () => {
  try {
    const blogs = await directus.request(
      readItems("Blogs", { sort: ["-created_at"] })
    );

    if (!blogs) {
      throw new Error("failed to fetch blogs");
    }

    return json(blogs);
  } catch (error) {
    console.log("error while fetching blogs: ", (error as Error).message);
    return json(error);
  }
};

const BlogsPage = () => {
  const blogs = useLoaderData<typeof loader>() as Blog[];

  return (
    <Flex
      h="93vh"
      w="100%"
      justify="flex-start"
      mt={50}
      pb={50}
      wrap="wrap"
      gap="md"
      rowGap={20}
    >
      {blogs.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}
    </Flex>
  );
};

export default BlogsPage;

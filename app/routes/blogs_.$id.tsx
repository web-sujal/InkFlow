import { readItem } from "@directus/sdk";
import { Box, Button, Group, Image, Stack } from "@mantine/core";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import directus from "~/lib/directus.server";
import { Blog, User } from "~/types";

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
  const user = useOutletContext<User>();

  const submit = useSubmit();

  const handleDelete = () => {
    const response = confirm("Please confirm you want to delete this task.");

    if (response) {
      submit(null, { method: "delete", action: `/delete/${blog?.id}` });
    }
  };

  return (
    <Stack py={20}>
      <Image src={blog.image_url} alt={blog.title} />

      <Box dangerouslySetInnerHTML={{ __html: blog.content }} />

      {/* edit and delete blog */}
      {user.userId === blog.author && (
        <Group gap="lg">
          <Button component={Link} to={`/blogs/edit/${blog.id}`}>
            Edit
          </Button>

          <Button type="button" onClick={handleDelete} bg="red">
            Delete
          </Button>
        </Group>
      )}
    </Stack>
  );
};

export default BlogPost;

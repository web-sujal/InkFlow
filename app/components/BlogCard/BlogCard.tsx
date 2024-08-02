import { Card, Center, Group, rem, Text, useMantineTheme } from "@mantine/core";
import { Link, useOutletContext, useSubmit } from "@remix-run/react";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { Blog } from "~/types";
import classes from "./BlogCard.module.css";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const theme = useMantineTheme();
  const userId = useOutletContext();

  const submit = useSubmit();

  const handleDelete = () => {
    const response = confirm("Please confirm you want to delete this task.");

    if (response) {
      submit(blog.id, { method: "delete", action: `/blogs/delete/${blog.id}` });
    }
  };

  return (
    <Card
      shadow="lg"
      className={classes.card}
      radius="md"
      w={{ sm: "80vw", md: "300px", xl: "400px" }}
      component={Link}
      to={blog.id}
    >
      <div
        className={classes.image}
        style={{
          // TODO: update url from blog
          backgroundImage: `url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" truncate="end" className={classes.title} fw={500}>
            {blog.title}
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="sm" truncate="end" className={classes.author}>
              {blog.full_name}
            </Text>

            {/* edit and delete blog */}
            {userId === blog.author && (
              <Group gap="lg">
                <Center>
                  <IconEdit
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={theme.colors.dark[2]}
                  />
                  <Text
                    size="sm"
                    component={Link}
                    to={`/blogs/edit/${blog.id}`}
                    className={classes.bodyText}
                  >
                    Edit
                  </Text>
                </Center>
                <Center>
                  <IconTrash
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={theme.colors.red[4]}
                  />
                  <Text
                    size="sm"
                    onClick={handleDelete}
                    className={classes.bodyText}
                  >
                    Delete
                  </Text>
                </Center>
              </Group>
            )}
          </Group>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;

import { Card, Center, Group, Text } from "@mantine/core";
import { Link, useOutletContext } from "@remix-run/react";

import { Blog } from "~/types";
import classes from "./BlogCard.module.css";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const userId = useOutletContext();

  return (
    <Card
      shadow="lg"
      className={classes.card}
      radius="md"
      w={{ sm: "80vw", md: "300px", xl: "400px" }}
      // component={Link}
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
          <Text
            size="lg"
            component={Link}
            to={blog.id}
            truncate="end"
            className={classes.title}
            fw={500}
          >
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
                  <Text
                    size="xl"
                    c="white"
                    component={Link}
                    to={`/blogs/edit/${blog.id}`}
                    className={classes.bodyText}
                  >
                    Edit
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

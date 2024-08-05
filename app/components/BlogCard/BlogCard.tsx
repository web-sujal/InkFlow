import { Card, Center, Group, Text } from "@mantine/core";
import { Link, useOutletContext } from "@remix-run/react";

import { Blog, User } from "~/types";
import classes from "./BlogCard.module.css";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const user = useOutletContext<User>();

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
          backgroundImage: `url(${blog.image_url})`,
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
            {user.userId === blog.author && (
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

import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import { Card, Text, Group, Center, rem, useMantineTheme } from "@mantine/core";
import { Link } from "@remix-run/react";

import classes from "./BlogCard.module.css";
import { Blog } from "~/types";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const theme = useMantineTheme();

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
              {blog.content}
            </Text>

            <Group gap="lg">
              <Center>
                <IconEye
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  7847
                </Text>
              </Center>
              <Center>
                <IconMessageCircle
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  5
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;

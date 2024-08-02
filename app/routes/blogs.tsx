import { Flex } from "@mantine/core";

import BlogCard from "~/components/BlogCard/BlogCard";
import mockBlogs from "~/mockData";

const BlogsPage = () => {
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
      {mockBlogs.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}
    </Flex>
  );
};

export default BlogsPage;

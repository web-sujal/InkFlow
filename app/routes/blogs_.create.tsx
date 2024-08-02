import { useOutletContext } from "@remix-run/react";

import BlogForm from "~/components/BlogForm/BlogForm";

const CreateBlog = () => {
  const userId = useOutletContext();

  return <BlogForm type="create" />;
};

export default CreateBlog;

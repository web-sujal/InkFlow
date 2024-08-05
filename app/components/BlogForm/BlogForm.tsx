import {
  Button,
  FileInput,
  Image,
  Paper,
  rem,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";

import { IconFileCv } from "@tabler/icons-react";
import { useState } from "react";
import { Blog, BlogErrors, User } from "~/types";
import Tiptap from "../TipTap/TipTap";
import classes from "./BlogForm.module.css";

interface BlogFormProps {
  blog?: Blog;
  type: "create" | "edit";
}

const BlogForm = ({ type, blog }: BlogFormProps) => {
  const actionData = useActionData<{ errors?: BlogErrors }>();
  const formErrors = actionData?.errors || {};

  const [content, setContent] = useState("");

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const user = useOutletContext<User>();
  const submit = useSubmit();

  const defaultContent = blog?.content || "<p>welcome to inkflow</p>";

  const handleDelete = () => {
    const response = confirm("Please confirm you want to delete this task.");

    if (response) {
      submit(null, { method: "delete", action: `/delete/${blog?.id}` });
    }
  };

  return (
    <Stack mt={50} gap={20} pb={50} w="100%">
      {blog && blog.image_url && (
        <Image src={blog.image_url} alt="blog image" />
      )}

      <Title ta="center" className={classes.title}>
        {type === "create" ? "Let your thoughts flow" : "Edit post"}
      </Title>

      {/* Form */}
      <Paper
        withBorder
        shadow="md"
        w="80vw"
        mx="auto"
        p={30}
        mt={10}
        radius="md"
      >
        <Form method="post" encType="multipart/form-data">
          {/* Title */}
          <TextInput
            label="Title"
            name="title"
            placeholder="Try writing something unique and captivating."
            error={formErrors?.title}
            defaultValue={blog?.title || ""}
            required
            mb="xl"
          />

          {/* content rich text area */}
          <Text fz="sm" fw={500}>
            Content{" "}
            <Text component="span" fz="xs" c="red">
              *
            </Text>
          </Text>
          <Tiptap content={defaultContent} onChange={setContent} />

          <input
            name="content"
            value={content}
            defaultValue={blog?.content || ""}
            hidden
          />

          {/* Feature Image */}
          <FileInput
            mt="xl"
            label="Feature Image"
            name="featured_image"
            placeholder="Please select an image for your blog post"
            accept="image/png,image/jpeg"
            // error="Invalid name"
            rightSection={
              <IconFileCv
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
          />

          {/* Full Name */}
          <TextInput
            mt="xl"
            label="Full Name"
            name="full_name"
            defaultValue={
              type === "edit"
                ? blog?.full_name
                : `${user.first_name} ${user.last_name}`
            }
            // disabled
            error={formErrors?.full_name}
            required
          />

          {/* Submit Button */}
          <Button type="submit" fullWidth mt="xl">
            {type === "create" &&
              (isSubmitting ? "Creating..." : "Create Post")}
            {type === "edit" && (isSubmitting ? "Updating..." : "Update Post")}
          </Button>

          {/* Delete Button */}
          {type === "edit" && (
            <Button
              type="button"
              onClick={handleDelete}
              bg="red"
              fullWidth
              mt="sm"
            >
              Delete
            </Button>
          )}

          {/* Invalid Credentials Error */}
          {formErrors.unknown_error && (
            <Text c="red" size="sm" mt="md">
              {formErrors.unknown_error}
            </Text>
          )}
        </Form>
      </Paper>
    </Stack>
  );
};

export default BlogForm;

/*
    Content 
  <Box mt="xl">
    <Text>
      Content{" "}
      <Text component="span" c="red">
        *
      </Text>
    </Text>
    <RichTextEditorComp />
  </Box> 

  
            Content Textarea 
            <Textarea
            mt="xl"
            label="Content"
            name="content"
            withAsterisk
            defaultValue={blog?.content || ""}
            error={formErrors?.content}
            placeholder="what's on your mind..."
            rows={4}
          /> 
  
*/

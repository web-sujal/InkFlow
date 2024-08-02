import {
  Button,
  Paper,
  Stack,
  Textarea,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import { Blog, BlogErrors } from "~/types";
import classes from "./BlogForm.module.css";

interface BlogFormProps {
  blog?: Blog;
  type: "create" | "edit";
}

const BlogForm = ({ type, blog }: BlogFormProps) => {
  const actionData = useActionData<{ errors?: BlogErrors }>();
  const formErrors = actionData?.errors || {};

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Stack mt={50} gap={20} pb={50} w="100%">
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
        <Form method="post">
          {/* Title */}
          <TextInput
            label="Title"
            name="title"
            placeholder="Try writing something unique and captivating."
            error={formErrors?.title}
            defaultValue={blog?.title || ""}
            required
          />

          {/* Content Textarea */}
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

          {/* Full Name */}
          <TextInput
            mt="xl"
            label="Full Name"
            name="full_name"
            defaultValue={blog?.full_name || ""}
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
*/

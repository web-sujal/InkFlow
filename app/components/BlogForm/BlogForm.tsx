import { Button, Container, Paper, TextInput, Title } from "@mantine/core";
import { Form, useNavigation, useOutletContext } from "@remix-run/react";

import { Blog } from "~/types";
import classes from "./BlogForm.module.css";

interface BlogFormProps {
  blog?: Blog;
  type: "create" | "edit";
}

const BlogForm = ({ type, blog }: BlogFormProps) => {
  // const actionData = useActionData<{ errors?: BlogErrors }>();
  // const formErrors = actionData?.errors || {};
  const userId = useOutletContext();

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Container size={420} mt={75}>
      <Title ta="center" className={classes.title}>
        {type === "create" ? "Let your thoughts flow" : "Edit post"}
      </Title>

      {/* Form */}
      <Paper withBorder shadow="md" p={30} mt={10} radius="md">
        <Form method="post">
          {/* Title */}
          <TextInput
            label="Title"
            name="title"
            placeholder="Why inkflow is the best blog platform."
            // error={formErrors?.first_name}
            required
          />

          {/* Content */}
          <TextInput
            label="Content"
            name="content"
            placeholder="becaue it provides the best ui/ux and is totally free :)"
            mt="md"
            // error={formErrors?.last_name}
            required
          />

          {/* Submit Button */}
          <Button type="submit" fullWidth mt="xl">
            {type === "create" &&
              (isSubmitting ? "Creating..." : "Create Post")}
            {type === "edit" && (isSubmitting ? "Updating..." : "Update Post")}
          </Button>

          {/* Invalid Credentials Error */}
          {/* {formErrors.invalidCredentials && (
            <Text c="red" size="sm" mt="md">
              {formErrors.invalidCredentials}
            </Text>
          )} */}
        </Form>
      </Paper>
    </Container>
  );
};

export default BlogForm;

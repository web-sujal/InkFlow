import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

import classes from "./AuthForm.module.css";
import { AuthErrors } from "~/types";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const actionData = useActionData<{ errors?: AuthErrors }>();
  const formErrors = actionData?.errors || {};

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    // TODO: fix margin top styles later bases on screen size
    <Container size={420} mt={50} pb={50}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      {/* Redirect */}
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {type === "signup" ? (
          <>
            Already have an account?{" "}
            <Anchor size="sm" component={Link} to="/login">
              Login
            </Anchor>
          </>
        ) : (
          <>
            Do not have an account yet?{" "}
            <Anchor size="sm" component={Link} to="/signup">
              Create account
            </Anchor>
          </>
        )}
      </Text>

      {/* Form */}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form method="post">
          {/* First Name && Last Name */}
          {type === "signup" && (
            <>
              <TextInput
                label="First Name"
                name="first_name"
                placeholder="John"
                error={formErrors?.first_name}
                required
              />
              <TextInput
                label="Last Name"
                name="last_name"
                placeholder="Doe"
                mt="md"
                error={formErrors?.last_name}
                required
              />
            </>
          )}

          {/* Email */}
          <TextInput
            label="Email"
            name="email"
            placeholder="you@gmail.com"
            mt="md"
            error={formErrors?.email}
            required
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            placeholder="Your password"
            name="password"
            mt="md"
            error={formErrors?.password}
            required
          />

          {/* Remember me && Forgot Password */}
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" name="remember_me" />{" "}
            {/* TODO: add fn later */}
            <Anchor component={Link} to="/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          {/* Submit Button */}
          <Button type="submit" fullWidth mt="xl">
            {type === "login" && (isSubmitting ? "Logging in..." : "Log in")}
            {type === "signup" && (isSubmitting ? "Registering..." : "Sign up")}
          </Button>

          {/* Invalid Credentials Error */}
          {formErrors.invalidCredentials && (
            <Text c="red" size="sm" mt="md">
              {formErrors.invalidCredentials}
            </Text>
          )}
        </Form>
      </Paper>
    </Container>
  );
};

export default AuthForm;

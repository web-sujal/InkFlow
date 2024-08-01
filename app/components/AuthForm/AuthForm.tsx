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
import { Form, Link, useNavigation } from "@remix-run/react";

import classes from "./AuthForm.module.css";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    // fix margin top styles later bases on screen size
    <Container size={420} mt={75}>
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
      <Paper
        component={Form}
        method="post"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
      >
        {/* Full Name */}
        {type === "signup" && (
          <TextInput label="Full Name" placeholder="John Doe" required />
        )}

        {/* Email */}
        <TextInput label="Email" placeholder="you@gmail.com" mt="md" required />

        {/* Password */}
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />

        {/* Remember me && Forgot Password */}
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" /> {/* TODO: add fn later */}
          <Anchor component={Link} to="/forgot-password" size="sm">
            Forgot password?
          </Anchor>
        </Group>

        {/* Submit Button */}
        <Button type="submit" fullWidth mt="xl">
          {type === "login" && (isSubmitting ? "Logging in..." : "Log in")}
          {type === "signup" && (isSubmitting ? "Creating..." : "Sign up")}
        </Button>
      </Paper>
    </Container>
  );
};

export default AuthForm;

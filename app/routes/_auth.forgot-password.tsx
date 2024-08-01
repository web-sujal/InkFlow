import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Form, Link } from "@remix-run/react";

import classes from "./styles/ForgotPassword.module.css";

const ForgotPassword = () => {
  return (
    // fix margin top styles later bases on screen size
    <Container size={460} mt={75}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper
        component={Form}
        method="post"
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
      >
        {/* Email */}
        <TextInput
          label="Your email"
          placeholder="johndoe@gmail.com"
          required
        />

        {/* Redirect and submit button */}
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor
            c="dimmed"
            component={Link}
            to="/login"
            size="sm"
            className={classes.control}
          >
            <Center inline>
              <IconArrowLeft
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button type="submit" className={classes.control}>
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;

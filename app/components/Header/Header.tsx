import {
  Burger,
  Button,
  Drawer,
  Group,
  NavLink,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Link,
  NavLink as NavLinkRemix,
  useOutletContext,
  useSubmit,
} from "@remix-run/react";

import classes from "./Header.module.css";

const links = [
  { path: "/", label: "Home" },
  { path: "/blogs", label: "Blogs" },
  { path: "/pricing", label: "Pricing" },
];

export default function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);
  const userId = useOutletContext();
  console.log("userId header: ", userId);

  const submit = useSubmit();

  const handleLogout = () => {
    submit(null, { action: "/logout", method: "post" });
  };

  return (
    <Group grow component="header" align="center" justify="space-between">
      {/* Logo */}
      <Link to="/">
        <Title order={3} fw={700} w="fit">
          InkFlow
        </Title>
      </Link>

      {/* Links  */}
      <Group grow gap={10} visibleFrom="sm">
        {links.map((link) => (
          <NavLink
            key={link.label}
            component={NavLinkRemix}
            to={link.path}
            label={link.label}
            variant="subtle"
            className={classes.btn}
          />
        ))}
      </Group>

      {/* Login Signup */}
      <Group justify="flex-end" visibleFrom="sm">
        {userId ? (
          <>
            <Button
              component={Link}
              to="/blogs/create"
              variant="outline"
              visibleFrom="md"
            >
              Create Post
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              variant="subtle"
              visibleFrom="md"
            >
              Log in
            </Button>
            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </>
        )}
      </Group>

      {/* Mobile menu */}
      <Group hiddenFrom="sm" justify="flex-end">
        <Burger opened={opened} onClick={toggle} size="sm" />
      </Group>

      {/* Mobile drawer */}
      <Drawer opened={opened} position="right" onClose={toggle}>
        <Stack align="center" justify="center" gap={10} h={"75vh"}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              component={NavLinkRemix}
              to={link.path}
              label={link.label}
              variant="subtle"
              className={classes.btn}
              onClick={toggle}
            />
          ))}

          {/* CTA */}
          {userId ? (
            <>
              <Button component={Link} to="/blogs/create" variant="outline">
                Create Post
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" variant="subtle" w="100px">
                Log in
              </Button>
              <Button component={Link} to="/signup" w="100px">
                Sign up
              </Button>
            </>
          )}

          {/* Cloose icon */}
          <Button variant="outline" onClick={toggle} w="100px">
            X
          </Button>
        </Stack>
      </Drawer>
    </Group>
  );
}

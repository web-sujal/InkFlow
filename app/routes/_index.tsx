import { Button, Container } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Container fluid py={10} h="100%" bg={"var(--mantine-color-blue-light)"}>
      <Header />
      <Button>Cherry Pink</Button>
    </Container>
  );
}

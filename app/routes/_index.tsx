import { Box, Container } from "@mantine/core";
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
    <Container w="lg">
      <Box bg="var(--mantine-color-blue-light)">
        All elements inside Center are centered
      </Box>
    </Container>
  );
}

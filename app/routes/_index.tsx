import { Box } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "InkFlow" },
    { name: "description", content: "Flow with Creativity" },
  ];
};

export default function Index() {
  return <Box></Box>;
}

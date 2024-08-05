import { Box } from "@mantine/core";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "InkFlow" },
    { name: "description", content: "Flow with Creativity" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const access_token = session.get("access_token");

  return json(access_token);
};

export default function Index() {
  const access_token = useLoaderData<typeof loader>();

  return (
    <Box>
      {/* <img
        src={`https://tfr7um8q9v.tribecrafter.app/assets/11105659-8c15-4b06-8889-31ab7fb7d27b?accesstoken=${access_token}`}
        alt="kkjkj"
      /> */}
    </Box>
  );
}

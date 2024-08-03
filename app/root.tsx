import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, Container, MantineProvider } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import "@mantine/tiptap/styles.css";

import { theme } from "./theme";
import { getSession } from "./sessions";
import Header from "./components/Header/Header";
import { User } from "./types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("cookie"));

  const user: User = {};

  if (session.has("userId")) {
    user.userId = session.get("userId");
    user.first_name = session.get("first_name");
    user.last_name = session.get("last_name");
    user.email = session.get("email");

    return json(user);
  }

  return json(user);
};

export function Layout() {
  const user = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Container
            fluid
            py={10}
            px={{ lg: 50, xl: 100 }}
            h="100vh"
            bg={theme.colors.bgPaper[0]}
          >
            <Header user={user} />

            <Outlet context={user} />
          </Container>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

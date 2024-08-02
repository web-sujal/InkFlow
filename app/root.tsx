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

import { theme } from "./theme";
import Header from "./components/Header/Header";
import { getSession } from "./sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("cookie"));

  let userId = null;

  if (session.has("userId")) {
    userId = session.get("userId");
    return json(userId);
  }

  return json(userId);
};

export function Layout() {
  const userId = useLoaderData<typeof loader>();

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
            <Header />

            <Outlet context={userId} />
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

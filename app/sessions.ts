import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  access_token: string;
  expires: string;
  expires_at: string;
  refresh_token: string;
  userId: string;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "user-session",
      secrets: ["inkfl0w"],

      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  });

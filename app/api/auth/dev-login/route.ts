import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/server/contracts/auth/login";
import {
  ACCESS_TOKEN_MAX_AGE_SECONDS,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_JSON,
  getBaseCookieOptions,
  getAccessTokenCookieOptions,
  REFRESH_TOKEN_MAX_AGE_SECONDS,
} from "../_cookies";

export async function GET(req: NextRequest) {
  // Dev-only helper to test browser flows without fighting form automation.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const next = req.nextUrl.searchParams.get("next") ?? "/dashboard";

  const auth = await signIn({ email: "test@test.com", password: "123" });

  const res = NextResponse.redirect(new URL(next, req.url));
  const base = getBaseCookieOptions();
  const accessTokenOptions = getAccessTokenCookieOptions();

  res.cookies.set(COOKIE_ACCESS_TOKEN, auth.access_token, {
    ...accessTokenOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });
  res.cookies.set(COOKIE_REFRESH_TOKEN, auth.refresh_token, {
    ...base,
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });
  res.cookies.set(COOKIE_USER_JSON, JSON.stringify(auth.user), {
    ...base,
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });

  return res;
}



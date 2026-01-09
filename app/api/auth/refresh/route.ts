import { NextRequest, NextResponse } from "next/server";
import { refresh } from "@/server/contracts/auth/login";
import {
  ACCESS_TOKEN_MAX_AGE_SECONDS,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_JSON,
  getBaseCookieOptions,
  REFRESH_TOKEN_MAX_AGE_SECONDS,
} from "../_cookies";

export async function POST(req: NextRequest) {
  const refresh_token = req.cookies.get(COOKIE_REFRESH_TOKEN)?.value ?? "";

  if (!refresh_token) {
    return NextResponse.json({ error: "Missing refresh token" }, { status: 401 });
  }

  const auth = await refresh({ refresh_token });

  const res = NextResponse.json({ user: auth.user });
  const base = getBaseCookieOptions();

  res.cookies.set(COOKIE_ACCESS_TOKEN, auth.access_token, {
    ...base,
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



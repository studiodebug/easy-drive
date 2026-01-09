import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_JSON,
  getBaseCookieOptions,
} from "../_cookies";

export async function GET(req: NextRequest) {
  // Dev-only helper to test browser flows without JS.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const next = req.nextUrl.searchParams.get("next") ?? "/auth/login";

  const res = NextResponse.redirect(new URL(next, req.url));
  const base = getBaseCookieOptions();

  res.cookies.set(COOKIE_ACCESS_TOKEN, "", { ...base, maxAge: 0 });
  res.cookies.set(COOKIE_REFRESH_TOKEN, "", { ...base, maxAge: 0 });
  res.cookies.set(COOKIE_USER_JSON, "", { ...base, maxAge: 0 });

  return res;
}



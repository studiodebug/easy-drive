import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_JSON,
  getBaseCookieOptions,
} from "../_cookies";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  const base = getBaseCookieOptions();

  res.cookies.set(COOKIE_ACCESS_TOKEN, "", { ...base, maxAge: 0 });
  res.cookies.set(COOKIE_REFRESH_TOKEN, "", { ...base, maxAge: 0 });
  res.cookies.set(COOKIE_USER_JSON, "", { ...base, maxAge: 0 });

  return res;
}



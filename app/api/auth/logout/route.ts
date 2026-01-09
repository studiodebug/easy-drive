import { NextRequest, NextResponse } from "next/server";
import { signOut } from "@/server/contracts/auth/login";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_JSON,
  getBaseCookieOptions,
} from "../_cookies";

export async function POST(req: NextRequest) {
  const access_token = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value ?? "";

  // Call mocked signOut endpoint (optional, but keeps parity with real backend flow).
  if (access_token) {
    await signOut({ access_token });
  }

  const res = NextResponse.json({ ok: true });
  const base = getBaseCookieOptions();

  res.cookies.set(COOKIE_ACCESS_TOKEN, "", { ...base, maxAge: 0 });
  res.cookies.set(COOKIE_REFRESH_TOKEN, "", { ...base, maxAge: 0 });
  res.cookies.set(COOKIE_USER_JSON, "", { ...base, maxAge: 0 });

  return res;
}



import { NextResponse } from "next/server";
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

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { email?: string; password?: string }
      | null;

    if (!body?.email || !body?.password) {
      return NextResponse.json({ error: "Missing email/password" }, { status: 400 });
    }

    const auth = await signIn({ email: body.email, password: body.password });


    const res = NextResponse.json({ user: auth.user });
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

    // Store user payload server-side as well (HttpOnly) so server components can render user info safely.
    res.cookies.set(COOKIE_USER_JSON, JSON.stringify(auth.user), {
      ...base,
      maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
    });

    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email ou senha inválidos";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}



import { confirmEmail } from "@/server/contracts/auth/login";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_TOKEN_MAX_AGE_SECONDS,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_JSON,
  getBaseCookieOptions,
  getAccessTokenCookieOptions,
  REFRESH_TOKEN_MAX_AGE_SECONDS,
} from "@/app/api/auth/_cookies";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? searchParams.get("token_hash");
  const next = searchParams.get("next") ?? "/";

  if (!token) {
    redirect(`/auth/error?error=No token hash or type`);
  }

  try {
    const auth = await confirmEmail({ token });

    const userForCookies = {
      id: auth.user.id.toString(),
      email: auth.user.email,
      name: auth.user.name,
      avatar_url: auth.user.avatar_url,
    };

    const res = NextResponse.redirect(new URL(next, request.url));
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
    res.cookies.set(COOKIE_USER_JSON, JSON.stringify(userForCookies), {
      ...base,
      maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
    });

    return res;
  } catch {
    redirect(`/auth/error?error=Link de confirmação inválido ou expirado`);
  }
}

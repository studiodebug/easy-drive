import { AuthUser } from "@/types/user";

type CookieOptions = {
  maxAgeSeconds?: number;
  path?: string;
  sameSite?: "Lax" | "Strict" | "None";
  secure?: boolean;
};

export const COOKIE_ACCESS_TOKEN = "access_token";
export const COOKIE_REFRESH_TOKEN = "refresh_token";
export const COOKIE_USER_JSON = "auth_user";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const part of cookies) {
    const eqIdx = part.indexOf("=");
    const key = eqIdx >= 0 ? part.slice(0, eqIdx) : part;
    if (key === name) {
      const raw = eqIdx >= 0 ? part.slice(eqIdx + 1) : "";
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    }
  }
  return null;
}

export function setCookie(name: string, value: string, opts: CookieOptions = {}) {
  if (typeof document === "undefined") return;
  const path = opts.path ?? "/";
  const sameSite = opts.sameSite ?? "Lax";
  const secure =
    opts.secure ??
    (typeof window !== "undefined"
      ? window.location.protocol === "https:"
      : false);

  let cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=${path}; SameSite=${sameSite}`;
  if (typeof opts.maxAgeSeconds === "number")
    cookie += `; Max-Age=${opts.maxAgeSeconds}`;
  if (secure) cookie += "; Secure";
  document.cookie = cookie;
}

export function deleteCookie(
  name: string,
  opts: Pick<CookieOptions, "path" | "sameSite"> = {}
) {
  // Expire immediately
  setCookie(name, "", { ...opts, maxAgeSeconds: 0 });
}

export function readAuthUserFromCookies(): AuthUser | null {
  const access_token = getCookie(COOKIE_ACCESS_TOKEN);
  const refresh_token = getCookie(COOKIE_REFRESH_TOKEN);
  const userJson = getCookie(COOKIE_USER_JSON);

  if (!access_token || !refresh_token || !userJson) return null;
  try {
    const user = JSON.parse(userJson) as AuthUser["user"];
    return { access_token, refresh_token, user };
  } catch {
    return null;
  }
}

export function writeAuthUserToCookies(authUser: AuthUser) {
  setCookie(COOKIE_ACCESS_TOKEN, authUser.access_token, { maxAgeSeconds: 60 * 60 * 24 * 30 });
  setCookie(COOKIE_REFRESH_TOKEN, authUser.refresh_token, { maxAgeSeconds: 60 * 60 * 24 * 30 });
  setCookie(COOKIE_USER_JSON, JSON.stringify(authUser.user), { maxAgeSeconds: 60 * 60 * 24 * 30 });
}

export function deleteAuthUserFromCookies() {
  deleteCookie(COOKIE_ACCESS_TOKEN);
  deleteCookie(COOKIE_REFRESH_TOKEN);
  deleteCookie(COOKIE_USER_JSON);
}
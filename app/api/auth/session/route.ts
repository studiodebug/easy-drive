import { NextRequest, NextResponse } from "next/server";
import { COOKIE_ACCESS_TOKEN, COOKIE_USER_JSON } from "../_cookies";

export async function GET(req: NextRequest) {
  const access_token = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value ?? "";
  const userJson = req.cookies.get(COOKIE_USER_JSON)?.value ?? "";

  if (!access_token) {
    return NextResponse.json({ isAuthenticated: false, user: null }, { status: 401 });
  }

  let user: unknown = null;
  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch {
      user = null;
    }
  }

  return NextResponse.json({ isAuthenticated: true, user });
}



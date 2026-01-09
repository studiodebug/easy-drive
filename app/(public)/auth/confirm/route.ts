import { confirmEmail } from "@/server/contracts/auth/login";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    // old supabase request:
    // await supabase.auth.verifyOtp({ type, token_hash })
    //
    // placeholder request: integrate with your backend confirmation endpoint.
    await confirmEmail({ token_hash });
    redirect(next);
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=No token hash or type`);
}

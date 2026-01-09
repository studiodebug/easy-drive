import Link from "next/link";
import { Button } from "./retroui/Button";
import { LogoutButton } from "./logout-button";
import { cookies } from "next/headers";

export async function AuthButton() {
  // old supabase request:
  // const { data } = await supabase.auth.getClaims()
  //
  // placeholder auth: read user payload from cookies set by our mocked auth flow.
  const cookieStore = await cookies();
  const userJson = cookieStore.get("auth_user")?.value ?? null;
  const accessToken = cookieStore.get("access_token")?.value ?? null;

  let userEmail: string | null = null;
  if (userJson) {
    try {
      const parsed = JSON.parse(userJson) as { email?: string };
      userEmail = parsed.email ?? null;
    } catch {
      userEmail = null;
    }
  }

  const isAuthenticated = Boolean(accessToken);

  return isAuthenticated ? (
    <div className="flex items-center gap-4">
      Olá, {userEmail ?? "usuário"}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Entrar</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Cadastrar-se</Link>
      </Button>
    </div>
  );
}

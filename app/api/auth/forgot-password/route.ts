import { NextResponse } from "next/server";
import { requestPasswordReset } from "@/server/contracts/auth/login";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { email?: string } | null;

    if (!body?.email) {
      return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
    }

    await requestPasswordReset({ email: body.email });

    return NextResponse.json({
      message: "Se o email existir, você receberá um link para redefinir sua senha.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível enviar o email";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

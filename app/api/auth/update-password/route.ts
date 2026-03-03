import { NextResponse } from "next/server";
import { resetPassword } from "@/server/contracts/auth/login";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { token?: string; password?: string } | null;

    if (!body?.token || !body?.password) {
      return NextResponse.json(
        { error: "Token e nova senha são obrigatórios" },
        { status: 400 }
      );
    }

    await resetPassword({ token: body.token, password: body.password });

    return NextResponse.json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Link de redefinição inválido ou expirado";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

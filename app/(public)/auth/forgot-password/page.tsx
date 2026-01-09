"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // old supabase request:
      // await supabase.auth.resetPasswordForEmail(email, { redirectTo: ... })
      //
      // placeholder request: integrate with your backend reset-password endpoint.
      // await fetch("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) })
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      {success ? (
        <Card>
          <Card.Header>
            <Card.Title className="text-2xl">Verifique seu e-mail</Card.Title>
            <Card.Description>
              Instruções de redefinição de senha enviadas
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-sm text-muted-foreground">
              Se você se registrou usando seu email e senha, receberá um email
              para redefinir sua senha.
            </p>
          </Card.Content>
        </Card>
      ) : (
        <Card>
          <Card.Header>
            <Card.Title className="text-2xl">Redefinir sua senha</Card.Title>
            <Card.Description>
              Digite seu email e enviaremos um link para redefinir sua senha
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar email de redefinição"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Já tem uma conta?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Entrar
                </Link>
              </div>
            </form>
          </Card.Content>
        </Card>
      )}
    </div>
  );
}

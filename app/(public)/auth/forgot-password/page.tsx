"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/schemas/auth.schema";

export default function Page() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Não foi possível enviar o email");
      }
      setSuccess(true);
    } catch (error: unknown) {
      setServerError(
        error instanceof Error ? error.message : "Ocorreu um erro"
      );
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                {serverError && (
                  <p className="text-sm text-red-500">{serverError}</p>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar email de redefinição"}
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

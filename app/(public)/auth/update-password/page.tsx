"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/schemas/auth.schema";

export default function Page() {
  return (
    <Suspense fallback={<UpdatePasswordFallback />}>
      <UpdatePasswordContent />
    </Suspense>
  );
}

function UpdatePasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setServerError("Link inválido. Solicite um novo link de redefinição.");
      return;
    }
    setServerError(null);
    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Link de redefinição inválido ou expirado");
      }
      router.push("/auth/login");
    } catch (error: unknown) {
      setServerError(
        error instanceof Error ? error.message : "Ocorreu um erro"
      );
    }
  };

  if (!token) {
    return (
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <Card.Header>
            <Card.Title className="text-2xl">Link inválido</Card.Title>
            <Card.Description>
              Este link de redefinição de senha é inválido ou expirou. Solicite
              um novo link na página de esqueci minha senha.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Link
              href="/auth/forgot-password"
              className="text-sm underline underline-offset-4"
            >
              Solicitar novo link
            </Link>
          </Card.Content>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <Card.Header>
          <Card.Title className="text-2xl">Criar nova senha</Card.Title>
          <Card.Description>
            Por favor, insira sua nova senha abaixo.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Nova senha</Label>
                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova senha"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-4"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeat-password">Repetir Senha</Label>
                <div className="relative flex items-center">
                  <Input
                    id="repeat-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repita sua senha"
                    aria-invalid={!!errors.repeatPassword}
                    {...register("repeatPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-4"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
                {errors.repeatPassword && (
                  <p className="text-sm text-red-500">
                    {errors.repeatPassword.message}
                  </p>
                )}
              </div>
              {serverError && (
                <p className="text-sm text-red-500">{serverError}</p>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar nova senha"}
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}

function UpdatePasswordFallback() {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <Card.Header>
          <Card.Title className="text-2xl">Carregando...</Card.Title>
        </Card.Header>
      </Card>
    </div>
  );
}

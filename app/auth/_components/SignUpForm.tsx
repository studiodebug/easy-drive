"use client";

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Select } from "@/components/retroui/Select";
import { createClient } from "@/shared/supabase/client";
import { cn } from "@/shared/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [documentType, setDocumentType] = useState<
    "CPF" | "RG" | "CNH" | undefined
  >(undefined);
  const [document, setDocument] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;

      // Try to create/update the user's `public.users` row (best-effort).
      // If email confirmation is required, this may 401 (no session cookie yet).
      try {
        await fetch("/api/users/me", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name,
            photoUrl: photoUrl.trim() ? photoUrl.trim() : null,
            documentType: documentType ?? null,
            document: document.trim() ? document.trim() : null,
          }),
        });
      } catch {
        // ignore (best-effort)
      }

      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <Card.Header>
          <Card.Title className="text-2xl">Criar conta</Card.Title>
          <Card.Description>Crie uma nova conta</Card.Description>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photoUrl">Foto (URL)</Label>
                <Input
                  id="photoUrl"
                  type="url"
                  placeholder="https://..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="documentType">Tipo de documento</Label>
                <Select
                  value={documentType}
                  onValueChange={(v) =>
                    setDocumentType(v as "CPF" | "RG" | "CNH")
                  }
                >
                  <Select.Trigger id="documentType">
                    <Select.Value placeholder="Selecione..." />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="CPF">CPF</Select.Item>
                    <Select.Item value="RG">RG</Select.Item>
                    <Select.Item value="CNH">CNH</Select.Item>
                  </Select.Content>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="document">Documento</Label>
                <Input
                  id="document"
                  placeholder="Somente números (recomendado)"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Confirmar senha</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando uma conta..." : "Criar conta"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Entrar
              </Link>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}

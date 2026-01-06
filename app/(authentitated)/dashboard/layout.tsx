import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Copyright } from "@/components/Copyright";
import Header from "@/components/blocks/Header/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex-1 w-full flex flex-col gap-4 items-center">
        <div className="w-full flex-1 flex flex-col gap-4 p-5 max-w-7xl">
          {children}
        </div>

        <footer className="w-full flex items-center justify-center border-t border-t-foreground/10 mx-auto text-center text-xs gap-8 py-8">
          <Copyright />
        </footer>
      </div>
    </main>
  );
}

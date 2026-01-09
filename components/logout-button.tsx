"use client";

import { Button } from "@/components/retroui/Button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    // Server clears HttpOnly cookies.
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}

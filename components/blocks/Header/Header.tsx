"use client";

import { Button } from "@/components/retroui/Button";
import { User, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "@/components/retroui/Menu";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useRouter } from "next/navigation";
import {
  BookingSummaryEntry,
  BookingSummarySheet,
} from "@/components/blocks/BookingSummary/BookingSummarySheet";

const navItems = [
  { name: "Início", href: "/" },
  { name: "Vitrine", href: "/vitrine" },
  { name: "Locais", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contato", href: "#" },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signOut } = useAuth();

  return (
    <div className="w-full">
      {/* Top contact bar */}
      <div className="bg-primary border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <a href="#" className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="hidden md:inline">Iquexique, Bahia</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BookingSummaryEntry />

            <Menu>
              <Menu.Trigger asChild>
                <a
                  href="#"
                  aria-label="Menu do usuário"
                  onClick={(e) => e.preventDefault()}
                >
                  <User className="h-5 w-5" />
                </a>
              </Menu.Trigger>
              <Menu.Content>
                {isAuthenticated ? (
                  <>
                    <Menu.Item
                      onSelect={(e) => {
                        e.preventDefault();
                        router.push("/profile");
                      }}
                    >
                      Perfil
                    </Menu.Item>
                    <Menu.Item
                      onSelect={async (e) => {
                        e.preventDefault();
                        await signOut();
                        router.push("/auth/login");
                      }}
                    >
                      Deslogar
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item>
                      <Link href="/auth/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href="/auth/sign-up">Crie sua conta</Link>
                    </Menu.Item>
                  </>
                )}
              </Menu.Content>
            </Menu>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-head font-bold">
            LOGO
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="hover:underline underline-offset-4 decoration-primary decoration-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="items-center">
              {isAuthenticated ? (
                <Button size="sm" variant="secondary">
                  Comece a dirigir
                </Button>
              ) : (
                <Button asChild size="sm" variant="secondary">
                  <Link href="/auth/sign-up">Crie sua conta</Link>
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              size="icon"
              className="md:hidden p-2 hover:-translate-y-1 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="flex flex-col justify-center space-y-1">
                <div
                  className={`w-5 h-0.5 bg-black transition-all ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-black transition-all ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-black transition-all ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></div>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black bg-white animate-in fade-in duration-300">
            <div className="px-4 py-4 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-lg font-medium hover:underline underline-offset-4 decoration-primary decoration-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <BookingSummarySheet />
    </div>
  );
}

export default Header;

"use client";

import { Button } from "@/components/retroui/Button";
import {
  User,
  MapPin,
  LogOut,
  UserCircle,
  Calendar,
  CalendarClock,
  History,
  Coins,
  Search,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Popover } from "@/components/retroui/Popover";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useRouter } from "next/navigation";
import {
  BookingSummaryEntry,
  BookingSummarySheet,
} from "@/components/blocks/BookingSummary/BookingSummarySheet";

const getNavItems = (isAuthenticated: boolean) => [
  {
    name: "Encontrar instrutores",
    href: "/vitrine",
    icon: Search,
  },
  {
    name: "Calendário de aulas",
    href: "/dashboard?tab=0",
    hidden: !isAuthenticated,
    icon: Calendar,
  },
  {
    name: "Minhas aulas",
    href: "/dashboard?tab=2",
    hidden: !isAuthenticated,
    icon: CalendarClock,
  },
  {
    name: "Histórico de aulas",
    href: "/dashboard?tab=3",
    hidden: !isAuthenticated,
    icon: History,
  },
  {
    name: "Créditos disponíveis",
    href: "/dashboard?tab=4",
    hidden: !isAuthenticated,
    icon: Coins,
  },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, signOut } = useAuth();

  const navItems = getNavItems(isAuthenticated);

  const filteredNavItems = navItems.filter((item) => !item.hidden);

  return (
    <div className="w-full">
      {/* Top contact bar */}
      <div className="bg-primary border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <a href="#" className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="inline">Iquexique, Bahia</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BookingSummaryEntry />

            <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
              <Popover.Trigger asChild>
                <button
                  type="button"
                  aria-label="Menu do usuário"
                  className="cursor-pointer"
                >
                  <User className="h-5 w-5" />
                </button>
              </Popover.Trigger>
              <Popover.Content align="end" className="w-48 p-2">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        router.push("/profile");
                      }}
                      className="relative text-black flex cursor-pointer select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-primary focus:bg-primary"
                    >
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4" />
                        <span>Meu perfil</span>
                      </div>
                    </button>
                    <button
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await signOut();
                        router.push("/auth/login");
                      }}
                      className="relative text-black flex cursor-pointer select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-primary focus:bg-primary"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>Sair da conta</span>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/auth/login"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="relative text-black flex cursor-pointer select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-primary focus:bg-primary"
                    >
                      <div className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        <span>Entrar</span>
                      </div>
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="relative text-black flex cursor-pointer select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-primary focus:bg-primary"
                    >
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        <span>Criar conta grátis</span>
                      </div>
                    </Link>
                  </div>
                )}
              </Popover.Content>
            </Popover>
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
            {filteredNavItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 hover:underline underline-offset-4 decoration-primary decoration-2 transition-colors"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <div className="items-center">
              {isAuthenticated ? (
                <Button asChild size="sm" variant="secondary">
                  <Link href="/dashboard?tab=1">Agendar aula</Link>
                </Button>
              ) : (
                <Button asChild size="sm" variant="secondary">
                  <Link href="/auth/sign-up">Começar grátis</Link>
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
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems
                .filter((item) => !item.hidden)
                .map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-lg font-medium hover:underline underline-offset-4 decoration-primary decoration-2 py-2 transition-colors"
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </nav>
      <BookingSummarySheet />
    </div>
  );
}

export default Header;

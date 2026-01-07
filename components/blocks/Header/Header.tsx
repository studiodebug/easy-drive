"use client";

import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { Button } from "@/components/retroui/Button";
import { createClient } from "@/lib/supabase/client";
import { hasEnvVars } from "@/lib/utils";
import { Phone, Mail, ShoppingCart, User, History, MapPin } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "Início", href: "/" },
  { name: "Vitrine", href: "/vitrine" },
  { name: "Locais", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contato", href: "#" },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      setUser({
        name: user.user?.user_metadata.name,
        email: user.user?.email || "",
        phone: user.user?.phone || "",
      });
    };
    fetchUser();
  }, []);

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
            <a href="#" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium text-[10px] text-white bg-black rounded-full h-[12px] w-[12px] flex items-center justify-center absolute -top-1 -right-1">
                3
              </span>
            </a>
            <a href="#">
              <User className="h-5 w-5" />
            </a>
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
              {user ? (
                <Button size="sm" variant="secondary">
                  Comece a dirigir
                </Button>
              ) : (
                <Button size="sm" variant="secondary">
                  Crie sua conta
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
    </div>
  );
}

export default Header;

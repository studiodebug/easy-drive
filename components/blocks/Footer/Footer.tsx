"use client";

import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

const quickLinks = [
  { name: "HOME", href: "#" },
  { name: "ABOUT", href: "#" },
  { name: "SERVICES", href: "#" },
  { name: "PORTFOLIO", href: "#" },
  { name: "BLOG", href: "#" },
  { name: "CONTACT", href: "#" },
];

const resources = [
  { name: "DOCUMENTATION", href: "#" },
  { name: "API REFERENCE", href: "#" },
  { name: "TUTORIALS", href: "#" },
  { name: "COMMUNITY", href: "#" },
  { name: "SUPPORT", href: "#" },
  { name: "STATUS", href: "#" },
];

function FooterThree() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="bg-background w-full border-t-2 ">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 max-w-md">
            <Text as="h3" className="mb-6">
              STAY CONNECTED
            </Text>
            <Text className="text-muted-foreground leading-relaxed mb-2">
              Join our community and get the latest updates, exclusive content, and special offers delivered straight to your inbox.
            </Text>
            <form onSubmit={handleSubscribe} className="mb-8">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit">
                  SUBSCRIBE
                </Button>
              </div>
            </form>

            <div className="flex space-x-4">
              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-1 shadow shadow-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href="mailto:arif@retroui.dev"
                  className="hover:underline underline-offset-4"
                >
                  arif@retroui.dev
                </a>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-black text-white p-1 shadow shadow-primary">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="hover:underline underline-offset-4">+1 (555) 222-1111</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Text as="h4" className="mb-6">
              QUICK LINKS
            </Text>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:underline font-medium underline-offset-4 decoration-primary decoration-2 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <Text as="h4" className="mb-6">
              RESOURCES
            </Text>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="hover:underline font-medium underline-offset-4 decoration-primary decoration-2 transition-all"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-primary border-y-2 border-black ">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <Text className="text-sm text-black font-bold">
            © 2025 NEXUS. Crafted with passion and code. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default FooterThree;
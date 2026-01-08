"use client";

import { useState } from "react";
import { Input } from "@/components/retroui/Input";
import { Button } from "@/components/retroui/Button";
import { MapPin, Search } from "lucide-react";

interface VitrineSearchBannerProps {
  onSearch?: (city: string) => void;
}

export function VitrineSearchBanner({ onSearch }: VitrineSearchBannerProps) {
  const [searchCity, setSearchCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      onSearch?.(searchCity.trim());
    }
  };

  return (
    <div className="w-full bg-primary border-b-4 border-black py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black text-center mb-4">
          Encontre seu instrutor ideal
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-black/80 text-center mb-8 md:mb-10 max-w-2xl mx-auto">
          Explore nossa vitrine de instrutores certificados e encontre o
          profissional perfeito para você aprender a dirigir com confiança.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto"
        >
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
            <Input
              type="text"
              placeholder="Digite sua cidade (ex.: São Paulo)"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="pl-12 h-12 md:h-14 text-base border-2 border-black bg-white font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
          </div>
          <Button type="submit" variant={"secondary"}>
            <Search className="h-5 w-5 mr-2" />
            Buscar
          </Button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/retroui/Button";

interface CarGalleryProps {
  photos: string[];
}

export function CarGallery({ photos }: CarGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (photos.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 border-2 border-black flex items-center justify-center">
        <span className="text-muted-foreground">Sem fotos disponíveis</span>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full h-96 border-3 border-black overflow-hidden bg-gray-100">
        <Image
          src={photos[currentIndex]}
          alt={`Foto do veículo ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority={currentIndex === 0}
        />

        {photos.length > 1 && (
          <>
            <Button
              onClick={prevPhoto}
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={nextPhoto}
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {photos.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded font-bold text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        )}
      </div>

      {photos.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-20 border-2 overflow-hidden transition-all ${
                index === currentIndex
                  ? "border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              <Image
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { Instructor } from "@/types/instructor";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Card } from "@/components/retroui/Card";
import { StarRating } from "@/components/StarRating";
import { Calendar, MapPin, ArrowLeft, Coins } from "lucide-react";
import Link from "next/link";
import { CarGallery } from "./CarGallery";
import { ReviewsSection } from "./ReviewsSection";
import { WeeklySchedule } from "./WeeklySchedule";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { getAvailabilityBadge } from "@/lib/badge-utils";
import { useAuth } from "@/providers/auth/AuthProvider";

interface InstructorProfileProps {
  instructor: Instructor;
}

export function InstructorProfile({ instructor }: InstructorProfileProps) {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const { isAuthenticated: isLoggedIn } = useAuth();

  const MAX_BIO_LENGTH = 240;

  const availabilityBadge = getAvailabilityBadge(instructor.availability);

  const { bioShouldTruncate, displayedBio } = useMemo(() => {
    const safeBio = instructor.bio || "";
    const shouldTruncate = safeBio.length > MAX_BIO_LENGTH;
    return {
      bioShouldTruncate: shouldTruncate,
      displayedBio:
        shouldTruncate && !isBioExpanded
          ? `${safeBio.slice(0, MAX_BIO_LENGTH)}...`
          : safeBio,
    };
  }, [instructor.bio, isBioExpanded]);

  return (
    <div className="w-full min-h-screen bg-transparent pb-8">
      {/* Header Section */}
      <div className="w-full bg-white border-b-4 border-black mb-8 relative">
        <div className="absolute inset-0 h-48 bg-accent pattern-dots pattern-black pattern-bg-white pattern-size-4 pattern-opacity-10 opacity-100 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 px-4 pt-8 pb-8">
          <Link
            href="/vitrine"
            className="inline-flex items-center gap-2 text-sm font-bold text-black bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para vitrine
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar with offset */}
            <div className="relative mt-4 ml-4">
              <Avatar className="h-40 w-40 border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white rounded-none">
                <Avatar.Image src={instructor.avatar} alt={instructor.name} />
                <Avatar.Fallback className="bg-purple-200 text-black font-bold border-4 border-black text-4xl">
                  {instructor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar>
              {/* Online Indicator if available - keeping consistent with idea */}
              {instructor.availability === "disponivel" && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              )}
            </div>

            <div className="flex-1 w-full pt-4 md:pt-12">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <Text
                      as="h1"
                      className="text-4xl md:text-5xl font-black text-black tracking-tight uppercase  px-2 leading-none"
                    >
                      {instructor.name}
                    </Text>
                    {availabilityBadge && (
                      <Badge
                        className={
                          availabilityBadge.className + " text-base px-3 py-1"
                        }
                      >
                        {availabilityBadge.text}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-black/80 mb-4 bg-white w-fit p-3 rounded-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span className="font-bold text-lg">
                        {instructor.address.city}, {instructor.address.state}
                      </span>
                    </div>
                    <div className="w-px h-6 bg-black/20" />
                    <div className="flex items-center gap-2">
                      <StarRating rating={instructor.rating} showText />
                    </div>
                    <div className="w-px h-6 bg-black/20" />
                    <div className="font-bold">
                      {instructor.totalClasses} aulas realizadas
                    </div>
                  </div>
                </div>

                <Card className="p-6 border-4 min-w-[240px] transform mr-2 rotate-1 transition-transform hover:rotate-0">
                  <div className="text-sm font-bold uppercase text-muted-foreground mb-2">
                    Créditos por aula
                  </div>
                  <div className="flex items-center gap-2 text-4xl font-black text-black">
                    <Coins className="w-8 h-8" />
                    <span>{instructor.credits}</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    {isLoggedIn ? (
                      <div />
                    ) : (
                      <Button className="w-full" asChild>
                        <Link href="/auth/login">Fazer login</Link>
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Weekly Schedule (prioridade) */}
            <Card
              id="agenda"
              className={`p-8 ${
                !isLoggedIn ? "opacity-95 grayscale-[0.3]" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <Text
                  as="h3"
                  className="text-3xl font-black flex items-center gap-2 uppercase tracking-tight leading-none"
                >
                  <Calendar className="h-7 w-7" />
                  Agenda
                </Text>
              </div>

              {isLoggedIn ? (
                <WeeklySchedule schedule={instructor.schedule} />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center pt-10 pb-4 px-4 text-center border-2 border-dashed border-black bg-white">
                  <div className="mb-4 bg-white p-4 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <Calendar className="h-8 w-8 text-black/60" />
                  </div>
                  <h3 className="font-black text-lg mb-2 uppercase">
                    Agenda Disponível
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-[220px]">
                    Faça login para ver os horários disponíveis e agendar sua
                    aula.
                  </p>
                  <Button className="w-full mt-auto" asChild>
                    <Link href="/auth/login">Fazer Login</Link>
                  </Button>
                </div>
              )}
            </Card>

            {/* Car Gallery */}
            <Card className="p-8 ">
              <Text as="h3" className="mb-4">
                Veículo
              </Text>
              <CarGallery photos={instructor.carPhotos} />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-xs font-black uppercase text-muted-foreground mb-1">
                    Modelo
                  </div>
                  <div className="font-black text-xl">
                    {instructor.carModel}
                  </div>
                </div>
                <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-xs font-black uppercase text-muted-foreground mb-1">
                    Ano
                  </div>
                  <div className="font-black text-xl">{instructor.carYear}</div>
                </div>
                <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-xs font-black uppercase text-muted-foreground mb-1">
                    Transmissão
                  </div>
                  <div className="font-black text-xl capitalize">
                    {instructor.carTransmission === "manual"
                      ? "Manual"
                      : "Automático"}
                  </div>
                </div>
              </div>
            </Card>

            {/* Reviews Section */}
            {instructor.reviews && instructor.reviews.length > 0 && (
              <div className="mt-4">
                <ReviewsSection reviews={instructor.reviews} />
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="flex flex-col gap-8">
            {/* Bio */}
            <Card className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <Text as="h3" className="mb-4">
                Sobre o Instrutor
              </Text>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-black/90 font-medium">
                  {displayedBio}
                </p>
                {bioShouldTruncate && (
                  <Button
                    variant="outline"
                    className="w-fit border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    onClick={() => setIsBioExpanded((prev) => !prev)}
                  >
                    {isBioExpanded ? "Ver menos" : "Ver mais"}
                  </Button>
                )}

                <div className="flex items-center gap-6 justify-between w-full">
                  <div className="flex items-center gap-2">
                    <StarRating rating={instructor.rating} showText />
                  </div>
                  <div className="w-px h-6 bg-black/20" />
                  <div className="font-bold">
                    {instructor.totalClasses} aulas realizadas
                  </div>
                </div>
              </div>
            </Card>

            {/* Specialties and Levels */}
            <Card className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <Text as="h4" className="mb-4">
                Especialidades
              </Text>
              <div className="flex flex-wrap gap-3 mb-6">
                {instructor.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <Text as="h4" className="mb-4">
                Níveis Atendidos
              </Text>
              <div className="flex flex-wrap gap-3">
                {instructor.levels.map((level, index) => (
                  <Badge key={index} variant="outline">
                    {level}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

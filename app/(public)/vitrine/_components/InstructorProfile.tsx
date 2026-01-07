"use client";

import { Instructor } from "@/app/(authentitated)/dashboard/_components/student-dashboard/data/instructors-mock";
import { Card } from "@/components/retroui/Card";
import { Badge } from "@/components/retroui/Badge";
import { Avatar } from "@/components/retroui/Avatar";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/retroui/Button";
import { MapPin, Calendar } from "lucide-react";
import { CarGallery } from "./CarGallery";
import { WeeklySchedule } from "./WeeklySchedule";
import { ReviewsSection } from "./ReviewsSection";
import Link from "next/link";

interface InstructorProfileProps {
  instructor: Instructor;
}

export function InstructorProfile({ instructor }: InstructorProfileProps) {
  const getAvailabilityBadge = (availability: string) => {
    const badges = {
      disponivel: {
        text: "Disponível",
        className: "bg-green-500 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-sm px-2 py-1",
      },
      ocupado: {
        text: "Ocupado",
        className: "bg-yellow-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-sm px-2 py-1",
      },
      indisponivel: {
        text: "Indisponível",
        className: "bg-gray-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-sm px-2 py-1",
      },
    };
    return badges[availability as keyof typeof badges];
  };

  const availabilityBadge = getAvailabilityBadge(instructor.availability);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full bg-primary border-b-4 border-black py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/vitrine"
            className="text-sm text-black/70 hover:text-black underline mb-4 inline-block"
          >
            ← Voltar para vitrine
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-3 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Avatar.Image src={instructor.avatar} alt={instructor.name} />
              <Avatar.Fallback className="bg-purple-200 text-black font-bold border-3 border-black">
                {instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-black">
                  {instructor.name}
                </h1>
                <Badge className={availabilityBadge.className}>
                  {availabilityBadge.text}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-black/80 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">
                    {instructor.city}, {instructor.state}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <StarRating rating={instructor.rating} showText />
                </div>
                <div className="text-sm font-medium">
                  {instructor.totalClasses} aulas realizadas
                </div>
              </div>
              {instructor.address && (
                <div className="text-sm text-black/70">
                  {instructor.address}
                </div>
              )}
            </div>
            <div className="w-full md:w-auto">
              <Card className="p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    Valor por hora
                  </div>
                  <div className="text-3xl font-black text-black">
                    R$ {instructor.hourlyRate.toFixed(2)}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Bio */}
          <Card className="p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black mb-4">Sobre o Instrutor</h2>
            <p className="text-base leading-relaxed text-black/90">
              {instructor.bio}
            </p>
          </Card>

          {/* Specialties and Levels */}
          <Card className="p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black mb-4">Especialidades</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {instructor.specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  className="bg-purple-200 text-black border-2 border-black font-semibold"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-3">Níveis Atendidos</h3>
            <div className="flex flex-wrap gap-2">
              {instructor.levels.map((level, index) => (
                <Badge
                  key={index}
                  className="bg-blue-200 text-black border-2 border-black font-semibold"
                >
                  {level}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Car Gallery */}
          <Card className="p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black mb-4">Fotos do Veículo</h2>
            <CarGallery photos={instructor.carPhotos} />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Modelo</div>
                <div className="font-bold text-lg">{instructor.carModel}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Ano</div>
                <div className="font-bold text-lg">{instructor.carYear}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Transmissão</div>
                <div className="font-bold text-lg capitalize">
                  {instructor.carTransmission === "manual" ? "Manual" : "Automático"}
                </div>
              </div>
            </div>
          </Card>

          {/* Weekly Schedule */}
          <Card className="p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Agenda Semanal
            </h2>
            <WeeklySchedule schedule={instructor.schedule} />
          </Card>

          {/* Reviews Section */}
          {instructor.reviews && instructor.reviews.length > 0 && (
            <ReviewsSection reviews={instructor.reviews} />
          )}
        </div>
      </div>
    </div>
  );
}

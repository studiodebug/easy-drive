import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Star } from "lucide-react";
import { Instructor } from "../data/instructors-mock";

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  const getAvailabilityBadge = (availability: string) => {
    const badges = {
      disponivel: {
        text: "Disponível",
        className: "bg-green-500 text-white border-2 border-black",
      },
      ocupado: {
        text: "Ocupado",
        className: "bg-yellow-500 text-white border-2 border-black",
      },
      indisponivel: {
        text: "Indisponível",
        className: "bg-gray-500 text-white border-2 border-black",
      },
    };
    return badges[availability as keyof typeof badges];
  };

  const availabilityBadge = getAvailabilityBadge(instructor.availability);

  return (
    <Card className="p-6 bg-white hover:shadow-lg transition-all">
      <div className="flex gap-4">
        {/* Avatar Section */}
        <div className="shrink-0">
          <Avatar className="h-20 w-20">
            <Avatar.Image src={instructor.avatar} alt={instructor.name} />
            <Avatar.Fallback>
              {instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          {/* Name and Availability */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold">{instructor.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={availabilityBadge.className}>
                  {availabilityBadge.text}
                </Badge>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-2">
            <p className="text-sm text-gray-600 mb-1">Especialidades:</p>
            <div className="flex flex-wrap gap-1">
              {instructor.specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  className="bg-purple-100 text-purple-700 border-2 border-black"
                  size="sm"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Levels */}
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Níveis:</p>
            <div className="flex flex-wrap gap-1">
              {instructor.levels.map((level, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-700 border-2 border-black"
                  size="sm"
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>

          {/* Rating and Classes */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{instructor.rating}</span>
            </div>
            <div className="text-sm text-gray-600">
              {instructor.totalClasses} aulas realizadas
            </div>
          </div>

          {/* Bio */}
          {instructor.bio && (
            <p className="text-sm text-gray-700 mb-3">{instructor.bio}</p>
          )}

          {/* Action Button */}
          <Button
            className="w-full sm:w-auto"
            disabled={instructor.availability !== "disponivel"}
          >
            Agendar aula
          </Button>
        </div>
      </div>
    </Card>
  );
}

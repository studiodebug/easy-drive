import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Instructor } from "../data/instructors-mock";
import { StarRating } from "@/components/StarRating";

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  const getAvailabilityBadge = (availability: string) => {
    const badges = {
      disponivel: {
        text: "Disponível",
        className: "bg-green-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
      ocupado: {
        text: "Ocupado",
        className: "bg-yellow-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
      indisponivel: {
        text: "Indisponível",
        className: "bg-gray-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
    };
    return badges[availability as keyof typeof badges];
  };

  const availabilityBadge = getAvailabilityBadge(instructor.availability);

  return (
    <Card className="p-6 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 h-full flex flex-col">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex gap-4">
          {/* Avatar Section */}
          <div className="shrink-0">
            <Avatar className="h-20 w-20 border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Avatar.Image src={instructor.avatar} alt={instructor.name} />
              <Avatar.Fallback className="bg-purple-200 text-black font-bold border-2 border-black">
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
            <div className="flex flex-col items-start mb-2">
              <h3 className="text-xl font-black text-black tracking-tight leading-tight">
                {instructor.name}
              </h3>
              <div className="mt-2">
                <Badge className={availabilityBadge.className}>
                  {availabilityBadge.text}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Specialties */}
          <div className="mb-3">
            <p className="text-sm font-bold text-black mb-1 font-mono">
              ESPECIALIDADES:
            </p>
            <div className="flex flex-wrap gap-2">
              {instructor.specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  className="bg-purple-200 text-black border-2 border-black font-semibold"
                  size="sm"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Levels */}
          <div className="mb-4">
            <p className="text-sm font-bold text-black mb-1 font-mono">
              NÍVEIS:
            </p>
            <div className="flex flex-wrap gap-2">
              {instructor.levels.map((level, index) => (
                <Badge
                  key={index}
                  className="bg-blue-200 text-black border-2 border-black font-semibold"
                  size="sm"
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bio */}
          {instructor.bio && (
            <div className="mb-4">
              <p className="text-sm text-black border-l-4 border-yellow-400 pl-3 italic line-clamp-3">
                "{instructor.bio}"
              </p>
            </div>
          )}

          {/* Bottom Section: Rating & Action - Pushed to bottom */}
          <div className="mt-auto pt-4 border-t-2 border-gray-100">
            <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 border-2 border-black rounded-lg justify-between">
              <StarRating rating={instructor.rating} showText />
              <div className="h-4 w-0.5 bg-black/20" />
              <div className="text-sm font-bold text-black whitespace-nowrap">
                {instructor.totalClasses} aulas
              </div>
            </div>

            <Button
              className="w-full font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all bg-primary text-black"
              disabled={instructor.availability !== "disponivel"}
            >
              Agendar aula
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

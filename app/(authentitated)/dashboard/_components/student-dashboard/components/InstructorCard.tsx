import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Instructor } from "../data/instructors-mock";
import { StarRating } from "@/components/StarRating";
import { ProfileCard } from "@/components/blocks/ProfileCard/ProfileCard";

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  const getAvailabilityBadge = (availability: string) => {
    const badges = {
      disponivel: {
        text: "Disponível",
        className:
          "bg-green-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
      ocupado: {
        text: "Ocupado",
        className:
          "bg-yellow-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
      indisponivel: {
        text: "Indisponível",
        className:
          "bg-gray-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
    };
    return badges[availability as keyof typeof badges];
  };

  const availabilityBadge = getAvailabilityBadge(instructor.availability);

  return (
    <ProfileCard fullWidth className="h-full">
      <ProfileCard.Cover />
      <ProfileCard.Content className="flex-1">
        <ProfileCard.Avatar
          src={instructor.avatar}
          alt={instructor.name}
          fallback={instructor.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          showOnlineIndicator
        />
        <ProfileCard.Header
          name={instructor.name}
          availability={instructor.availability}
        />
        <ProfileCard.Skills
          title="especialidades"
          skills={instructor.specialties}
        />
        <ProfileCard.Skills title="níveis" skills={instructor.levels} />
        <ProfileCard.Description>{instructor.bio}</ProfileCard.Description>
        <ProfileCard.Rating
          rating={instructor.rating}
          totalClasses={instructor.totalClasses}
        />
        <ProfileCard.Actions>
          <Button className="w-full" variant={"outline"}>
            Ver perfil
          </Button>
          <Button className="w-full">Agendar aula</Button>
        </ProfileCard.Actions>
      </ProfileCard.Content>
    </ProfileCard>
  );
}

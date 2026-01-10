import { ProfileCard } from "@/components/blocks/ProfileCard/ProfileCard";
import { Button } from "@/components/retroui/Button";
import type { Instructor } from "@/types/instructor";

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <ProfileCard fullWidth className="h-full">
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
          city={instructor.city}
          state={instructor.state}
        />
        <ProfileCard.Rating
          rating={instructor.rating}
          totalClasses={instructor.totalClasses}
        />
        <ProfileCard.Skills
          title="especialidades"
          skills={instructor.specialties}
        />
        <ProfileCard.Skills title="níveis" skills={instructor.levels} />
        <ProfileCard.Description>{instructor.bio}</ProfileCard.Description>

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

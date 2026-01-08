import { Instructor } from "@/app/(authentitated)/dashboard/_components/student-dashboard/data/instructors-mock";
import { ProfileCard } from "@/components/blocks/ProfileCard/ProfileCard";
import { Button } from "@/components/retroui/Button";
import Link from "next/link";

interface VitrineInstructorCardProps {
  instructor: Instructor;
  isLoggedIn: boolean;
}

export function VitrineInstructorCard({
  instructor,
  isLoggedIn,
}: VitrineInstructorCardProps) {
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
          {isLoggedIn ? (
            <>
              <Button className="w-full" variant={"outline"}>
                Ver perfil
              </Button>
              <Button className="w-full">Agendar aula</Button>
            </>
          ) : (
            <>
              <Button asChild className="w-full">
                <Link href={`/vitrine/instructor/${instructor.id}`}>
                  Ver perfil completo
                </Link>
              </Button>
            </>
          )}
        </ProfileCard.Actions>
      </ProfileCard.Content>
    </ProfileCard>
  );
}

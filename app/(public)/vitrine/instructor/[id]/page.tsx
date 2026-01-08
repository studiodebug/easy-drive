import { notFound } from "next/navigation";
import { instructorsMock } from "@/app/(authentitated)/dashboard/_components/student-dashboard/data/instructors-mock";
import { InstructorProfile } from "../../_components/InstructorProfile";

// Generate static params for all instructors at build time
export async function generateStaticParams() {
  return instructorsMock.map((instructor) => ({
    id: instructor.id,
  }));
}

interface InstructorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InstructorPage({ params }: InstructorPageProps) {
  const { id } = await params;
  const instructor = instructorsMock.find((inst) => inst.id === id);

  if (!instructor) {
    notFound();
  }

  return <InstructorProfile instructor={instructor} isLoggedIn={false} />;
}

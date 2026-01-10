import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import { getInstructors } from "@/server/contracts/dashboard/instructors";
import { InstructorProfile } from "../../_components/InstructorProfile";

// Cache the instructors fetch for static generation
const getCachedInstructors = cache(getInstructors);

// Generate static params for all instructors at build time
export async function generateStaticParams() {
  const instructors = await getCachedInstructors();
  return instructors.map((instructor) => ({
    id: instructor.id,
  }));
}

interface InstructorPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function InstructorContent({ id }: { id: string }) {
  const instructors = await getCachedInstructors();
  const instructor = instructors.find((inst) => inst.id === id);

  if (!instructor) {
    notFound();
  }

  return <InstructorProfile instructor={instructor} isLoggedIn={false} />;
}

export default async function InstructorPage({ params }: InstructorPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <InstructorContent id={id} />
    </Suspense>
  );
}

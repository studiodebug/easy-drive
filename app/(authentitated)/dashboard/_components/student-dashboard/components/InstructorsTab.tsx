"use client";

import { InstructorCard } from "./InstructorCard";
import { InstructorsFilters } from "./InstructorsFilters";
import { instructorsMock } from "../data/instructors-mock";

interface InstructorsTabProps {
  selectedDate?: Date | null;
}

export function InstructorsTab({ selectedDate }: InstructorsTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold">Instrutores</h2>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block">
          <InstructorsFilters selectedDate={selectedDate} />
        </aside>

        {/* Instructors List */}
        {/* Instructors List */}
        <main className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {instructorsMock.map((instructor) => (
            <div key={instructor.id} className="h-full">
              <InstructorCard instructor={instructor} />
            </div>
          ))}
        </main>
      </div>

      {/* Mobile Filters - Could be implemented as a drawer/modal */}
      <div className="lg:hidden">
        <InstructorsFilters selectedDate={selectedDate} />
      </div>
    </div>
  );
}

"use client";

import { myScheduleMock } from "../data/my-schedule-mock";
import { MyScheduleEmpty } from "./MyScheduleEmpty";
import { ScheduledClassCardForSchedule } from "./ScheduledClassCardForSchedule";

export function MyScheduleTab() {
  const scheduledClasses = myScheduleMock;
  const hasClasses = scheduledClasses && scheduledClasses.length > 0;

  // For demo purposes, you can toggle this to show empty state
  const showEmptyState = false; // Change to true to see empty state

  if (showEmptyState || !hasClasses) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Próxima aula</h2>
          <p className="text-sm text-muted-foreground">
            Confira abaixo as informações da aula para não haver atrasos.
          </p>
        </div>
        <MyScheduleEmpty />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Próxima aula</h2>
        <p className="text-sm text-muted-foreground">
          Confira abaixo as informações da aula para não haver atrasos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scheduledClasses.map((scheduledClass) => (
          <ScheduledClassCardForSchedule
            key={scheduledClass.id}
            scheduledClass={scheduledClass}
          />
        ))}
      </div>
    </div>
  );
}

import { Card } from "@/components/retroui/Card";
import { WeekCalendar } from "./WeekCalendar";
import { CreditsSection } from "./CreditsSection";
import { ScheduledClassesEmpty } from "./ScheduledClassesEmpty";

const WEEK_DAYS = [
  { name: "Segunda", date: "5" },
  { name: "Terça", date: "6" },
  { name: "Quarta", date: "7" },
  { name: "Quinta", date: "8" },
  { name: "Sexta", date: "9" },
  { name: "Sábado", date: "10" },
];

export function ScheduleClassTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold">Agendar aula</h2>

      {/* Calendar Card */}
      <Card className="w-full p-6 bg-white">
        {/* Week Navigation */}
        <WeekCalendar weekDays={WEEK_DAYS} />

        {/* Separator */}
        <div className="border-t-2 border-border my-6" />

        {/* Credits Section */}
        <CreditsSection groupCredits={2} individualCredits={0} />
      </Card>

      {/* Scheduled Classes Section */}
      <ScheduledClassesEmpty />
    </div>
  );
}

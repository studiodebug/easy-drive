import { Suspense } from "react";
import { StudentDashboard } from "./_components/student-dashboard/Student-dashboard";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <StudentDashboard />
      </Suspense>
    </div>
  );
}

import { Suspense } from "react";
import { VitrineInstructors } from "./_components/VitrineInstructors";

export default function VitrinePage() {
  return (
    <div className="w-full flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <VitrineInstructors />
      </Suspense>
    </div>
  );
}

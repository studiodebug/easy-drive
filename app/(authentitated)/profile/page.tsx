import { Suspense } from "react";
import { ProfileContent } from "./_components/ProfileContent";
import { Loader } from "@/components/retroui/Loader";

export default function ProfilePage() {
  return (
    <div className="w-full flex flex-col">
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center min-h-[400px]">
            <Loader />
          </div>
        }
      >
        <ProfileContent />
      </Suspense>
    </div>
  );
}

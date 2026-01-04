import { redirect } from "next/navigation";

import { Card } from "@/components/retroui/Card";
import { UserMeApiRequest } from "../profile/_components/UserMeApiRequest";
import { createClient } from "@/shared/supabase/server";
import { CarIcon, CheckCircleIcon, InfoIcon, UserIcon } from "lucide-react";
import { Suspense } from "react";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function DashboardPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-bold text-3xl mb-2">Welcome to EasyDrive</h1>
          <p className="text-foreground/70">
            Your personal dashboard for managing your driving experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <UserIcon size="24" className="text-primary" />
              </div>
              <h3 className="font-bold text-lg">Profile</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Manage your personal information and preferences
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CarIcon size="24" className="text-primary" />
              </div>
              <h3 className="font-bold text-lg">My Vehicles</h3>
            </div>
            <p className="text-sm text-foreground/70">
              View and manage your registered vehicles
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CheckCircleIcon size="24" className="text-primary" />
              </div>
              <h3 className="font-bold text-lg">Tasks</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Track maintenance and upcoming activities
            </p>
          </Card>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-bold text-2xl mb-4">Your user details</h2>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto w-full">
            <Suspense fallback={<div>Loading user details...</div>}>
              <UserDetails />
            </Suspense>
          </pre>
        </div>

        <UserMeApiRequest />
      </div>
    </div>
  );
}

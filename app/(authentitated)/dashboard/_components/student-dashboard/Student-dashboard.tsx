"use client";

import { useState } from "react";
import {
  Tabs,
  TabsPanels,
  TabsTrigger,
  TabsContent,
  TabsTriggerList,
} from "@/components/retroui/Tab";
import { ScheduleClassTab } from "./components/ScheduleClassTab";
import { InstructorsTab } from "./components/InstructorsTab";
import { MyScheduleTab } from "./components/MyScheduleTab";
import { HistoryTab } from "./components/HistoryTab";
import { useRouter, useSearchParams } from "next/navigation";

export function StudentDashboard() {

  const queryParams = useSearchParams();
  const tab = queryParams.get("tab");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTab, setSelectedTab] = useState(tab ? parseInt(tab) : 0);
  const router = useRouter();

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
    router.push(`/dashboard?tab=${index}`);
  }

  const handleNavigateToInstructors = (date: Date) => {
    setSelectedDate(date);
    setSelectedTab(1); // Switch to Instructors tab (index 1)
  };

  return (
    <div className="w-full">
      <Tabs
        selectedIndex={selectedTab}
        onChange={handleSelectTab}
        className="w-full"
      >
        <TabsTriggerList className="w-full items-center justify-center mb-8">
          <TabsTrigger>Início</TabsTrigger>
          <TabsTrigger>Instrutores</TabsTrigger>
          <TabsTrigger>Minha agenda</TabsTrigger>
          <TabsTrigger>Histórico</TabsTrigger>
        </TabsTriggerList>
        <TabsPanels className="w-full">
          <TabsContent>
            <ScheduleClassTab
              onNavigateToInstructors={handleNavigateToInstructors}
            />
          </TabsContent>
          <TabsContent>
            <InstructorsTab selectedDate={selectedDate} />
          </TabsContent>
          <TabsContent>
            <MyScheduleTab />
          </TabsContent>
          <TabsContent>
            <HistoryTab />
          </TabsContent>
        </TabsPanels>
      </Tabs>
    </div>
  );
}

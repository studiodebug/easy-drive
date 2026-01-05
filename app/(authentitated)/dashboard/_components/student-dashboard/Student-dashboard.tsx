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

export function StudentDashboard() {
  return (
    <div className="w-full">
      <Tabs className="w-full">
        <TabsTriggerList className="w-full items-center justify-center mb-8">
          <TabsTrigger>Início</TabsTrigger>
          <TabsTrigger>Instrutores</TabsTrigger>
          <TabsTrigger>Minha agenda</TabsTrigger>
          <TabsTrigger>Histórico</TabsTrigger>
        </TabsTriggerList>
        <TabsPanels className="w-full">
          <TabsContent>
            <ScheduleClassTab />
          </TabsContent>
          <TabsContent>
            <InstructorsTab />
          </TabsContent>
          <TabsContent>
            <MyScheduleTab />
          </TabsContent>
          <TabsContent>histórico</TabsContent>
        </TabsPanels>
      </Tabs>
    </div>
  );
}

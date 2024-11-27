import { StatsCards } from "@/components/dashboard/stats-cards";
import { TaskChart } from "@/components/dashboard/task-chart";
import { RecentTasks } from "@/components/dashboard/recent-tasks";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <StatsCards />
      <div className="grid gap-4 grid-cols-4">
        <TaskChart />
        <RecentTasks />
      </div>
    </div>
  );
}
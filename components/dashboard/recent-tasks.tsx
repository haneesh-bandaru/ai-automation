"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentTasks = [
  {
    id: 1,
    title: "Update user authentication flow",
    status: "In Progress",
    priority: "High",
    assignee: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
    }
  },
  {
    id: 2,
    title: "Implement dashboard analytics",
    status: "Pending",
    priority: "Medium",
    assignee: {
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
    }
  },
  {
    id: 3,
    title: "Design system documentation",
    status: "Completed",
    priority: "Low",
    assignee: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100"
    }
  }
];

export const RecentTasks = () => {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback>{task.assignee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.assignee.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={
                  task.status === "Completed" ? "default" :
                    task.status === "In Progress" ? "default" : "secondary"
                }>
                  {task.status}
                </Badge>
                <Badge variant={
                  task.priority === "High" ? "destructive" :
                    task.priority === "Medium" ? "secondary" : "outline"
                }>
                  {task.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
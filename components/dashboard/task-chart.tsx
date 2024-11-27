"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", active: 4, completed: 3 },
  { name: "Tue", active: 6, completed: 4 },
  { name: "Wed", active: 5, completed: 6 },
  { name: "Thu", active: 7, completed: 5 },
  { name: "Fri", active: 3, completed: 7 },
  { name: "Sat", active: 2, completed: 4 },
  { name: "Sun", active: 1, completed: 2 },
];

const CustomXAxis = ({ stroke = "#888888", fontSize = 12, ...props }) => (
  <XAxis stroke={stroke} fontSize={fontSize} {...props} />
);

const CustomYAxis = ({ stroke = "#888888", fontSize = 12, ...props }) => (
  <YAxis stroke={stroke} fontSize={fontSize} {...props} />
);

export const TaskChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weekly Task Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CustomXAxis dataKey="name" />
            <CustomYAxis />
            <Tooltip />
            <Bar dataKey="active" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
"use client";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showHeader, setShowHeader] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/dashboard/assign-tasks') {
      setShowHeader(true);
    }
    { typeof window !== 'undefined' && window.location.pathname !== '/dashboard/assign-ttasks' && <Header /> }
  }, []);

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        {typeof window !== 'undefined' && window.location.pathname !== '/dashboard/assign-tasks' && <Header />}
        {children}
      </main>
    </div>
  );
}
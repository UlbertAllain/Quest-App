"use client";

import Sidebar from "@/components/Sidebar";
import { useQuest } from "@/lib/QuestContext";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useQuest();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="spinner-neon" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuest } from "@/lib/QuestContext";
import Login from "@/components/login";

export default function Home() {
  const { user, loading } = useQuest();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="spinner-neon" />
      </div>
    );
  }

  if (!user) return <Login />;

  return null;
}
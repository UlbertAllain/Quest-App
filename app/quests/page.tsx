"use client";

import { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { useQuest } from "@/lib/QuestContext";
import QuestCard from "@/components/QuestCard";
import AddTask from "@/components/AddTask";

export default function QuestsPage() {
  const { userData, tasks, addTask, completeTask } = useQuest();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all");

  if (!userData) return null;

  const activeTasks = tasks
    .filter((t) => !t.isCompleted)
    .filter((t) => (filter === "all" ? true : t.difficulty === filter));

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title, difficulty);
    setTitle("");
  };

  const filterBtn = (val: "all" | "easy" | "medium" | "hard", label: string, cls: string) => (
    <button
      onClick={() => setFilter(val)}
      className={`diff-pill ${filter === val ? cls : ""}`}
    >
      {label}
    </button>
  );

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted hover:text-slate-200 transition mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-2xl font-extrabold text-slate-100 tracking-tight">Active Quests</h1>
          <p className="text-sm text-muted mt-1">Manage and filter your pending quests</p>
        </div>

        <div className="mb-8">
          <AddTask title={title} setTitle={setTitle} difficulty={difficulty} setDifficulty={setDifficulty} addTask={handleAdd} />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-muted uppercase tracking-wider font-medium mr-2">Filter:</span>
          {filterBtn("all", "All", "active-easy")}
          {filterBtn("easy", "Easy", "active-easy")}
          {filterBtn("medium", "Medium", "active-medium")}
          {filterBtn("hard", "Hard", "active-hard")}
        </div>

        {activeTasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">{filter === "all" ? "🗡️" : "🔍"}</div>
            <p className="text-muted text-sm">{filter === "all" ? "No active quests. Add one above!" : `No ${filter} quests found.`}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {activeTasks.map((t) => (
              <QuestCard key={t.id} task={t} onComplete={completeTask} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
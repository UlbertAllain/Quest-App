"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useQuest } from "@/lib/QuestContext";
import QuestCard from "@/components/QuestCard";
import AddTask from "@/components/AddTask";

export default function DashboardPage() {
  const { userData, tasks, addTask, completeTask } = useQuest();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  if (!userData) return null;

  const activeTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);
  const todayXP = completedTasks.reduce((s, t) => s + (t.xpReward || 0), 0);
  const needed = 100 * (userData.level || 1);
  const progress = needed > 0 ? ((userData.xp || 0) / needed) * 100 : 0;
  const nextXP = Math.max(0, needed - (userData.xp || 0));

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title, difficulty);
    setTitle("");
  };

  return (
    <AppLayout>
      <div className="flex">
        {/* ✅ ditambah pt-16 lg:pt-0 supaya tidak ketutup hamburger */}
        <div className="flex-1 p-6 pt-16 lg:p-8 lg:pt-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-extrabold text-slate-100 tracking-tight">
              Today&apos;s Quest
            </h1>
            <p className="text-sm text-muted mt-1">
              {activeTasks.length} active · {completedTasks.length} completed
            </p>
          </div>

          <div className="mb-8">
            <AddTask
              title={title}
              setTitle={setTitle}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              addTask={handleAdd}
            />
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">⚔️</div>
              <p className="text-muted text-sm">
                No quests yet. Add your first quest!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {tasks.map((t) => (
                <QuestCard key={t.id} task={t} onComplete={completeTask} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar kanan — tetap hidden di mobile seperti sebelumnya */}
        <div className="w-72 p-6 hidden lg:flex flex-col gap-4 border-l border-white/[0.04] shrink-0">
          <div className="card-neon">
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <h3 className="font-display text-xs font-semibold tracking-wider text-slate-300 uppercase">XP Overview</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Total XP</span>
                <span className="font-display text-sm font-bold text-neon">{userData.xp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">XP Today</span>
                <span className="font-display text-sm font-bold text-info">{todayXP}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted">Next Level</span>
                <span className="font-display text-sm font-bold text-slate-300">{nextXP} XP</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-neon to-info transition-all duration-700 glow-neon" style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-muted font-display">Level {userData.level}</span>
                <span className="text-[10px] text-muted font-display">Level {userData.level + 1}</span>
              </div>
            </div>
          </div>

          <div className="card-neon">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔥</span>
              <h3 className="font-display text-xs font-semibold tracking-wider text-slate-300 uppercase">Streak</h3>
            </div>
            <div className="font-display text-4xl font-extrabold text-slate-100">{userData.streak}</div>
            <p className="text-xs text-muted mt-1">consecutive days</p>
          </div>

          <div className="card-neon">
            <h3 className="font-display text-xs font-semibold tracking-wider text-slate-300 uppercase mb-3">Breakdown</h3>
            <div className="space-y-2.5">
              {[
                { label: "Easy", color: "bg-neon", key: "easy" },
                { label: "Medium", color: "bg-info", key: "medium" },
                { label: "Hard", color: "bg-danger", key: "hard" },
              ].map((d) => (
                <div key={d.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${d.color}`} />
                    <span className="text-xs text-muted">{d.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-300">{completedTasks.filter((t) => t.difficulty === d.key).length}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
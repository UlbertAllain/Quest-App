"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { useQuest } from "@/lib/QuestContext";

export default function CompletedPage() {
  const { userData, tasks } = useQuest();

  if (!userData) return null;

  const completedTasks = tasks.filter((t) => t.isCompleted);
  const totalXPEarned = completedTasks.reduce((s, t) => s + (t.xpReward || 0), 0);
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  const diffCount = (diff: string) => completedTasks.filter((t) => t.difficulty === diff).length;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted hover:text-slate-200 transition mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-2xl font-extrabold text-slate-100 tracking-tight">Completed Quests</h1>
          <p className="text-sm text-muted mt-1">Review your accomplished quests</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Completed", value: completedTasks.length, icon: "✅", color: "text-neon" },
            { label: "XP Earned", value: totalXPEarned, icon: "⭐", color: "text-gold" },
            { label: "Completion Rate", value: `${completionRate}%`, icon: "📊", color: "text-info" },
            { label: "Total Quests", value: totalTasks, icon: "📋", color: "text-slate-300" },
          ].map((s) => (
            <div key={s.label} className="card-neon">
              <div className="text-lg mb-2">{s.icon}</div>
              <div className={`font-display text-2xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="card-neon mb-8">
          <h3 className="font-display text-xs font-semibold tracking-wider text-slate-300 uppercase mb-4">Difficulty Breakdown</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Easy", count: diffCount("easy"), color: "bg-neon", textColor: "text-neon" },
              { label: "Medium", count: diffCount("medium"), color: "bg-info", textColor: "text-info" },
              { label: "Hard", count: diffCount("hard"), color: "bg-danger", textColor: "text-danger" },
            ].map((d) => (
              <div key={d.label} className="text-center">
                <div className={`font-display text-3xl font-extrabold ${d.textColor}`}>{d.count}</div>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${d.color}`} />
                  <span className="text-xs text-muted">{d.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {completedTasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🏔️</div>
            <p className="text-muted text-sm">No completed quests yet. Keep going!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-display text-xs font-semibold tracking-wider text-slate-300 uppercase mb-3">Quest Log</h3>
            {completedTasks.map((t) => {
              const diffColor: Record<string, string> = { easy: "text-neon", medium: "text-info", hard: "text-danger" };
              return (
                <div key={t.id} className="card-neon flex items-center justify-between opacity-70">
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <span className="text-sm text-slate-300 line-through">{t.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold uppercase ${diffColor[t.difficulty] || "text-muted"}`}>{t.difficulty}</span>
                    <span className="font-display text-xs font-bold text-neon">+{t.xpReward} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
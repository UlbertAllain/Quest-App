"use client";

import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { useQuest } from "@/lib/QuestContext";

export default function RewardsPage() {
  const { userData, tasks } = useQuest();

  if (!userData) return null;

  const completedTasks = tasks.filter((t) => t.isCompleted);
  const totalXPEarned = completedTasks.reduce((s, t) => s + (t.xpReward || 0), 0);

  const achievements = [
    { title: "First Blood", desc: "Complete your first quest", icon: "⚔️", check: completedTasks.length >= 1 },
    { title: "Quest Rookie", desc: "Complete 5 quests", icon: "📋", check: completedTasks.length >= 5 },
    { title: "Quest Hunter", desc: "Complete 10 quests", icon: "🏆", check: completedTasks.length >= 10 },
    { title: "Quest Master", desc: "Complete 25 quests", icon: "👑", check: completedTasks.length >= 25 },
    { title: "On Fire", desc: "Reach a 3 day streak", icon: "🔥", check: userData.streak >= 3 },
    { title: "Streak Master", desc: "Reach a 7 day streak", icon: "💥", check: userData.streak >= 7 },
    { title: "Unstoppable", desc: "Reach a 30 day streak", icon: "⚡", check: userData.streak >= 30 },
    { title: "XP Collector", desc: "Earn 50 XP total", icon: "⭐", check: totalXPEarned >= 50 },
    { title: "XP Hoarder", desc: "Earn 200 XP total", icon: "🌟", check: totalXPEarned >= 200 },
    { title: "XP Legend", desc: "Earn 500 XP total", icon: "✨", check: totalXPEarned >= 500 },
    { title: "Level Up!", desc: "Reach Level 2", icon: "📈", check: userData.level >= 2 },
    { title: "Rising Star", desc: "Reach Level 5", icon: "🚀", check: userData.level >= 5 },
    { title: "Hard Mode", desc: "Complete a hard quest", icon: "💀", check: completedTasks.some((t) => t.difficulty === "hard") },
    { title: "Well Rounded", desc: "Complete easy, medium & hard", icon: "🎯", check: ["easy", "medium", "hard"].every((d) => completedTasks.some((t) => t.difficulty === d)) },
  ];

  const unlocked = achievements.filter((a) => a.check).length;
  const total = achievements.length;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted hover:text-slate-200 transition mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-2xl font-extrabold text-slate-100 tracking-tight">Rewards</h1>
          <p className="text-sm text-muted mt-1">Unlock achievements as you progress</p>
        </div>

        <div className="card-neon mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-display text-xs font-semibold tracking-wider text-slate-300 uppercase">Achievement Progress</h3>
              <p className="text-sm text-muted mt-1">{unlocked} of {total} unlocked</p>
            </div>
            <div className="font-display text-3xl font-extrabold text-neon">{total > 0 ? Math.round((unlocked / total) * 100) : 0}%</div>
          </div>
          <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-neon to-gold transition-all duration-700 glow-neon" style={{ width: `${total > 0 ? (unlocked / total) * 100 : 0}%` }} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((a, i) => (
            <div key={i} className={`card-neon flex items-start gap-4 ${a.check ? "border-neon/20 bg-neon/[0.03]" : "opacity-40 border-white/[0.03]"}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${a.check ? "bg-neon/10 border border-neon/20" : "bg-white/[0.03] border border-white/[0.05]"}`}>
                {a.check ? a.icon : "🔒"}
              </div>
              <div className="min-w-0">
                <div className={`font-semibold text-sm ${a.check ? "text-slate-100" : "text-muted"}`}>{a.title}</div>
                <div className="text-xs text-muted mt-0.5">{a.desc}</div>
                {a.check && (
                  <div className="flex items-center gap-1 mt-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <span className="text-[10px] text-neon font-semibold uppercase tracking-wider">Unlocked</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
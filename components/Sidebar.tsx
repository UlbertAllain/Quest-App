"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuest } from "@/lib/QuestContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userData, logout } = useQuest();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      name: "Quests",
      path: "/quests",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4Z" />
        </svg>
      ),
    },
    {
      name: "Completed",
      path: "/completed",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      name: "Rewards",
      path: "/rewards",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
    },
  ];

  if (!userData) return null;

  const needed = 100 * (userData.level || 1);
  const progress =
    needed > 0 ? ((userData.xp || 0) / needed) * 100 : 0;

  // Username: displayName, atau email tanpa @gmail.com
  const displayName = user?.displayName
    || user?.email?.split("@")[0]
    || "Adventurer";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="w-64 h-screen bg-deep p-6 flex flex-col justify-between shrink-0 border-r border-white/[0.04]">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon to-info flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Quest<span className="text-neon">App</span>
          </span>
        </div>

        {/* Profile with username */}
        <div className="mb-8 p-4 rounded-2xl bg-panel/60 border border-white/[0.04]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon/20 to-info/20 border border-neon/20 flex items-center justify-center text-neon font-display font-bold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm text-slate-100 truncate">
                {displayName}
              </div>
              <div className="font-display text-[11px] font-bold text-neon">
                LVL {userData.level}
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon to-info transition-all duration-700 glow-neon"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-muted font-display">
              {userData.xp} XP
            </span>
            <span className="text-[10px] text-muted font-display">
              {needed} XP
            </span>
          </div>

          {/* Streak */}
          <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center gap-2">
            <span className="text-base">🔥</span>
            <span className="text-sm font-semibold text-slate-200">
              {userData.streak}
            </span>
            <span className="text-xs text-muted">day streak</span>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-1">
          <div className="text-[10px] text-muted uppercase tracking-[2px] font-medium mb-2 px-3">
            Menu
          </div>
          {menu.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "nav-active"
                    : "nav-item text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom: Logout */}
      <div className="space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-danger/70 hover:text-danger hover:bg-danger/[0.06] border border-transparent hover:border-danger/10 transition-all"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
        <div className="text-[11px] text-muted/60 font-display tracking-wider">
          Stay consistent.
        </div>
      </div>
    </div>
  );
}
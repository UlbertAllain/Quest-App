export default function XPBar({ xp, level }: any) {
  const needed = 100 * level;
  const progress = (xp / needed) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-display text-xs font-bold text-neon">
          Level {level}
        </span>
        <span className="font-display text-[10px] text-muted">
          {xp}/{needed} XP
        </span>
      </div>
      <div className="w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-neon to-info transition-all duration-700 glow-neon"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
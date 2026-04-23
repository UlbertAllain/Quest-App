export default function QuestCard({ task, onComplete }: any) {
  const diffConfig: Record<string, { bg: string; text: string; glow: string }> = {
    easy: { bg: "bg-neon/10", text: "text-neon", glow: "glow-neon" },
    medium: { bg: "bg-info/10", text: "text-info", glow: "glow-info" },
    hard: { bg: "bg-danger/10", text: "text-danger", glow: "glow-danger" },
  };

  const d = diffConfig[task.difficulty] || diffConfig.easy;

  return (
    <div
      className={`card-neon flex justify-between items-center gap-4 ${
        task.isCompleted ? "opacity-50" : "hover:scale-[1.01]"
      }`}
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-semibold text-base ${
            task.isCompleted
              ? "line-through text-muted"
              : "text-slate-200"
          }`}
        >
          {task.title}
        </h3>

        <div className="flex items-center gap-3 mt-2.5">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${d.bg} ${d.text} ${!task.isCompleted ? d.glow : ""}`}
          >
            {task.difficulty}
          </span>

          <div className="flex items-center gap-1.5 text-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-neon font-semibold font-display text-xs">
              +{task.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      {task.isCompleted ? (
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neon/[0.06] border border-neon/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          <span className="text-neon text-sm font-medium">Done</span>
        </div>
      ) : (
        <button
          onClick={() => onComplete(task)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon to-green-600 text-deep text-sm font-semibold transition-all hover:-translate-y-0.5 glow-neon hover:shadow-[0_0_24px_rgba(34,197,94,0.45)] active:translate-y-0 shrink-0"
        >
          Complete
        </button>
      )}
    </div>
  );
}
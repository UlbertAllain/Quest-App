import { useState } from "react";

export default function AddTask({
  title,
  setTitle,
  difficulty,
  setDifficulty,
  addTask,
}: any) {
  const difficulties = [
    { value: "easy", label: "Easy", activeClass: "active-easy" },
    { value: "medium", label: "Medium", activeClass: "active-medium" },
    { value: "hard", label: "Hard", activeClass: "active-hard" },
  ];

  const [focused, setFocused] = useState(false);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask();
  };

  return (
    <div className="card-neon space-y-3">
      {/* Input */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
          focused
            ? "border-neon/30 bg-neon/[0.03]"
            : "border-subtle/50 bg-dark/50"
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={focused ? "#22c55e" : "#64748b"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-colors"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4Z" />
        </svg>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add new quest..."
          className="bg-transparent w-full outline-none text-sm text-slate-200 placeholder:text-muted/60"
        />
      </div>

      {/* Difficulty + Button row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2">
          {difficulties.map((d) => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              className={`diff-pill ${difficulty === d.value ? d.activeClass : ""}`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          disabled={!title.trim()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-neon to-green-600 text-deep text-sm font-semibold transition-all hover:-translate-y-0.5 glow-neon disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
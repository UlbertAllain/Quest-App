"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Deterministic particle positions (no Math.random → no hydration mismatch)
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: `${(i * 5.3 + 10) % 100}%`,
  y: `${(i * 3.7 + 5) % 40}%`,
  dx: `${((i * 11) % 7 - 3) * 10}px`,
  duration: `${4 + (i % 6)}s`,
  delay: `${(i * 0.7) % 8}s`,
  color: i % 3 === 0 ? "#38bdf8" : "#22c55e",
  size: i % 5 === 0 ? 3 : 2,
}));

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Login gagal. Coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page bg-dark">
      {/* Background layers */}
      <div className="grid-overlay" />
      <div className="scanline" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Particles */}
      <div className="particles">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={
              {
                "--x": p.x,
                "--y": p.y,
                "--dx": p.dx,
                "--duration": p.duration,
                "--delay": p.delay,
                width: p.size,
                height: p.size,
                background: p.color,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Card with rotating border */}
      <div className="login-card-outer">
        <div className="login-card-inner">
          {/* Badge */}
          <div
            className="flex justify-center mb-7"
            style={{ animation: "fadeInUp 0.8s ease-out 0.1s both" }}
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-neon"
                style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
              />
              <span className="font-display text-[11px] font-semibold tracking-[2px] text-neon uppercase">
                System Online
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-display text-[26px] font-extrabold text-center leading-tight mb-2.5"
            style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}
          >
            Start Your{" "}
            <span className="bg-gradient-to-r from-neon to-info bg-clip-text text-transparent">
              Quest
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-center text-muted text-sm leading-relaxed mb-8"
            style={{ animation: "fadeInUp 0.8s ease-out 0.3s both" }}
          >
            Masuk untuk melacak XP, menyelesaikan quest,
            <br />
            dan naik level dalam perjalananmu.
          </p>

          {/* Stats row */}
          <div
            className="flex justify-center gap-8 mb-7"
            style={{ animation: "fadeInUp 0.8s ease-out 0.35s both" }}
          >
            {[
              {
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ),
                value: "0",
                label: "XP",
                cls: "bg-neon/10 border-neon/20 text-neon",
              },
              {
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4Z" /></svg>
                ),
                value: "0",
                label: "Quest",
                cls: "bg-info/10 border-info/20 text-info",
              },
              {
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 6 9 6 9Z" /><path d="M18 9h1.5a2.5 2.5 0 000-5C17 4 18 9 18 9Z" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0012 0V2Z" /></svg>
                ),
                value: "—",
                label: "Rank",
                cls: "bg-gold/10 border-gold/20 text-gold",
              },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-[10px] flex items-center justify-center border ${s.cls}`}
                >
                  {s.icon}
                </div>
                <span className="font-display text-[13px] font-bold text-slate-200">
                  {s.value}
                </span>
                <span className="text-[10px] text-muted uppercase tracking-wider font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* XP Bar */}
          <div
            className="mb-7"
            style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-display text-[10px] text-neon tracking-wider font-semibold">
                LEVEL PROGRESS
              </span>
              <span className="font-display text-[10px] text-muted font-medium">
                0 / 100 XP
              </span>
            </div>
            <div className="w-full h-1 bg-neon/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon to-info glow-neon xp-fill-animated"
                style={{ "--fill": "0%" } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Divider */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{ animation: "fadeInUp 0.8s ease-out 0.45s both" }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-subtle/40" />
            <span className="text-[10px] text-muted uppercase tracking-[2px] font-medium">
              Authenticate
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-subtle/40" />
          </div>

          {/* Button */}
          <button
            onClick={login}
            disabled={isLoading}
            className="login-btn w-full py-3.5 px-6 rounded-xl border-none cursor-pointer flex items-center justify-center gap-3 text-[15px] font-semibold text-deep bg-gradient-to-r from-neon to-green-600 glow-neon-strong hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ animation: "fadeInUp 0.8s ease-out 0.5s both" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isLoading ? (
                <span
                  className="w-5 h-5 border-2 border-deep/20 border-t-deep rounded-full"
                  style={{ animation: "spinFast 0.6s linear infinite" }}
                />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              {isLoading ? "Connecting..." : "Login with Google"}
            </span>
          </button>

          {/* Error */}
          {error && (
            <div
              className="mt-4 px-4 py-3 rounded-xl bg-danger/[0.06] border border-danger/20 text-red-300 text-[13px] text-center"
              style={{ animation: "fadeInUp 0.4s ease-out" }}
            >
              {error}
            </div>
          )}

          {/* Bottom */}
          <p
            className="mt-6 text-center text-[12px] text-muted leading-relaxed"
            style={{ animation: "fadeInUp 0.8s ease-out 0.6s both" }}
          >
            <span className="text-neon font-medium">●</span> Koneksi
            terenkripsi &amp; aman
            <br />
            Data quest-mu tersimpan otomatis
          </p>
        </div>
      </div>
    </div>
  );
}
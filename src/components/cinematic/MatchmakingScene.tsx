import { motion } from "framer-motion";
import fistClash from "@/assets/fist-clash.png";

/**
 * Cinematic fist-clash matchmaking scene (red vs blue).
 *
 * Renders centered over a dimmed page. No modal chrome — just the artwork,
 * an ambient halo, shockwave rings, and the caption. The Dialog overlay
 * handles the page dimming behind it.
 *
 * The fist image PNG has a pure-black background, which we drop out via
 * `mix-blend-mode: screen` so only the glowing fists + energy streaks show.
 */
export function MatchmakingScene({
  label = "MATCHMAKING...",
  sub = "Please wait a moment.",
}: {
  label?: string;
  sub?: string;
}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
      {/* Ambient radial vignette focused on the artwork (red left, blue right) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] max-w-[90vw] max-h-[90vh] bg-[radial-gradient(ellipse_at_40%_50%,oklch(0.35_0.2_25/0.55),transparent_55%),radial-gradient(ellipse_at_60%_50%,oklch(0.35_0.2_240/0.5),transparent_55%)] rounded-full blur-2xl" />

      {/* Central glowing halo so the fists feel hot */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle,oklch(0.95_0.22_40/0.55) 0%,oklch(0.62_0.24_25/0.3) 28%,transparent 65%)",
          mixBlendMode: "screen",
        }}
        animate={{ scale: [0.88, 1.12, 0.88], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fist-clash artwork — black background drops out via screen blend.
          Fixed maximum size so it stays cinematic but never overpowers. */}
      <motion.img
        src={fistClash}
        alt=""
        aria-hidden
        draggable={false}
        className="relative w-[560px] max-w-[75vw] h-auto select-none"
        style={{ mixBlendMode: "screen" }}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: [1, 1.04, 1], opacity: 1 }}
        transition={{
          scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.6 },
        }}
      />

      {/* Expanding shockwave rings at impact center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/45"
        style={{ width: 180, height: 180 }}
        animate={{ scale: [0.6, 1.8, 2.3], opacity: [0.85, 0.25, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[oklch(0.7_0.2_240)]/45"
        style={{ width: 180, height: 180 }}
        animate={{ scale: [0.6, 1.8, 2.3], opacity: [0.85, 0.25, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
      />

      {/* Caption below the artwork */}
      <div className="relative mt-4 flex flex-col items-center text-center px-6">
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
            textShadow: [
              "0 0 8px oklch(0.62 0.24 25 / 0.35)",
              "0 0 24px oklch(0.62 0.24 25 / 0.95)",
              "0 0 8px oklch(0.62 0.24 25 / 0.35)",
            ],
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="font-display font-black text-[22px] tracking-[0.22em] text-primary italic"
        >
          {label}
        </motion.div>
        <div className="text-[13px] text-foreground/85 mt-2 tracking-wide">{sub}</div>
      </div>
    </div>
  );
}

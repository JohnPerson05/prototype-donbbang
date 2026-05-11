import { motion } from "framer-motion";
import fistClash from "@/assets/fist-clash.png";

/**
 * Cinematic fist-clash matchmaking scene (red vs blue).
 *
 * Renders centered, container-responsive. No chrome — just ambient halo,
 * the clash artwork, shockwave rings, and the caption below.
 *
 * The fist image has a pure-black background which is dropped out via
 * `mix-blend-mode: screen`, so only the glowing fists + streaks remain
 * over whatever surface is behind.
 */
export function MatchmakingScene({
  label = "MATCHMAKING...",
  sub = "Please wait a moment.",
  compact = false,
}: {
  label?: string;
  sub?: string;
  compact?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none px-2">
      {/* Ambient radial vignette (red left, blue right) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_50%,oklch(0.35_0.2_25/0.35),transparent_55%),radial-gradient(ellipse_at_65%_50%,oklch(0.35_0.2_240/0.32),transparent_55%)]" />

      {/* Central impact halo */}
      <motion.div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: compact ? 140 : 300,
          height: compact ? 140 : 300,
          background:
            "radial-gradient(circle,oklch(0.95_0.22_40/0.5) 0%,oklch(0.62_0.24_25/0.28) 30%,transparent 65%)",
          mixBlendMode: "screen",
        }}
        animate={{ scale: [0.88, 1.1, 0.88], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fist-clash artwork — black bg drops out via screen blend */}
      <motion.img
        src={fistClash}
        alt=""
        aria-hidden
        draggable={false}
        className="relative w-full h-auto object-contain select-none z-[1]"
        style={{
          mixBlendMode: "screen",
          maxWidth: compact ? 180 : 560,
          maxHeight: compact ? "62%" : "68%",
        }}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: [1, 1.04, 1], opacity: 1 }}
        transition={{
          scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.5 },
        }}
      />

      {/* Expanding shockwave rings at impact center */}
      <motion.div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
        style={{ width: compact ? 70 : 170, height: compact ? 70 : 170 }}
        animate={{ scale: [0.6, 1.8, 2.3], opacity: [0.8, 0.22, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[oklch(0.7_0.2_240)]/40"
        style={{ width: compact ? 70 : 170, height: compact ? 70 : 170 }}
        animate={{ scale: [0.6, 1.8, 2.3], opacity: [0.8, 0.22, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
      />

      {/* Caption */}
      <div className="relative z-[2] mt-2 flex flex-col items-center text-center">
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
            textShadow: [
              "0 0 6px oklch(0.62 0.24 25 / 0.3)",
              "0 0 22px oklch(0.62 0.24 25 / 0.95)",
              "0 0 6px oklch(0.62 0.24 25 / 0.3)",
            ],
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className={`font-display font-black text-primary italic tracking-[0.2em] ${
            compact ? "text-[13px]" : "text-[22px]"
          }`}
        >
          {label}
        </motion.div>
        <div className={`text-foreground/80 mt-1 ${compact ? "text-[10px]" : "text-[13px]"}`}>{sub}</div>
      </div>
    </div>
  );
}

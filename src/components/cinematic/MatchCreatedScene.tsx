import { motion } from "framer-motion";
import fistPower from "@/assets/fist-power.png";

/**
 * Cinematic "MATCH CREATED" / "APPLICATION COMPLETE" scene.
 *
 * Container-responsive. Red ambient vignette, pulsing halo, the power-fist
 * artwork (black background dropped via `mix-blend-mode: screen`),
 * expanding shockwaves, and caption.
 */
export function MatchCreatedScene({
  label = "MATCH CREATED!",
  sub = "Your match has been created successfully.",
  compact = false,
}: {
  label?: string;
  sub?: string;
  compact?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none px-2">
      {/* Red ambient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.35_0.2_25/0.45),transparent_60%)]" />

      {/* Central pulsing halo */}
      <motion.div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: compact ? 170 : 320,
          height: compact ? 170 : 320,
          background:
            "radial-gradient(circle,oklch(0.95_0.22_40/0.6) 0%,oklch(0.65_0.26_25/0.38) 26%,transparent 68%)",
          mixBlendMode: "screen",
        }}
        animate={{ scale: [0.88, 1.12, 0.88], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Power-fist artwork */}
      <motion.img
        src={fistPower}
        alt=""
        aria-hidden
        draggable={false}
        className="relative w-full h-auto object-contain select-none z-[1]"
        style={{
          mixBlendMode: "screen",
          maxWidth: compact ? 200 : 520,
          maxHeight: compact ? "68%" : "70%",
        }}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: [1, 1.05, 1], opacity: 1 }}
        transition={{
          scale: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.5 },
        }}
      />

      {/* Expanding shockwaves */}
      {[0, 0.3, 0.6].map((d, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/55"
          style={{ width: compact ? 70 : 160, height: compact ? 70 : 160 }}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: [0.5, 2.8], opacity: [0.9, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: d }}
        />
      ))}

      {/* Caption */}
      <div className="relative z-[2] mt-2 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className={`font-display font-black italic text-foreground tracking-[0.18em] drop-shadow-[0_0_18px_oklch(0.62_0.24_25/0.9)] ${
            compact ? "text-[14px]" : "text-[22px]"
          }`}
        >
          {label}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`text-foreground/80 mt-1 max-w-[280px] ${compact ? "text-[10px]" : "text-[13px]"}`}
        >
          {sub}
        </motion.div>
      </div>
    </div>
  );
}

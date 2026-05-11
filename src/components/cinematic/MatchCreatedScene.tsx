import { motion } from "framer-motion";
import fistPower from "@/assets/fist-power.png";

/**
 * Cinematic "APPLICATION COMPLETE" / "MATCH CREATED" scene.
 *
 * Width-first sizing (mirrors MatchmakingScene so the transition between
 * the two scenes is continuous):
 *   • compact = true  → scene width = column width.
 *   • compact = false → scene width caps at `min(92vw, 720px)`.
 *
 * The image height follows from its natural aspect — it never stretches
 * vertically to fill the container. Edge blending uses a radial mask
 * plus `mix-blend-mode: screen` so no square or hard border is visible.
 *
 * The image itself is static. Motion lives only in the ambient halo
 * and expanding shockwaves.
 */

const EDGE_MASK =
  "radial-gradient(circle at center, black 55%, transparent 92%)";

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
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
      {/* Full-bleed red ambient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.35_0.2_25/0.45),transparent_65%)]" />

      {/* Image stack — width-driven, height follows image aspect */}
      <div
        className="relative w-full"
        style={
          compact
            ? { maxWidth: "100%" }
            : { maxWidth: "min(92vw, 720px)" }
        }
      >
        {/* Halo extends past the image so the red glow reaches corners */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full aspect-square"
          style={{
            width: "115%",
            background:
              "radial-gradient(circle,oklch(0.95_0.22_40/0.6) 0%,oklch(0.65_0.26_25/0.36) 28%,transparent 68%)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Shockwaves */}
        {[0, 0.35, 0.7].map((d, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/55"
            style={{ width: "24%", aspectRatio: "1" }}
            animate={{ scale: [0.5, 3.0], opacity: [0.9, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: d }}
          />
        ))}

        {/* Power-fist artwork — width-driven, natural height, static */}
        <motion.img
          src={fistPower}
          alt=""
          aria-hidden
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative block w-full h-auto select-none"
          style={{
            mixBlendMode: "screen",
            maskImage: EDGE_MASK,
            WebkitMaskImage: EDGE_MASK,
          }}
        />
      </div>

      {/* Caption centered below the image */}
      <div
        className={`relative z-[2] flex flex-col items-center text-center px-2 ${
          compact ? "mt-1" : "mt-4"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className={`font-display font-black italic text-foreground tracking-[0.18em] drop-shadow-[0_0_16px_oklch(0.62_0.24_25/0.9)] ${
            compact ? "text-[14px]" : "text-[28px]"
          }`}
        >
          {label}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className={`text-foreground/80 ${compact ? "text-[10px] mt-0.5" : "text-[14px] mt-2"}`}
        >
          {sub}
        </motion.div>
      </div>
    </div>
  );
}

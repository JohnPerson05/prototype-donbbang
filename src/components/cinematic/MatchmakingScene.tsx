import { motion } from "framer-motion";
import fistClash from "@/assets/fist-clash.png";

/**
 * Cinematic fist-clash matchmaking scene (red vs blue).
 *
 * Sizing is HORIZONTAL first. The image takes 100% of the available
 * WIDTH and its height follows from the PNG's natural aspect ratio —
 * it never stretches vertically to fill the container. The scene box
 * is centered as a whole so extra vertical space becomes breathing
 * room above/below, not a bigger image.
 *
 *   • compact = true  → inside a center panel column. Scene width =
 *     column width; image sits tight to the column edges.
 *   • compact = false → Create Match fullscreen. Scene width caps at
 *     `min(92vw, 720px)` so the image reads large but never feels huge.
 *
 * Edge blending: PNG black drops via `mix-blend-mode: screen`, plus a
 * radial mask feathers the image to transparent before its rectangle
 * edge, so there is no visible square or hard border — it blends like
 * a logo into whatever surface sits behind.
 *
 * The image itself is static. Motion lives only in the ambient halo
 * (opacity pulse) and expanding shockwave rings.
 */

const EDGE_MASK =
  "radial-gradient(circle at center, black 55%, transparent 92%)";

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
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
      {/* Full-bleed ambient vignette — fills scene corners */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.35_0.2_25/0.38),transparent_62%),radial-gradient(ellipse_at_70%_50%,oklch(0.35_0.2_240/0.35),transparent_62%)]" />

      {/* Image stack — sized by WIDTH, height follows from image ratio.
          This box does NOT grow with extra vertical space. */}
      <div
        className="relative w-full"
        style={
          compact
            ? { maxWidth: "100%" }
            : { maxWidth: "min(92vw, 720px)" }
        }
      >
        {/* Halo sits behind the image, overflows outward so the red/blue
            glow reaches the scene edges without depending on image size. */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full aspect-square"
          style={{
            width: "110%",
            background:
              "radial-gradient(circle,oklch(0.95_0.22_40/0.5) 0%,oklch(0.62_0.24_25/0.26) 32%,transparent 68%)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Shockwave rings — scaled off the image width */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35"
          style={{ width: "26%", aspectRatio: "1" }}
          animate={{ scale: [0.6, 2.4, 2.8], opacity: [0.75, 0.15, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[oklch(0.7_0.2_240)]/35"
          style={{ width: "26%", aspectRatio: "1" }}
          animate={{ scale: [0.6, 2.4, 2.8], opacity: [0.75, 0.15, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
        />

        {/* Fist artwork — width-driven, natural height, static */}
        <motion.img
          src={fistClash}
          alt=""
          aria-hidden
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative block w-full h-auto select-none"
          style={{
            mixBlendMode: "screen",
            maskImage: EDGE_MASK,
            WebkitMaskImage: EDGE_MASK,
          }}
        />
      </div>

      {/* Caption — centered below the image, spacing scales with mode */}
      <div
        className={`relative z-[2] flex flex-col items-center text-center px-2 ${
          compact ? "mt-1" : "mt-4"
        }`}
      >
        <motion.div
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className={`font-display font-black text-primary italic tracking-[0.2em] drop-shadow-[0_0_14px_oklch(0.62_0.24_25/0.85)] ${
            compact ? "text-[13px]" : "text-[28px]"
          }`}
        >
          {label}
        </motion.div>
        <div className={`text-foreground/80 ${compact ? "text-[10px] mt-0.5" : "text-[14px] mt-2"}`}>{sub}</div>
      </div>
    </div>
  );
}

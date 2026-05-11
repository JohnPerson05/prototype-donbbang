import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import fistClash from "@/assets/fist-clash.png";

/**
 * Cinematic fist-clash matchmaking scene (red vs blue).
 *
 * Sizing is WIDTH-FIRST. Image takes 100% of the available width, its
 * height follows the PNG's natural aspect ratio. Never stretches
 * vertically.
 *
 * Production-smooth loading: the PNG is preloaded at app boot
 * (see src/lib/preload-cinematic.ts). This component ALSO proactively
 * decodes the image before rendering it, so on the very first open the
 * bitmap is either already in cache or finishes decoding in parallel
 * with the halo pulse — no missing-then-appearing artifacts.
 *
 * Edge blending: PNG black is dropped via `mix-blend-mode: screen`,
 * and a radial mask feathers the image to transparent before its
 * rectangle edges so no square/border is visible.
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
  // Track readiness so we fade the image in only once decoded.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    if ("fetchPriority" in img) {
      (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
    }
    img.src = fistClash;
    img
      .decode()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        // Fallback if decode() rejects (e.g. older browsers): use onload.
        if (img.complete) {
          if (!cancelled) setReady(true);
        } else {
          img.onload = () => !cancelled && setReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
      {/* Full-bleed ambient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.35_0.2_25/0.38),transparent_62%),radial-gradient(ellipse_at_70%_50%,oklch(0.35_0.2_240/0.35),transparent_62%)]" />

      <div
        className="relative w-full"
        style={compact ? { maxWidth: "100%" } : { maxWidth: "min(92vw, 720px)" }}
      >
        {/* Halo extends past the image so the glow reaches scene corners */}
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

        {/* Shockwave rings scaled from the image width */}
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

        {/* Fist artwork — fades in only once decoded to avoid blank frames */}
        <motion.img
          src={fistClash}
          alt=""
          aria-hidden
          draggable={false}
          decoding="async"
          loading="eager"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative block w-full h-auto select-none"
          style={{
            mixBlendMode: "screen",
            maskImage: EDGE_MASK,
            WebkitMaskImage: EDGE_MASK,
          }}
        />
      </div>

      {/* Caption */}
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

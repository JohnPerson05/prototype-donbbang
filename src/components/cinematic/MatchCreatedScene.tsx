import { motion } from "framer-motion";
import fistPower from "@/assets/fist-power.png";

/**
 * Cinematic "MATCH CREATED" / "APPLICATION COMPLETE" scene.
 *
 * Renders centered over a dimmed page. No modal chrome — just the red
 * power-fist artwork, an impact halo, expanding shockwaves, and the caption.
 *
 * The PNG has a pure-black background which `mix-blend-mode: screen`
 * drops out so only the red fist + spark streaks light up on the page.
 */
export function MatchCreatedScene({
  label = "MATCH CREATED!",
  sub = "Your match has been created successfully.",
}: {
  label?: string;
  sub?: string;
}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
      {/* Red ambient vignette focused on the artwork */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] max-w-[90vw] max-h-[90vh] bg-[radial-gradient(circle,oklch(0.35_0.2_25/0.6),transparent_58%)] rounded-full blur-2xl" />

      {/* Central pulsing halo to punch up the impact */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 340,
          height: 340,
          background:
            "radial-gradient(circle,oklch(0.95_0.22_40/0.6) 0%,oklch(0.65_0.26_25/0.4) 26%,transparent 68%)",
          mixBlendMode: "screen",
        }}
        animate={{ scale: [0.88, 1.12, 0.88], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Power-fist artwork — black background drops out via screen blend */}
      <motion.img
        src={fistPower}
        alt=""
        aria-hidden
        draggable={false}
        className="relative w-[520px] max-w-[70vw] h-auto select-none"
        style={{ mixBlendMode: "screen" }}
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/55"
          style={{ width: 160, height: 160 }}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: [0.5, 2.8], opacity: [0.9, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: d }}
        />
      ))}

      {/* Caption below the artwork */}
      <div className="relative mt-4 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-display font-black text-[24px] tracking-[0.18em] italic text-foreground drop-shadow-[0_0_22px_oklch(0.62_0.24_25/0.9)]"
        >
          {label}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-[13px] text-foreground/85 mt-2 max-w-[320px]"
        >
          {sub}
        </motion.div>
      </div>
    </div>
  );
}

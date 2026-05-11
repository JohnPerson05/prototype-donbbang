import vsImg from "@/assets/vs.png";

/**
 * Renders the provided red-V / blue-S "VS" artwork inline.
 * The PNG has a pure-black background which is dropped via
 * `mix-blend-mode: screen`, leaving only the glowing letters and sparks.
 */
export function VsBadge({ size = 130, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={vsImg}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none pointer-events-none ${className}`}
      style={{ width: size, height: "auto", mixBlendMode: "screen" }}
    />
  );
}

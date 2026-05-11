import fistClash from "@/assets/fist-clash.png";
import fistPower from "@/assets/fist-power.png";
import vsImg from "@/assets/vs.png";

/**
 * Warm the browser cache + decode queue for the cinematic artwork
 * before any modal opens.
 *
 * The cinematic PNGs are large (multi-MB), so if the user clicks
 * "Create Match" or "Join Match" before the assets have loaded, the
 * scene mounts, the animation starts, but the <img> is still being
 * fetched from the server — resulting in a blank-then-appearing
 * artifact on the first click.
 *
 * Strategy (all three layers):
 *   1. Inject <link rel="preload" as="image"> tags into <head> so the
 *      browser queues the fetch with high priority. The URLs are the
 *      production-hashed paths emitted by Vite (e.g.
 *      /assets/fist-clash-CUoZeca3.png), resolved by the static
 *      import above — so this works identically in dev and prod.
 *   2. Fire a fetch via `new Image().src = url` for older browsers
 *      that ignore preload hints.
 *   3. Call `.decode()` so the bitmap is pre-decoded into memory and
 *      ready to paint on the very first frame it's needed.
 *
 * Runs once, non-blocking. Safe to call repeatedly — guarded by a flag.
 */

const CINEMATIC_ASSETS = [fistClash, fistPower, vsImg];

let started = false;

export function preloadCinematicAssets(): void {
  if (started || typeof document === "undefined") return;
  started = true;

  for (const url of CINEMATIC_ASSETS) {
    // Layer 1: declarative browser preload hint with correct hashed URL.
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    // `fetchpriority="high"` is safe to set as an attribute on all browsers
    // that ignore it — unknown attributes are harmless.
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);

    // Layer 2 + 3: kick off the fetch + decode so the bitmap is ready
    // to paint instantly when the scene component mounts.
    const img = new Image();
    img.decoding = "async";
    if ("fetchPriority" in img) {
      (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
    }
    img.src = url;
    img.decode?.().catch(() => {
      // decode() can reject on some browsers — that's fine, the fetch is
      // already in flight and the browser will lazy-decode on use.
    });
  }
}

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Swords, Users, MessageCircle, Bell, Headphones, HelpCircle } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { games } from "@/data/mock";
import hero from "@/assets/hero-prize-match.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const quickLinks = [
  { icon: Swords, title: "Join Live Match", sub: "Jump into action" },
  { icon: Users, title: "Find / Recruit", sub: "Team Members" },
  { icon: MessageCircle, title: "Community", sub: "Discussions" },
  { icon: Bell, title: "Latest", sub: "Announcements" },
  { icon: Headphones, title: "Customer Support", sub: "Help & Support" },
];

function Home() {
  return (
    <Shell>
      {/* Hero - PRIZE MATCH banner */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl border border-border"
      >
        <img src={hero} alt="Prize Match" width={1600} height={800} className="w-full h-[300px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.08_25)]/70 via-[oklch(0.13_0.02_260)]/50 to-[oklch(0.18_0.08_240)]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-[13px] tracking-[0.2em] font-semibold text-foreground/90 uppercase">
            Intense Player vs Player Showdown
          </div>
          <div className="font-display text-[54px] font-black tracking-tight text-foreground leading-none mt-1 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            PRIZE MATCH
          </div>
          <div className="mt-3 font-display text-[40px] font-black italic text-primary drop-shadow-[0_0_20px_oklch(0.62_0.24_25/0.8)]">
            VS
          </div>

          <div className="flex items-center justify-between w-full max-w-[640px] px-10 mt-4">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-[68px] h-[68px] rounded-full bg-primary/90 flex items-center justify-center text-[30px] font-display font-black shadow-[0_0_30px_oklch(0.62_0.24_25/0.7)]">
                A
              </div>
              <span className="font-display font-bold tracking-[0.2em] text-[11px]">PLAYER A</span>
            </div>
            <Button className="btn-neon border-0 h-11 px-10 font-display font-black text-[14px] tracking-[0.15em]">
              JOIN NOW!
            </Button>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-[68px] h-[68px] rounded-full bg-[oklch(0.55_0.2_240)]/90 flex items-center justify-center text-[30px] font-display font-black shadow-[0_0_30px_oklch(0.55_0.2_240/0.7)]">
                B
              </div>
              <span className="font-display font-bold tracking-[0.2em] text-[11px]">PLAYER B</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Links */}
      <div className="panel p-3 grid grid-cols-2 md:grid-cols-5 gap-1.5">
        {quickLinks.map((q, i) => (
          <button
            key={i}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-accent transition-colors group"
          >
            <div className="w-9 h-9 rounded-md bg-secondary border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_12px_var(--neon)] transition">
              <q.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
            </div>
            <div className="text-left leading-tight">
              <div className="text-[12.5px] font-semibold">{q.title}</div>
              <div className="text-[11px] text-muted-foreground">{q.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Match Code */}
      <div className="panel neon-border p-3 flex items-center gap-3">
        <span className="font-bold text-[13px] text-primary whitespace-nowrap">Enter Match Code</span>
        <Input placeholder="Enter your match code (e.g., ABC123)" className="bg-input/60 border-border h-10" />
        <Button className="btn-neon border-0 h-10 px-5 font-semibold text-[13px]">Join Match</Button>
        <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Game Categories */}
      <div className="panel p-4 space-y-3">
        <h3 className="font-bold text-[14px] tracking-tight">Game Categories</h3>
        <div className="flex gap-2 flex-wrap">
          {["All", "Strategy (RTS)", "Fighting", "Sports", "FPS"].map((c, i) => (
            <Button
              key={c}
              variant={i === 0 ? "default" : "outline"}
              className={`h-8 px-4 text-[12px] font-semibold ${
                i === 0 ? "btn-neon border-0" : "border-border bg-transparent hover:bg-accent"
              }`}
            >
              {c}
            </Button>
          ))}
        </div>

        {Object.entries(games).map(([category, list]) => (
          <div key={category} className="space-y-2">
            <div className="text-[12px] font-bold tracking-tight text-[var(--neon-blue)] uppercase">
              {category}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {list.map((g) => (
                <motion.div
                  key={g}
                  whileHover={{ y: -3 }}
                  className="aspect-[4/3] rounded-md border border-border bg-gradient-to-br from-secondary to-panel flex items-end p-2.5 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_18px_var(--neon)] transition relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.24_25/0.15),transparent_70%)]" />
                  <span className="font-display font-bold uppercase tracking-wider text-[12px] relative z-10">
                    {g}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

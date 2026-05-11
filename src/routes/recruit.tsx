import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Gamepad2, Plus } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateRecruitModal } from "@/components/modals/CreateRecruitModal";
import { useApp } from "@/store/app";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/recruit")({
  component: Recruit,
  head: () => ({
    meta: [
      { title: "Team Recruit — DONBBANG" },
      { name: "description", content: "Find teammates and post recruit calls." },
    ],
  }),
});

const quickFilters = ["All", "Recruiting", "Looking for Team", "Jungler", "Top Laner", "Mid Laner", "ADC", "Support"];

function Recruit() {
  const t = useT();
  const recruits = useApp((s) => s.recruits);
  const [qf, setQf] = useState("All");
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <Shell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-[22px] tracking-tight leading-none">{t("recruit.title")}</h1>
          <p className="text-[12px] text-muted-foreground mt-1.5">{t("recruit.subtitle")}</p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="btn-neon border-0 h-10 px-4 font-bold tracking-wider text-[12px] gap-1.5"
        >
          <Plus className="w-4 h-4" /> {t("recruit.create")}
        </Button>
      </div>

      <div className="panel p-4">
        <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2.5">
          {t("recruit.filters")}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {[
            { label: "Game", values: ["All Games", "Overwatch 2", "LoL", "Valorant"] },
            { label: "Role", values: ["All Roles", "Tank", "Damage", "Support"] },
            { label: "Rank", values: ["All Ranks", "Bronze", "Silver", "Gold"] },
            { label: "Tier", values: ["All Tiers", "Ranked", "Scrim", "Daily"] },
            { label: "Available Time", values: ["All Times", "Morning", "Evening"] },
            { label: "Recruitment Status", values: ["All", "Recruiting", "Looking for Team", "Closed"] },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-[10.5px] text-muted-foreground">{f.label}</label>
              <Select defaultValue={f.values[0]}>
                <SelectTrigger className="h-9 mt-1 bg-input/60 border-border text-[11.5px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {f.values.map((v) => (
                    <SelectItem value={v} key={v} className="text-[12px]">
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Button className="btn-neon border-0 h-9 px-5 text-[11.5px] font-bold tracking-wider">
            {t("common.search")}
          </Button>
          <Button
            variant="outline"
            className="h-9 border-border bg-secondary/40 px-5 text-[11.5px] font-bold tracking-wider"
          >
            {t("common.reset")}
          </Button>
        </div>

        <div className="text-[11px] font-bold tracking-wider text-muted-foreground mt-4 mb-2">
          {t("recruit.quick")}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {quickFilters.map((q) => (
            <button
              key={q}
              onClick={() => setQf(q)}
              className={`h-7 px-3 rounded text-[11px] font-semibold transition ${
                qf === q
                  ? "btn-neon border-0"
                  : "bg-secondary/40 border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="panel p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[12px] font-bold tracking-wider">
            {t("recruit.list")} <span className="text-muted-foreground font-normal">{recruits.length} posts</span>
          </div>
          <Select defaultValue="popular">
            <SelectTrigger className="w-[120px] h-8 bg-input/60 border-border text-[11px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">POPULAR</SelectItem>
              <SelectItem value="latest">LATEST</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {recruits.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-md bg-secondary/30 border border-border hover:border-primary/40 transition cursor-pointer"
            >
              <div className="w-16 h-16 rounded-md bg-gradient-to-br from-secondary to-panel border border-border flex items-center justify-center shrink-0">
                <Gamepad2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-[oklch(0.35_0.12_240)] text-[oklch(0.8_0.15_240)]">
                    {r.category.replace("_", " ")}
                  </span>
                  <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-gold/20 text-gold">{r.tier}</span>
                </div>
                <div className="font-bold text-[13px] tracking-tight">{r.title}</div>
                <div className="flex items-center gap-3 text-[10.5px] text-muted-foreground mt-1">
                  <span>{r.author}</span>
                  <span>•</span>
                  <span>{r.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap max-w-[240px] justify-end">
                {r.roles.map((role) => (
                  <span
                    key={role}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/60 border border-border text-muted-foreground"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-muted-foreground">Current Members</div>
                <div className="font-bold text-[14px] text-primary">{r.members}</div>
              </div>
              <div
                className={`w-[80px] text-center py-2 rounded-md text-[10.5px] font-bold tracking-wide ${
                  r.status === "RECRUITING"
                    ? "bg-success/15 text-success border border-success/40"
                    : "bg-[oklch(0.35_0.12_240)]/30 text-[oklch(0.75_0.18_240)] border border-[oklch(0.55_0.2_240)]/40"
                }`}
              >
                {r.status.replace("_", " ")}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1 mt-5">
          <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
            <ChevronLeft className="w-3 h-3" />
          </button>
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              className={`w-7 h-7 rounded-md text-[11.5px] font-semibold transition ${
                p === 1
                  ? "btn-neon border-0"
                  : "bg-secondary/40 border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
          <span className="text-muted-foreground text-[11.5px] px-2">...</span>
          <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground text-[11.5px]">
            13
          </button>
          <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <CreateRecruitModal open={createOpen} onOpenChange={setCreateOpen} />
    </Shell>
  );
}

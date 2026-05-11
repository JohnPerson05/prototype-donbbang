import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, RefreshCw } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateMatchModal } from "@/components/modals/CreateMatchModal";
import { MatchDetailModal } from "@/components/modals/MatchDetailModal";
import { useApp, type Match } from "@/store/app";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/live-match")({
  component: LiveMatch,
});

const stakeFilters = ["All", "Under 10K", "10K ~ 30K", "30K ~ 50K", "50K ~ 100K", "Over 100K"];

function LiveMatch() {
  const t = useT();
  const matches = useApp((s) => s.matches);
  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<Match | null>(null);
  const [q, setQ] = useState("");
  const [stake, setStake] = useState("All");

  const filtered = matches.filter(
    (m) => !q || m.title.toLowerCase().includes(q.toLowerCase()) || m.game.toLowerCase().includes(q.toLowerCase()),
  );

  const statusColor = (s: string) =>
    s === "Recruiting"
      ? "text-success"
      : s === "Waiting"
        ? "text-gold"
        : s === "In Progress"
          ? "text-[oklch(0.7_0.2_240)]"
          : "text-muted-foreground";

  return (
    <Shell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-[26px] text-primary tracking-tight leading-none">
            {t("live.title")}
          </h1>
          <p className="text-[12px] text-muted-foreground mt-1.5">{t("live.subtitle")}</p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="btn-neon border-0 h-10 px-4 font-bold tracking-wider text-[12px] gap-1.5"
        >
          <Plus className="w-4 h-4" /> {t("live.create")}
        </Button>
      </div>

      <div className="panel p-4">
        <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2.5">
          {t("live.matchSearch")}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {[
            { label: "Game", values: ["All Games", "Overwatch 2", "LoL", "Valorant"] },
            { label: "Match Type", values: ["All", "1v1", "2v2", "5v5"] },
            { label: "Stake", values: ["All", "Under 10K", "10K ~ 30K"] },
            { label: "Server / Region", values: ["All Servers", "Asia", "NA", "EU"] },
            { label: "Mode (Format)", values: ["All", "Best of 1", "Best of 3", "Best of 5"] },
            { label: "Sort By", values: ["Newest", "Popular", "Stake: High"] },
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

        <div className="flex items-center gap-2 mt-2">
          <Button className="btn-neon border-0 h-9 px-5 text-[11.5px] font-bold tracking-wider">
            {t("common.search")}
          </Button>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-4 mt-4">
          <div>
            <label className="text-[10.5px] text-muted-foreground">{t("live.stakeFilter")}</label>
            <div className="flex gap-1.5 mt-1">
              {stakeFilters.map((sf) => (
                <button
                  key={sf}
                  onClick={() => setStake(sf)}
                  className={`h-8 px-3 rounded text-[11px] font-semibold transition ${
                    stake === sf
                      ? "btn-neon border-0"
                      : "bg-secondary/40 border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sf}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10.5px] text-muted-foreground">Enter Match Code</label>
            <div className="flex gap-1.5 mt-1">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Enter code (e.g. ABC123)"
                className="h-8 w-[180px] bg-input/60 border-border text-[11.5px]"
              />
              <Button className="btn-neon border-0 h-8 px-4 text-[11px] font-bold">Join</Button>
              <button className="w-8 h-8 rounded-md border border-border text-muted-foreground hover:text-foreground flex items-center justify-center text-[11px]">
                ?
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="panel p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[12px] font-bold tracking-wider">
            {t("live.matchList")} <span className="text-muted-foreground font-normal">{filtered.length} Matches</span>
          </div>
          <button className="text-[11.5px] text-muted-foreground hover:text-foreground flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> {t("common.refresh")}
          </button>
        </div>

        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <th className="text-left py-2.5 w-[60px]">Game</th>
              <th className="text-left py-2.5">Title / Info</th>
              <th className="text-center py-2.5 w-[90px]">Stake</th>
              <th className="text-center py-2.5 w-[90px]">Mode (Format)</th>
              <th className="text-center py-2.5 w-[100px]">Current Players</th>
              <th className="text-center py-2.5 w-[100px]">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <motion.tr
                key={m.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelected(m)}
                className="border-b border-border/50 hover:bg-accent/20 transition cursor-pointer"
              >
                <td className="py-3">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-secondary to-panel border border-border flex items-center justify-center font-display font-bold text-[8px] text-center px-0.5 uppercase tracking-tight leading-tight">
                    {m.game.split(" ")[0]}
                  </div>
                </td>
                <td className="py-3">
                  <div className="font-bold text-[13px] tracking-tight">{m.title}</div>
                  <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground mt-0.5">
                    <span>{m.host}</span>
                    <span>·</span>
                    <span>{m.rank}</span>
                    <span>·</span>
                    <span className="text-gold">Win Rate {m.winRate}</span>
                  </div>
                </td>
                <td className="text-center py-3 font-display font-bold text-[13px] text-gold">{m.stake}</td>
                <td className="text-center py-3">
                  <div className="font-bold text-[12px]">{m.mode}</div>
                  <div className="text-[10.5px] text-muted-foreground">{m.format}</div>
                </td>
                <td className="text-center py-3 font-bold text-[12px]">{m.players}</td>
                <td className={`text-center py-3 font-bold text-[12px] ${statusColor(m.status)}`}>
                  {m.status}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

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

      <CreateMatchModal open={createOpen} onOpenChange={setCreateOpen} />
      <MatchDetailModal match={selected} onOpenChange={setSelected} />
    </Shell>
  );
}

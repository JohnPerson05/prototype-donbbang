import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ChevronRight, Minus, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recentResults, announcements } from "@/data/mock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CreateMatchModal } from "@/components/modals/CreateMatchModal";
import { useApp } from "@/store/app";
import { useT } from "@/lib/i18n";

function PanelHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <h3 className="font-bold text-[12.5px] tracking-wider uppercase">{title}</h3>
      {action && (
        <a className="text-[10.5px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 cursor-pointer">
          {action} <ChevronRight className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

export function RightSidebar() {
  const t = useT();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const matches = useApp((s) => s.matches);
  const [stake, setStake] = useState(100000);
  const [createOpen, setCreateOpen] = useState(false);

  const isHome = path === "/";
  const isLive = path === "/live-match";
  const isCommunity = path === "/community";
  const isRecruit = path === "/recruit";
  const isInfo = path === "/info";
  const isAnnouncements = path === "/announcements";

  const matchStatusData = [
    { label: "Recruiting", count: 54, dot: "bg-success" },
    { label: "Waiting", count: 23, dot: "bg-gold" },
    { label: "In Progress", count: 31, dot: "bg-[oklch(0.7_0.2_240)]" },
    { label: "Finished", count: 20, dot: "bg-muted-foreground" },
  ];

  return (
    <aside className="w-[300px] shrink-0 space-y-4">
      {/* HOME */}
      {isHome && (
        <>
          <div className="panel p-3.5">
            <PanelHeader title={t("side.ongoing")} action={t("side.viewMore")} />
            <div className="space-y-2">
              {matches.slice(0, 3).map((m) => (
                <div key={m.id} className="flex items-center justify-between text-[11.5px]">
                  <div className="truncate min-w-0">
                    <span className="text-primary">●</span>{" "}
                    <span className="font-semibold">{m.game}</span>
                    <div className="text-muted-foreground truncate">{m.title}</div>
                  </div>
                  <span className="text-gold font-semibold text-[11.5px]">{m.stake}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-3.5 space-y-2.5">
            <h3 className="font-bold text-[13px] tracking-tight">{t("side.create")}</h3>
            <div>
              <label className="text-[11.5px] text-muted-foreground">{t("side.selectGame")}</label>
              <Select>
                <SelectTrigger className="bg-input/60 border-border mt-1 h-10">
                  <SelectValue placeholder={t("side.selectGame")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ow">Overwatch 2</SelectItem>
                  <SelectItem value="val">Valorant</SelectItem>
                  <SelectItem value="tk">Tekken 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[11.5px] text-muted-foreground">{t("side.matchType")}</label>
              <Select defaultValue="1v1">
                <SelectTrigger className="bg-input/60 border-border mt-1 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1v1">1v1 Match</SelectItem>
                  <SelectItem value="2v2">2v2 Match</SelectItem>
                  <SelectItem value="5v5">5v5 Match</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[11.5px] text-muted-foreground">{t("side.stake")}</label>
              <div className="flex items-center mt-1 bg-input/60 border border-border rounded-md h-10">
                <button
                  onClick={() => setStake(Math.max(1000, stake - 10000))}
                  className="px-3 text-muted-foreground hover:text-foreground"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  value={stake.toLocaleString()}
                  onChange={(e) => setStake(parseInt(e.target.value.replace(/\D/g, "") || "0", 10))}
                  className="flex-1 bg-transparent text-center font-semibold text-[13px] outline-none"
                />
                <button onClick={() => setStake(stake + 10000)} className="px-3 text-muted-foreground hover:text-foreground">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <Button
              onClick={() => setCreateOpen(true)}
              className="w-full btn-neon border-0 h-10 font-semibold text-[13px]"
            >
              {t("side.create")}
            </Button>
          </div>

          <div className="panel p-3.5">
            <PanelHeader title={t("side.recent")} action={t("side.viewMore")} />
            <div className="space-y-2 text-[12px]">
              {recentResults.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold w-9 text-[12px] ${r.result === "Win" ? "text-success" : "text-primary"}`}
                    >
                      {r.result}
                    </span>
                    <span className="text-muted-foreground text-[10.5px]">VS</span>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-secondary border border-border" />
                    <div className="leading-tight">
                      <div className="text-[11px]">{r.a}</div>
                      <div className="text-[10.5px] text-muted-foreground">{r.b}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-semibold ${r.result === "Win" ? "text-success" : "text-primary"}`}
                  >
                    {r.delta}
                  </span>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-2 border-border bg-transparent hover:bg-accent h-9 text-[12px]"
              >
                {t("side.viewAll")}
              </Button>
            </div>
          </div>

          <div className="panel p-3.5">
            <PanelHeader title={t("side.announce")} action={t("side.viewMore")} />
            <div className="space-y-1.5 text-[11.5px]">
              {announcements.map((a, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground truncate min-w-0">
                    <span className="text-foreground">[{a.tag}]</span> {a.title}
                  </span>
                  <span className="text-[10.5px] text-muted-foreground shrink-0">{a.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-3.5">
            <h3 className="font-bold text-[13px] tracking-tight">{t("side.support")}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">{t("side.support.sub")}</p>
            <div className="flex items-center gap-2.5 mt-2.5">
              <div className="w-9 h-9 rounded-full bg-[oklch(0.65_0.18_230)] flex items-center justify-center">
                <Send className="w-3.5 h-3.5" />
              </div>
              <div className="w-9 h-9 rounded-full bg-[oklch(0.55_0.2_280)] flex items-center justify-center text-[10px] font-bold">
                DC
              </div>
            </div>
          </div>
        </>
      )}

      {/* LIVE MATCH / RECRUIT / INFO / ANNOUNCEMENTS - share the match status + guide pattern */}
      {(isLive || isRecruit || isInfo || isAnnouncements) && (
        <>
          <Button
            onClick={() => setCreateOpen(true)}
            className="w-full btn-neon border-0 h-10 font-bold tracking-wider text-[12px]"
          >
            + Create Match
          </Button>

          <div className="panel p-3.5 space-y-2">
            <div>
              <label className="text-[11px] text-muted-foreground">Sort By</label>
              <Select defaultValue="newest">
                <SelectTrigger className="bg-input/60 border-border mt-1 h-9 text-[12px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full btn-neon border-0 h-9 font-bold text-[11.5px] tracking-wider">Search</Button>
          </div>

          <div className="panel p-3.5">
            <label className="text-[11px] text-muted-foreground">Enter Match Code</label>
            <div className="flex gap-1.5 mt-1">
              <Input placeholder="Enter code (e.g. ABC123)" className="h-9 bg-input/60 border-border text-[12px]" />
              <Button className="btn-neon border-0 h-9 px-4 text-[11.5px] font-bold">Join</Button>
              <button className="w-9 h-9 rounded-md border border-border text-muted-foreground hover:text-foreground flex items-center justify-center text-[11px]">
                ?
              </button>
            </div>
          </div>

          <div className="panel p-3.5">
            <PanelHeader title={isRecruit ? "RECRUITMENT STATUS" : "MATCH STATUS"} action={t("side.viewMore")} />
            <div className="space-y-2.5">
              {(isRecruit
                ? [
                    { label: "Recruiting", count: 54, dot: "bg-success" },
                    { label: "Looking for Team", count: 23, dot: "bg-gold" },
                    { label: "Looking for Members", count: 31, dot: "bg-[oklch(0.7_0.2_240)]" },
                    { label: "Closed", count: 20, dot: "bg-muted-foreground" },
                  ]
                : matchStatusData
              ).map((s) => (
                <div key={s.label} className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                    <span className="text-foreground/90">{s.label}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-[12px]">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-3.5">
            <PanelHeader title={isRecruit ? "SAFETY GUIDELINES" : "MATCH PLAY GUIDE"} action={t("side.viewMore")} />
            <ul className="space-y-1.5 text-[11px] text-muted-foreground">
              {(isRecruit
                ? [
                    "Any abusive or fraudulent activity may result in account suspension.",
                    "Please report any issues immediately.",
                    "Follow the trading guidelines and terms of service.",
                    "Let's build a safe and healthy community together.",
                  ]
                : [
                    "Any illegal use or fraud may result in account suspension or permanent ban.",
                    "Please report any issues immediately.",
                    "Do not share match codes or participate in unfair matches.",
                    "Let's build a fair and healthy gaming culture.",
                  ]
              ).map((g, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-primary mt-[1px]">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-3.5">
            <PanelHeader title={isRecruit ? "HOW TO USE" : "HOW TO PLAY"} action={t("side.viewMore")} />
            <ul className="space-y-1.5 text-[11px] text-muted-foreground">
              {(isRecruit
                ? [
                    "How to write a recruitment post",
                    "Support and report guide",
                    "Recruitment tips and best practices",
                    "Safety and trading guide",
                    "Community rules",
                  ]
                : [
                    "Set your desired stake and create a match, or join a match from the list.",
                    "Check the match details and prepare for the duel.",
                    "Results will be finalized based on match rules.",
                    "Points are settled according to the match outcome.",
                  ]
              ).map((g, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-primary mt-[1px]">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* COMMUNITY */}
      {isCommunity && (
        <>
          <div className="panel p-3.5">
            <PanelHeader title="POPULAR POSTS" action={t("side.viewMore")} />
            <div className="space-y-1.5 text-[11.5px]">
              {[
                { r: 1, t: "Today's match was insane ㅋㅋ", c: 456 },
                { r: 2, t: "10,000P stake match, who's in?", c: 398 },
                { r: 3, t: "Recruiting! Master+ only", c: 312 },
                { r: 4, t: "Is this cheating or lag?", c: 278 },
                { r: 5, t: "What plans do you have for this weekend?", c: 265 },
              ].map((p) => (
                <div key={p.r} className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">{p.r}</span>
                  <span className="flex-1 leading-snug">{p.t}</span>
                  <span className="text-muted-foreground shrink-0">{p.c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-3.5">
            <PanelHeader title="ANNOUNCEMENTS" action={t("side.viewMore")} />
            <div className="space-y-1.5 text-[11px] text-muted-foreground">
              {[
                { t: "Community rules and guidelines (mandatory)", d: "02.17" },
                { t: "Community activation event guide", d: "02.16" },
                { t: "Server maintenance notice (02/20)", d: "02.15" },
                { t: "Customer support hours update", d: "02.14" },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <span className="text-primary">•</span>
                  <span className="flex-1 truncate">{a.t}</span>
                  <span className="text-[10.5px]">{a.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-3.5">
            <PanelHeader title="COMMUNITY GUIDELINES" action={t("side.viewMore")} />
            <ul className="space-y-1.5 text-[11px] text-muted-foreground">
              {[
                "Abuse or offensive behavior is prohibited.",
                "Please use the free board appropriately.",
                "Posts that violate the rules may be edited or deleted without notice.",
                "Please report posts that violate the rules using the report feature.",
                "Report bugs or issues via the report feature.",
              ].map((g, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-snug">
                  <span className="text-primary mt-[1px]">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <CreateMatchModal open={createOpen} onOpenChange={setCreateOpen} />
    </aside>
  );
}

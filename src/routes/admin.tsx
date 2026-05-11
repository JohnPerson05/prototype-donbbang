import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  CircleUserRound,
  DollarSign,
  FileText,
  HelpCircle,
  History,
  Layout,
  LogIn,
  Mail,
  MessageCircle,
  PauseCircle,
  RefreshCcw,
  Search,
  Send,
  Store,
  Trophy,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

const topTiles = [
  { label: "Sign-up Requests", sub: "Manage sign-ups", count: 12, icon: LogIn, color: "bg-[oklch(0.45_0.18_250)]" },
  { label: "Partner Requests", sub: "Partner approvals", count: 0, icon: Building2, color: "bg-[oklch(0.45_0.18_200)]" },
  { label: "Deposit Requests", sub: "Deposit handling", count: 0, icon: Wallet, color: "bg-[oklch(0.45_0.18_160)]" },
  { label: "Withdraw Requests", sub: "Withdraw handling", count: 0, icon: DollarSign, color: "bg-[oklch(0.55_0.2_60)]" },
  { label: "Live Matches", sub: "Currently live", count: 0, icon: Activity, color: "bg-[oklch(0.55_0.2_25)]" },
  { label: "Pending Match Mgmt", sub: "Pending matches", count: 2, icon: PauseCircle, color: "bg-[oklch(0.45_0.18_290)]" },
  { label: "1:1 Inquiry", sub: "Inquiry history", count: 0, icon: HelpCircle, color: "bg-[oklch(0.45_0.18_320)]" },
  { label: "Messages", sub: "Unread: 2", count: 2, icon: Mail, color: "bg-[oklch(0.45_0.18_20)]" },
];

const summaryCards = [
  { label: "New Members", value: "23", suffix: "users", icon: Users, delta: "▲ 12.5%", deltaColor: "text-success" },
  { label: "Today's Deposit", value: "45,678,000", suffix: "KRW", icon: Wallet, delta: "▲ 8.3%", deltaColor: "text-success" },
  { label: "Today's Withdrawal", value: "32,109,000", suffix: "KRW", icon: Send, delta: "▲ 6.7%", deltaColor: "text-primary" },
  { label: "Live Matches", value: "12", suffix: "matches", icon: Trophy, sub: "Total: 38" },
  { label: "Pending Matches", value: "7", suffix: "matches", icon: History, sub: "Total: 21" },
  { label: "1:1 Inquiry", value: "15", suffix: "items", icon: Mail, sub: "Unanswered: 3" },
  { label: "Messages", value: "8", suffix: "items", icon: MessageCircle, sub: "Unread: 2" },
];

const liveMatches = [
  { no: 12, game: "Sudden Attack", abbr: "SA", name: "Sudden Rank", a: "asdasd", b: "dasdasads", status: "Live", start: "2026-04-27 16:30", elapsed: "00:08:12" },
  { no: 11, game: "StarCraft", abbr: "SC", name: "1:1 Match", a: "sadasd", b: "dasfasdasd", status: "Live", start: "2026-04-27 16:25", elapsed: "00:13:45" },
  { no: 10, game: "League of Legends", abbr: "LL", name: "Ranked Game", a: "qwer123", b: "zxcv456", status: "Live", start: "2026-04-27 16:20", elapsed: "00:19:30" },
  { no: 9, game: "FIFA Online 4", abbr: "FF", name: "Friendly Match", a: "player07", b: "player09", status: "Live", start: "2026-04-27 16:15", elapsed: "00:23:10" },
  { no: 8, game: "Overwatch 2", abbr: "OW", name: "Competitive", a: "hero01", b: "hero02", status: "Paused", start: "2026-04-27 16:10", elapsed: "00:26:55" },
  { no: 7, game: "Lost Ark", abbr: "LA", name: "Guild War", a: "gld001", b: "gld002", status: "Calculating", start: "2026-04-27 16:00", elapsed: "00:38:20" },
  { no: 6, game: "Dungeon & Fighter", abbr: "DF", name: "Arena", a: "df001", b: "df002", status: "Live", start: "2026-04-27 15:55", elapsed: "00:41:30" },
  { no: 5, game: "MapleStory", abbr: "MS", name: "Boss Raid", a: "maple01", b: "maple02", status: "Live", start: "2026-04-27 15:50", elapsed: "00:46:40" },
];

const sideNav = [
  { label: "User Management", sub: "Manage all users", icon: Users },
  { label: "Money History", sub: "Deposit/withdraw log", icon: Wallet },
  { label: "Match Management", sub: "Match registration & results", icon: Trophy },
  { label: "Live Matches", sub: "Live match control", icon: Activity, active: true },
  { label: "Pending Match Mgmt", sub: "Pending matches", icon: History },
  { label: "Top-up & Exchange", sub: "Charge / convert", icon: DollarSign },
  { label: "Customer Center", sub: "Inquiry & response", icon: HelpCircle },
  { label: "Sales Mgmt", sub: "Sales statistics", icon: FileText },
  { label: "Distributor Mgmt", sub: "Distributors & partners", icon: Store },
  { label: "Page Management", sub: "Notices / pages", icon: Layout },
];

const statusStyle: Record<string, string> = {
  Live: "bg-primary text-primary-foreground",
  Paused: "bg-gold text-background",
  Calculating: "bg-[oklch(0.55_0.2_240)] text-white",
};

function Admin() {
  const [sort, setSort] = useState("newest");

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="px-5 h-[68px] flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center font-display font-black text-[14px]">
              M
            </div>
            <span className="font-display text-[18px] italic font-black text-gold">MoneyBread</span>
          </div>
          <div className="flex items-center gap-2 flex-1 justify-center">
            {topTiles.map((t, i) => (
              <button
                key={i}
                className={`${t.color} text-white rounded-md px-3 py-1.5 flex items-center gap-2 text-left hover:opacity-90 transition relative min-w-[110px]`}
              >
                <div>
                  <div className="text-[10.5px] font-bold tracking-tight leading-tight">{t.label}</div>
                  <div className="text-[9.5px] opacity-80 leading-tight">{t.sub}</div>
                </div>
                {t.count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-background text-[9px] font-bold flex items-center justify-center">
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <Bell className="w-5 h-5 text-gold" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                12
              </span>
            </div>
            <div className="relative">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                5
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CircleUserRound className="w-8 h-8 text-muted-foreground" />
              <span className="text-[12px] font-semibold">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[210px] shrink-0 border-r border-border min-h-[calc(100vh-68px)] py-3">
          <nav className="space-y-0.5 px-2">
            {sideNav.map((n, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-left transition ${
                  n.active
                    ? "bg-primary/15 border border-primary/40 text-primary"
                    : "text-foreground/80 hover:bg-accent"
                }`}
              >
                <n.icon className={`w-4 h-4 shrink-0 ${n.active ? "text-primary" : "text-muted-foreground"}`} />
                <div className="min-w-0">
                  <div className="text-[12px] font-bold leading-tight">{n.label}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{n.sub}</div>
                </div>
              </button>
            ))}
          </nav>
          <div className="border-t border-border mt-4 pt-2 px-2">
            <button className="w-full text-[10.5px] text-muted-foreground flex items-center gap-1 px-3 py-2">
              ⟨⟨ Collapse menu ⟩⟩
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-[18px] tracking-tight">Today&apos;s Summary</h1>
            </div>
            <div className="flex items-center gap-3 text-[11.5px] text-muted-foreground">
              <span>2026-04-27 16:38:12</span>
              <Button variant="outline" className="h-8 border-border bg-secondary/40 text-[11px] gap-1">
                <RefreshCcw className="w-3 h-3" /> Refresh
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {summaryCards.map((c, i) => (
              <div key={i} className="panel p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{c.label}</span>
                  <c.icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="mt-1.5">
                  <span className="font-display font-black text-[18px] text-foreground">{c.value}</span>
                  <span className="text-[10px] text-muted-foreground ml-1">{c.suffix}</span>
                </div>
                {c.delta && (
                  <div className={`text-[10.5px] font-semibold mt-0.5 ${c.deltaColor}`}>{c.delta}</div>
                )}
                {c.sub && <div className="text-[10px] text-muted-foreground mt-0.5">{c.sub}</div>}
              </div>
            ))}
          </div>

          <div className="panel p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[14px] tracking-tight">Live Matches List</h2>
              <div className="text-[11px]">
                Total <span className="text-foreground font-bold">12</span>
                <span className="mx-2">·</span>
                <span className="text-primary font-bold">Live 10</span>
                <span className="mx-2">·</span>
                <span className="text-gold font-bold">Paused 1</span>
                <span className="mx-2">·</span>
                <span className="text-[oklch(0.7_0.2_240)] font-bold">Calculating 1</span>
              </div>
            </div>

            <div className="grid grid-cols-[180px_180px_1fr_auto] gap-2 mb-3">
              <Select defaultValue="all">
                <SelectTrigger className="h-9 bg-input/60 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 bg-input/60 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input placeholder="Search match name / nickname" className="pl-9 h-9 bg-input/60 border-border" />
              </div>
              <Button className="btn-neon border-0 h-9 px-5 text-[11.5px] font-bold">Search</Button>
            </div>

            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-wide text-muted-foreground border-b border-border">
                  <th className="text-left py-2 w-[50px]">No.</th>
                  <th className="text-left py-2 w-[160px]">Game</th>
                  <th className="text-left py-2">Match Name</th>
                  <th className="text-left py-2">Player A</th>
                  <th className="text-center py-2 w-[40px]">VS</th>
                  <th className="text-left py-2">Player B</th>
                  <th className="text-center py-2 w-[100px]">Status</th>
                  <th className="text-center py-2 w-[140px]">Start Time</th>
                  <th className="text-center py-2 w-[80px]">Elapsed</th>
                  <th className="text-center py-2 w-[80px]">Manage</th>
                </tr>
              </thead>
              <tbody>
                {liveMatches.map((m, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-accent/20">
                    <td className="py-2.5 text-muted-foreground">{m.no}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-secondary border border-border flex items-center justify-center font-bold text-[10px]">
                          {m.abbr}
                        </span>
                        <span className="font-semibold">{m.game}</span>
                      </div>
                    </td>
                    <td className="py-2.5">{m.name}</td>
                    <td className="py-2.5">{m.a}</td>
                    <td className="text-center py-2.5 text-muted-foreground text-[10px]">VS</td>
                    <td className="py-2.5">{m.b}</td>
                    <td className="text-center py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${statusStyle[m.status] || "bg-secondary"}`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="text-center py-2.5 text-[11px]">{m.start}</td>
                    <td className="text-center py-2.5 font-mono text-[11px]">{m.elapsed}</td>
                    <td className="text-center py-2.5">
                      <button className="h-7 px-2.5 rounded bg-secondary/40 border border-border text-[10.5px] font-semibold hover:bg-accent">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-center gap-1 mt-5">
              <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
                <ChevronsLeft className="w-3 h-3" />
              </button>
              <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
                <ChevronLeft className="w-3 h-3" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-7 h-7 rounded-md text-[11.5px] font-semibold ${
                    p === 1
                      ? "btn-neon border-0"
                      : "bg-secondary/40 border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

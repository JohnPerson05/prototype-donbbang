import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Pencil, RefreshCw, Search, Siren } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreatePostModal } from "@/components/modals/CreatePostModal";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/info")({
  component: InfoSharing,
});

const infoRows = [
  { type: "NOTICE", title: "Guidelines for Donbbang Information Sharing Board (Admins)", status: "Notice", author: "Admin", views: "12,345", date: "2026.02.17 15:46", pinned: true },
  { type: "EVENT", title: "Information Sharing Event Ongoing!", status: "Notice", author: "Admin", views: "8,742", date: "2026.02.16 13:22", badge: "NEW" },
  { type: "6902", title: "Today's match was insane ㅋㅋ", status: "Under Review", author: "GAMER01", views: "456", date: "04.27", badge: "NEW", statusColor: "text-gold" },
  { type: "6901", title: "Recruiting! Master+ only", status: "Completed", author: "System", views: "398", date: "04.27", statusColor: "text-success" },
  { type: "6900", title: "Is this cheating or lag?", status: "Under Review", author: "BattleMaster", views: "612", date: "04.27", badge: "NEW", statusColor: "text-gold" },
  { type: "6899", title: "What plans do you have for this weekend?", status: "Completed", author: "No.1Player", views: "785", date: "04.26", statusColor: "text-success" },
  { type: "6898", title: "Patch notes are summarized after the update", status: "Completed", author: "ProGamer", views: "534", date: "04.26", statusColor: "text-success" },
  { type: "6897", title: "The ranking system needs some improvement ㅠㅠ", status: "Completed", author: "GAMER01", views: "312", date: "04.26", statusColor: "text-success" },
  { type: "6896", title: "Anyone up for a casual game together?", status: "Completed", author: "GameAddict", views: "298", date: "04.25", statusColor: "text-success" },
  { type: "6895", title: "10,000P stake match, who's in?", status: "Under Review", author: "ChoiGamer", views: "923", date: "04.25", badge: "HOT", statusColor: "text-gold" },
];

function InfoSharing() {
  const t = useT();
  const [tab, setTab] = useState<"admin" | "member">("admin");
  const [writeOpen, setWriteOpen] = useState(false);

  return (
    <Shell>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-display font-bold text-[24px] text-primary tracking-tight leading-none">
              {t("info.title")}
            </h1>
            <p className="text-[12px] text-muted-foreground mt-1.5 max-w-[500px]">{t("info.subtitle")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Siren className="w-10 h-10 text-primary" />
        </div>
      </div>

      <div className="panel p-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setTab("admin")}
            className={`h-11 rounded-md font-bold tracking-wider text-[12px] transition ${
              tab === "admin" ? "btn-neon border-0" : "bg-secondary/40 border border-border hover:bg-accent"
            }`}
          >
            🛡 DONBBANG INFO BOARD (ADMINS)
          </button>
          <button
            onClick={() => setTab("member")}
            className={`h-11 rounded-md font-bold tracking-wider text-[12px] transition ${
              tab === "member" ? "btn-neon border-0" : "bg-secondary/40 border border-border hover:bg-accent"
            }`}
          >
            🛡 MEMBER INFO BOARD
          </button>
        </div>

        <div className="flex items-center gap-2.5 mt-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] h-10 bg-input/60 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input placeholder="Enter keywords." className="pl-9 h-10 bg-input/60 border-border" />
          </div>
          <Button className="btn-neon border-0 h-10 px-6 font-bold tracking-wider text-[12px]">
            {t("common.search")}
          </Button>
        </div>

        <div className="flex items-center justify-between mt-4 mb-2">
          <div className="text-[12px]">
            Total <span className="text-primary font-bold">6,902</span> posts
          </div>
          <div className="flex items-center gap-1.5">
            <Select defaultValue="all">
              <SelectTrigger className="w-[110px] h-8 bg-input/60 border-border text-[11px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Post Types</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[110px] h-8 bg-input/60 border-border text-[11px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="latest">
              <SelectTrigger className="w-[90px] h-8 bg-input/60 border-border text-[11px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
              </SelectContent>
            </Select>
            <button className="w-8 h-8 rounded-md bg-secondary/40 border border-border text-muted-foreground hover:text-foreground flex items-center justify-center">
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>

        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <th className="text-left py-2.5 w-[80px]">Type</th>
              <th className="text-left py-2.5">Title</th>
              <th className="text-center py-2.5 w-[110px]">Status</th>
              <th className="text-center py-2.5 w-[110px]">Author</th>
              <th className="text-center py-2.5 w-[70px]">Views</th>
              <th className="text-center py-2.5 w-[130px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {infoRows.map((r, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-accent/20 transition cursor-pointer">
                <td className="py-2.5">
                  {r.type === "NOTICE" ? (
                    <span className="inline-block px-2 py-0.5 rounded bg-primary text-primary-foreground text-[9.5px] font-bold tracking-wider">
                      NOTICE
                    </span>
                  ) : r.type === "EVENT" ? (
                    <span className="inline-block px-2 py-0.5 rounded bg-primary text-primary-foreground text-[9.5px] font-bold tracking-wider">
                      EVENT
                    </span>
                  ) : (
                    <span className="text-muted-foreground">{r.type}</span>
                  )}
                </td>
                <td className="py-2.5">
                  <span className="text-foreground">{r.title}</span>
                  {r.badge === "NEW" && (
                    <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-bold">
                      NEW
                    </span>
                  )}
                  {r.badge === "HOT" && (
                    <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded bg-gold/20 text-gold text-[9px] font-bold">
                      HOT
                    </span>
                  )}
                </td>
                <td className={`text-center py-2.5 text-[11px] font-semibold ${r.statusColor || "text-primary"}`}>
                  {r.status}
                </td>
                <td className="text-center py-2.5 text-[11.5px] text-muted-foreground">{r.author}</td>
                <td className="text-center py-2.5 text-[11.5px] text-muted-foreground">{r.views}</td>
                <td className="text-center py-2.5 text-[11px] text-muted-foreground">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-1 mt-5">
          <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
            <ChevronLeft className="w-3 h-3" />
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
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
          <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
            <ChevronRight className="w-3 h-3" />
          </button>
          <Button
            onClick={() => setWriteOpen(true)}
            className="btn-neon border-0 h-8 px-3 ml-3 text-[11px] font-bold tracking-wider gap-1.5"
          >
            <Pencil className="w-3 h-3" /> WRITE POST
          </Button>
        </div>
      </div>

      <CreatePostModal open={writeOpen} onOpenChange={setWriteOpen} />
    </Shell>
  );
}

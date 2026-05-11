import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Megaphone } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/announcements")({
  component: Announcements,
  head: () => ({
    meta: [
      { title: "Announcements — DONBBANG" },
      { name: "description", content: "Latest platform announcements." },
    ],
  }),
});

type RowType = "NOTICE" | "MAINTENANCE" | "EVENT" | "ETC.";

const rows: { type: RowType; title: string; author: string; date: string; views: string; badge?: "NEW" }[] = [
  { type: "NOTICE", title: "Information Sharing Room Usage Guidelines", author: "Admin", date: "2026.02.17", views: "1,546", badge: "NEW" },
  { type: "NOTICE", title: "Information Submission Guidelines", author: "Admin", date: "2026.02.16", views: "2,342" },
  { type: "NOTICE", title: "Administrator Review & Deletion Standards", author: "Admin", date: "2026.02.15", views: "1,875" },
  { type: "MAINTENANCE", title: "5/15 (Thu) Server Maintenance Notice (Completed)", author: "Admin", date: "2026.02.14", views: "2,156" },
  { type: "EVENT", title: "Monthly Event Notice (Double Rewards)", author: "Admin", date: "2026.02.13", views: "3,245", badge: "NEW" },
  { type: "EVENT", title: "Friend Invitation Event Reward Distribution Notice", author: "Admin", date: "2026.02.12", views: "2,131" },
  { type: "ETC.", title: "Season 1 Operation Schedule Notice", author: "Admin", date: "2026.02.08", views: "1,298" },
  { type: "ETC.", title: "Illegal Program Usage Deletion Reinforcement", author: "Admin", date: "2026.02.05", views: "1,654" },
  { type: "ETC.", title: "Terms of Service Partial Revision Notice", author: "Admin", date: "2026.02.01", views: "1,987" },
  { type: "ETC.", title: "Personal Information Handling Policy Revision", author: "Admin", date: "2026.01.28", views: "1,721" },
];

const typeColors: Record<RowType, string> = {
  NOTICE: "bg-primary text-primary-foreground",
  MAINTENANCE: "bg-[oklch(0.55_0.2_240)] text-white",
  EVENT: "bg-success text-white",
  "ETC.": "bg-secondary text-muted-foreground border border-border",
};

function Announcements() {
  const t = useT();
  const [tab, setTab] = useState("ALL");
  const tabs = ["ALL", "MATCHES", "MAINTENANCE", "EVENTS", "ETC."];

  return (
    <Shell>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-[24px] text-primary tracking-tight leading-none">
            {t("announcements.title")}
          </h1>
          <p className="text-[12px] text-muted-foreground mt-1.5">{t("announcements.subtitle")}</p>
        </div>
        <Megaphone className="w-12 h-12 text-primary" />
      </div>

      <div className="panel p-4">
        <div className="flex gap-1.5 mb-4">
          {tabs.map((x) => (
            <button
              key={x}
              onClick={() => setTab(x)}
              className={`h-9 px-5 rounded-md text-[11.5px] font-bold tracking-wider transition ${
                tab === x
                  ? "btn-neon border-0"
                  : "bg-secondary/40 border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {x}
            </button>
          ))}
        </div>

        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <th className="text-left py-2.5 w-[110px]">Type</th>
              <th className="text-left py-2.5">Title</th>
              <th className="text-center py-2.5 w-[110px]">Author</th>
              <th className="text-center py-2.5 w-[110px]">Date</th>
              <th className="text-center py-2.5 w-[80px]">Views</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-accent/20 transition cursor-pointer">
                <td className="py-2.5">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[9.5px] font-bold tracking-wider ${typeColors[r.type]}`}
                  >
                    {r.type}
                  </span>
                </td>
                <td className="py-2.5">
                  <span className="text-foreground">{r.title}</span>
                  {r.badge === "NEW" && (
                    <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-bold">
                      N
                    </span>
                  )}
                </td>
                <td className="text-center py-2.5 text-[11.5px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-primary/30 inline-flex items-center justify-center text-[8px]">
                      A
                    </span>
                    {r.author}
                  </span>
                </td>
                <td className="text-center py-2.5 text-[11.5px] text-muted-foreground">{r.date}</td>
                <td className="text-center py-2.5 text-[11.5px] text-muted-foreground">{r.views}</td>
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
            12
          </button>
          <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
            <ChevronRight className="w-3 h-3" />
          </button>
          <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground flex items-center justify-center">
            <ChevronsRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </Shell>
  );
}

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Pencil, Pin, Search } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreatePostModal } from "@/components/modals/CreatePostModal";
import { useApp } from "@/store/app";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/community")({
  component: Community,
});

function Community() {
  const t = useT();
  const posts = useApp((s) => s.posts);
  const [tab, setTab] = useState<"free" | "info">("free");
  const [writeOpen, setWriteOpen] = useState(false);

  const popular = [
    { r: 1, t: "Today's match was insane ㅋㅋ", c: 456 },
    { r: 2, t: "10,000P stake match, who's in?", c: 398 },
    { r: 3, t: "Recruiting! Master+ only", c: 312 },
    { r: 4, t: "Is this cheating or lag?", c: 278 },
    { r: 5, t: "What plans do you have for this weekend?", c: 265 },
  ];

  const announcements = [
    { t: "Community rules and guidelines (mandatory)", d: "02.17" },
    { t: "Community activation event guide", d: "02.16" },
    { t: "Server maintenance notice (02/20)", d: "02.15" },
    { t: "Customer support hours update", d: "02.14" },
  ];

  const guidelines = [
    "Abuse or offensive behavior is prohibited.",
    "Please use the free board appropriately.",
    "Posts that violate the rules may be edited or deleted without notice.",
    "Please report posts that violate the rules using the report feature.",
    "Report bugs or issues via the report feature.",
  ];

  return (
    <Shell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-[26px] text-primary tracking-tight leading-none">
            {t("community.title")}
          </h1>
          <p className="text-[12px] text-muted-foreground mt-1.5">{t("community.subtitle")}</p>
        </div>
        <Button
          onClick={() => setWriteOpen(true)}
          className="btn-neon border-0 h-10 px-4 font-bold tracking-wider text-[12px]"
        >
          {t("community.write")}
        </Button>
      </div>

      <div className="panel p-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setTab("free")}
            className={`h-11 rounded-md font-bold tracking-wider text-[12.5px] transition ${
              tab === "free" ? "btn-neon border-0" : "bg-secondary/40 border border-border hover:bg-accent"
            }`}
          >
            {t("community.free")}
          </button>
          <button
            onClick={() => setTab("info")}
            className={`h-11 rounded-md font-bold tracking-wider text-[12.5px] transition ${
              tab === "info" ? "btn-neon border-0" : "bg-secondary/40 border border-border hover:bg-accent"
            }`}
          >
            {t("community.info")}
          </button>
        </div>

        <div className="flex items-center gap-2.5 mt-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] h-10 bg-input/60 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="notice">Notice</SelectItem>
              <SelectItem value="event">Event</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input placeholder={t("community.search")} className="pl-9 h-10 bg-input/60 border-border" />
          </div>
          <Button className="btn-neon border-0 h-10 px-6 font-bold tracking-wider text-[12px]">
            {t("common.search")}
          </Button>
        </div>

        <div className="flex items-center justify-between mt-4 mb-2">
          <div className="text-[12px]">
            Total <span className="text-primary font-bold">6,902</span> posts
          </div>
          <Select defaultValue="latest">
            <SelectTrigger className="w-[120px] h-9 bg-input/60 border-border text-[11.5px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">LATEST</SelectItem>
              <SelectItem value="popular">POPULAR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border text-[10.5px] uppercase tracking-wide text-muted-foreground">
              <th className="text-left py-2.5 w-[80px]">No.</th>
              <th className="text-left py-2.5">Title</th>
              <th className="text-center py-2.5 w-[110px]">Author</th>
              <th className="text-center py-2.5 w-[90px]">Comments</th>
              <th className="text-center py-2.5 w-[70px]">Views</th>
              <th className="text-center py-2.5 w-[100px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-accent/20 transition cursor-pointer">
                <td className="py-2.5">
                  {p.category === "Notice" ? (
                    <span className="inline-block px-2 py-0.5 rounded bg-primary text-primary-foreground text-[9.5px] font-bold tracking-wider">
                      NOTICE
                    </span>
                  ) : p.category === "Event" ? (
                    <span className="inline-block px-2 py-0.5 rounded bg-primary text-primary-foreground text-[9.5px] font-bold tracking-wider">
                      EVENT
                    </span>
                  ) : (
                    <span className="text-muted-foreground">{p.id}</span>
                  )}
                </td>
                <td className="py-2.5">
                  <span className="text-foreground">{p.title}</span>
                  {p.badge === "NEW" && (
                    <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-bold">
                      NEW
                    </span>
                  )}
                  {p.badge === "HOT" && (
                    <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded bg-gold/20 text-gold text-[9px] font-bold">
                      HOT
                    </span>
                  )}
                  {p.badge === "PIN" && <Pin className="inline w-3 h-3 ml-1.5 text-primary" />}
                </td>
                <td className="text-center py-2.5 text-[11.5px] text-muted-foreground">{p.author}</td>
                <td className="text-center py-2.5 text-[11.5px] text-primary font-semibold">{p.comments}</td>
                <td className="text-center py-2.5 text-[11.5px] text-muted-foreground">{p.views.toLocaleString()}</td>
                <td className="text-center py-2.5 text-[11.5px] text-muted-foreground">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-1 mt-5">
          <PgBtn><ChevronsLeft className="w-3 h-3" /></PgBtn>
          <PgBtn><ChevronLeft className="w-3 h-3" /></PgBtn>
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
          <PgBtn><ChevronRight className="w-3 h-3" /></PgBtn>
          <PgBtn><ChevronsRight className="w-3 h-3" /></PgBtn>
          <Button
            onClick={() => setWriteOpen(true)}
            className="btn-neon border-0 h-8 px-3 ml-3 text-[11px] font-bold tracking-wider gap-1.5"
          >
            <Pencil className="w-3 h-3" /> WRITE POST
          </Button>
        </div>
      </div>

      <RightCommunityInfo popular={popular} announcements={announcements} guidelines={guidelines} />

      <CreatePostModal open={writeOpen} onOpenChange={setWriteOpen} />
    </Shell>
  );
}

function PgBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-7 h-7 rounded-md bg-secondary/40 border border-border text-muted-foreground hover:text-foreground flex items-center justify-center">
      {children}
    </button>
  );
}

function RightCommunityInfo({
  popular,
  announcements,
  guidelines,
}: {
  popular: { r: number; t: string; c: number }[];
  announcements: { t: string; d: string }[];
  guidelines: string[];
}) {
  // These panels actually live inside the RightSidebar slot but since our layout uses fixed sidebars,
  // they're rendered as extra context underneath the main panel on narrow screens only.
  // The regular RightSidebar provides the persistent ones.
  return null;
}

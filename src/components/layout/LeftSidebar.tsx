import { useEffect, useState } from "react";
import { User, Lock, Send, Pencil } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { liveChat } from "@/data/mock";
import { useApp } from "@/store/app";
import { useT } from "@/lib/i18n";

const randomMsgs = [
  "GG! That was close.",
  "Anyone up for Valorant?",
  "Looking for 2 more in PUBG squad",
  "Just hit Diamond!",
  "Need a duo partner",
  "Tournament starting soon!",
];

export function LeftSidebar() {
  const t = useT();
  const [remember, setRemember] = useState(true);
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const { isAuthed, user, login, logout } = useApp();
  const [chat, setChat] = useState(liveChat);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      const time = new Date().toTimeString().slice(0, 5);
      setChat((c) => [
        ...c.slice(-30),
        {
          user: ["NeonAce", "ZeroFox", "KrPro", "TekkenX"][Math.floor(Math.random() * 4)],
          time,
          msg: randomMsgs[Math.floor(Math.random() * randomMsgs.length)],
        },
      ]);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const send = () => {
    if (!draft.trim()) return;
    const time = new Date().toTimeString().slice(0, 5);
    setChat((c) => [...c, { user: user?.name ?? "Guest", time, msg: draft.trim() }]);
    setDraft("");
  };

  return (
    <aside className="w-[260px] shrink-0 space-y-4">
      {isAuthed && user ? (
        <div className="panel p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2.5">
              <div className="relative">
                <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[oklch(0.45_0.18_250)] to-[oklch(0.25_0.05_260)] border-2 border-[oklch(0.55_0.2_250)] flex items-center justify-center">
                  <User className="w-7 h-7 text-[oklch(0.85_0.1_250)]" />
                </div>
              </div>
              <div className="leading-tight pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-[14px] tracking-wider">{user.name}</span>
                  <Pencil className="w-2.5 h-2.5 text-muted-foreground" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Lv. {user.level} <span className="text-foreground ml-1">Exp. {user.exp}%</span>
                </div>
                <div className="w-[120px] h-[3px] rounded-full bg-secondary mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-[oklch(0.75_0.2_35)]"
                    style={{ width: `${user.exp}%` }}
                  />
                </div>
              </div>
            </div>
            <Link
              to="/"
              className="text-[10px] px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 font-semibold"
            >
              {t("profile.myPage")}
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60">
            <div className="text-[11px] font-semibold text-muted-foreground tracking-wide">
              {t("profile.points")}
            </div>
            <div className="font-display font-bold text-[20px] text-primary mt-0.5 leading-none">
              {user.points.toLocaleString()}P
            </div>
          </div>

          <div className="mt-3">
            <div className="text-[11px] font-semibold text-muted-foreground tracking-wide">
              {t("profile.gauge")}
            </div>
            <div className="w-full h-[4px] rounded-full bg-secondary mt-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-[oklch(0.78_0.18_35)]"
                style={{ width: `${user.eventGauge}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <Button className="btn-neon border-0 h-9 text-[12px] font-bold tracking-wide">
              {t("profile.charge")}
            </Button>
            <Button
              variant="outline"
              className="h-9 border-border bg-secondary/40 text-[12px] font-bold tracking-wide"
            >
              {t("profile.withdraw")}
            </Button>
          </div>

          <button
            onClick={logout}
            className="w-full mt-2 text-[11px] text-muted-foreground hover:text-foreground"
          >
            {t("auth.logout")}
          </button>
        </div>
      ) : (
        <div className="panel p-3.5 space-y-2.5">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("auth.username")}
              className="pl-9 bg-input/60 border-border h-10"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              type="password"
              placeholder={t("auth.password")}
              className="pl-9 bg-input/60 border-border h-10"
            />
          </div>
          <Button
            onClick={() => login(name || "GAMER01")}
            className="w-full btn-neon border-0 h-10 font-semibold text-[13px]"
          >
            {t("auth.login")}
          </Button>
          <div className="flex items-center justify-between text-[11.5px] pt-0.5">
            <div className="flex items-center gap-2">
              <Switch
                checked={remember}
                onCheckedChange={setRemember}
                className="data-[state=checked]:bg-gold scale-90 origin-left"
              />
              <span className="text-muted-foreground">{t("auth.remember")}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <button className="hover:text-foreground">Find Info</button>
              <span className="text-border">|</span>
              <button className="hover:text-foreground">Sign Up</button>
            </div>
          </div>
        </div>
      )}

      <div className="panel p-3.5 flex flex-col h-[440px]">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-bold text-[13px] tracking-tight uppercase">{t("chat.title")}</h3>
          <span className="flex items-center gap-1.5 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-success font-semibold">{120 + chat.length}</span>
          </span>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2.5 pr-1">
          {chat.map((c, i) => (
            <div key={i} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-secondary shrink-0 border border-border" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[11px] leading-none">
                  <span className="font-semibold text-foreground truncate">{c.user}</span>
                  <span className="text-muted-foreground shrink-0">{c.time}</span>
                </div>
                <p className="text-[12px] text-muted-foreground/90 leading-snug mt-0.5">{c.msg}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-2.5">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("chat.placeholder")}
            className="bg-input/60 border-border pr-9 h-9"
          />
          <button
            onClick={send}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

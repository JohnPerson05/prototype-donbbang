import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FindInfoModal } from "@/components/modals/FindInfoModal";
import { SignUpModal } from "@/components/modals/SignUpModal";
import { useApp } from "@/store/app";
import { useT } from "@/lib/i18n";

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);
  const { isAuthed, user, logout, locale, setLocale } = useApp();
  const t = useT();

  const navItems = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.live"), to: "/live-match" },
    { label: t("nav.recruit"), to: "/recruit" },
    { label: t("nav.community"), to: "/community" },
    { label: t("nav.info"), to: "/info" },
    { label: t("nav.announcements"), to: "/announcements" },
    { label: t("nav.support"), to: "/support" },
  ];

  // Authenticated users see uppercase all-caps nav like the screenshots
  const navTextClass = isAuthed
    ? "text-[13px] font-bold tracking-[0.05em] uppercase"
    : "text-[14px] font-semibold tracking-tight";

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border">
        <div className="max-w-[1500px] mx-auto px-3 md:px-6 h-[64px] flex items-center justify-between gap-3 md:gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold via-primary to-primary/60 flex items-center justify-center font-display font-black text-[15px] shadow-[var(--shadow-neon)]">
              D
            </div>
            <span className="font-display font-black text-[18px] md:text-[20px] tracking-wide leading-none italic">
              <span className="text-gold">DON</span>
              <span className="text-primary">BBANG</span>
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-7">
            {navItems.map((item) => {
              const active = path === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative transition-colors ${navTextClass} ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--neon)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLocale(locale === "en" ? "ko" : "en")}
              className="h-9 px-2.5 rounded-md border border-border bg-transparent hover:bg-accent flex items-center gap-1.5 text-[12px] font-semibold"
              title="Switch language"
            >
              <Globe className="w-3.5 h-3.5" /> {locale === "en" ? "EN" : "한국어"}
            </button>

            {isAuthed && user ? (
              <Button variant="outline" className="h-9 border-border bg-transparent gap-2" onClick={logout}>
                <LogOut className="w-4 h-4" />
                <span className="text-[11.5px] font-semibold">{t("auth.logout")}</span>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="font-semibold border-border bg-transparent hover:bg-accent h-9 px-5 text-[13px]"
                  onClick={() => setFindOpen(true)}
                >
                  {t("auth.login")}
                </Button>
                <Button
                  className="font-semibold btn-neon border-0 h-9 px-5 text-[13px]"
                  onClick={() => setSignUpOpen(true)}
                >
                  {t("auth.signup")}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <FindInfoModal open={findOpen} onOpenChange={setFindOpen} />
      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  );
}

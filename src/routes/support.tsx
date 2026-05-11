import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Headphones } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/support")({
  component: Support,
  head: () => ({
    meta: [
      { title: "Customer Support — DONBBANG" },
      { name: "description", content: "Contact support 24/7." },
    ],
  }),
});

const faqs = [
  {
    q: "What is Donbbang?",
    a: "Donbbang is a competitive gaming platform where players can compete in matches and win rewards. All matches are conducted under a secure and fair system.",
  },
  { q: "How do I join a match?", a: "You can browse live matches from the Match page, or enter a match code from the homepage quick-join box." },
  { q: "When are rewards paid out?", a: "Rewards are paid immediately after both players confirm the match result." },
  { q: "How do I withdraw my balance?", a: "Go to your profile page and click Withdraw. Withdrawals are processed within 24 hours." },
  { q: "How is account security managed?", a: "We use phone verification, anti-bot captchas, and optional two-factor authentication." },
  { q: "What should I do if I encounter an issue?", a: "Report it via the 1:1 inquiry panel, or reach us on Telegram/Discord for real-time help." },
  { q: "What happens if illegal activity is detected?", a: "Accounts found using illegal programs or engaging in fraud will be permanently banned." },
  { q: "How do I participate in events?", a: "Event notices are posted under Announcements. Follow the steps shown in each event post." },
];

function Support() {
  const t = useT();
  const [tab, setTab] = useState("FAQ");
  const [open, setOpen] = useState<number | null>(0);
  const tabs = [t("support.faq"), t("support.matchIssues"), t("support.maintenance"), t("support.events"), t("support.others")];

  return (
    <Shell>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-[24px] text-primary tracking-tight leading-none">
            {t("support.title")}
          </h1>
          <p className="text-[12px] text-muted-foreground mt-1.5">{t("support.subtitle")}</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
          <Headphones className="w-7 h-7 text-primary" />
        </div>
      </div>

      <div className="panel p-4">
        <div className="flex gap-1.5 mb-5">
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

        <div className="space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-md border transition ${
                  isOpen ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/20"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <span className="flex-1 text-[13px] font-semibold">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-3 pl-[52px] flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-[11px] font-bold flex items-center justify-center shrink-0 -ml-[36px]">
                          A
                        </span>
                        <p className="text-[12.5px] text-muted-foreground leading-relaxed">{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  Clock,
  Flag,
  Globe2,
  HelpCircle,
  Map as MapIcon,
  Monitor,
  PlayCircle,
  RefreshCcw,
  Share2,
  Shield,
  Swords,
  Target,
  Trophy,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MatchmakingScene } from "@/components/cinematic/MatchmakingScene";
import { MatchCreatedScene } from "@/components/cinematic/MatchCreatedScene";
import { VsBadge } from "@/components/cinematic/VsBadge";
import { useApp, type Match } from "@/store/app";

type Phase = "detail" | "joining" | "joined" | "ready";
type Tab = "info" | "participants";

export function MatchDetailModal({
  match,
  onOpenChange,
}: {
  match: Match | null;
  onOpenChange: (m: Match | null) => void;
}) {
  const joinMatch = useApp((s) => s.joinMatch);
  const [phase, setPhase] = useState<Phase>("detail");
  const [tab, setTab] = useState<Tab>("info");
  const open = !!match;

  const close = (v: boolean) => {
    onOpenChange(v ? match : null);
    if (!v)
      setTimeout(() => {
        setPhase("detail");
        setTab("info");
      }, 200);
  };

  const join = () => {
    setPhase("joining");
    setTimeout(() => {
      if (match) joinMatch(match.id);
      setPhase("joined");
      setTimeout(() => setPhase("ready"), 2200);
    }, 1800);
  };

  if (!match) return null;
  const totalPrize = parseInt(match.stake.replace(/\D/g, ""), 10) * 2;

  // Show the fist-power explosion ONLY in the center column
  // but it needs to overlay across center + Player B columns (per reference frame 3).
  const showExplosionAcross = phase === "joined";

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[860px] border-border bg-[linear-gradient(180deg,oklch(0.16_0.025_260/0.98),oklch(0.12_0.02_260/0.99))] p-0 overflow-hidden gap-0">
        {/* Tabs */}
        <div className="flex items-center border-b border-border px-6">
          <button
            onClick={() => setTab("info")}
            className={`px-4 py-3.5 text-[12px] font-bold tracking-wider border-b-2 -mb-px transition ${
              tab === "info"
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            MATCH INFO
          </button>
          <button
            onClick={() => setTab("participants")}
            className={`px-4 py-3.5 text-[12px] font-bold tracking-wider border-b-2 -mb-px transition ${
              tab === "participants"
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            PARTICIPANTS
          </button>
          <button onClick={() => close(false)} className="ml-auto text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 max-h-[85vh] overflow-y-auto scrollbar-thin">
          {tab === "info" && (
            <>
              {/* Header strip */}
              <div className="flex items-center gap-4">
                <div className="w-[140px] h-[80px] rounded-md bg-gradient-to-br from-[oklch(0.35_0.15_20)] to-[oklch(0.18_0.05_25)] border border-border flex items-center justify-center font-display font-bold text-[11px] tracking-widest">
                  {match.game.split(" ")[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-bold tracking-tight">{match.title}</h2>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-[oklch(0.35_0.12_240)] text-[oklch(0.8_0.15_240)]">
                      {match.tag}
                    </span>
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-secondary/40 border border-border text-muted-foreground">
                      Personal
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-3 mt-3 text-[10.5px]">
                    <StatCol label="Game" value={match.game.split(" ")[0]} />
                    <StatCol label="Game ID" value={match.host} />
                    <StatCol label="Current Rank" value={match.rank} />
                    <StatCol label="Prize Pool" value={"100K Stake"} accent />
                    <StatCol
                      label="Current Players"
                      value={phase === "joined" || phase === "ready" ? "2 / 2" : match.players}
                    />
                    <StatCol label="Deadline" value="2024.05.25 23:59" />
                    <StatCol
                      label="Status"
                      value={phase === "joined" || phase === "ready" ? "Waiting" : match.status}
                      highlight
                    />
                  </div>
                </div>
              </div>

              {/* Players VS section */}
              <div className="grid grid-cols-[1fr_160px_1fr] items-stretch gap-3 mt-5 min-h-[188px]">
                {/* Player A (always visible) */}
                <PlayerCardA match={match} />

                {/* CENTER column — VS badge / matchmaking / application-complete fist
                    all render inside this single column so they stay contained. */}
                <div className="relative flex flex-col items-center justify-center min-h-[180px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    {phase === "detail" && (
                      <motion.div
                        key="c-detail"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <CenterDetail />
                      </motion.div>
                    )}
                    {phase === "ready" && (
                      <motion.div
                        key="c-ready"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <CenterReady />
                      </motion.div>
                    )}
                    {phase === "joining" && (
                      <motion.div
                        key="c-joining"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-md"
                      >
                        <MatchmakingScene compact label="MATCHMAKING..." sub="Please wait a moment." />
                      </motion.div>
                    )}
                    {phase === "joined" && (
                      <motion.div
                        key="c-joined"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-md"
                      >
                        <MatchCreatedScene
                          compact
                          label="APPLICATION COMPLETE!"
                          sub="Waiting for the opponent to accept."
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Player B (muted in detail/joining/joined, filled only in ready) */}
                <PlayerCardB phase={phase} />
              </div>

              {/* MATCH DETAILS */}
              <section className="mt-5">
                <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2">MATCH DETAILS</div>
                <div className="grid grid-cols-7 gap-1 panel p-3">
                  <DetailCell icon={Swords} label="Game" value="TEKKEN 8" />
                  <DetailCell icon={Target} label="Match Type" value="1v1 Duel" />
                  <DetailCell icon={MapIcon} label="Map" value="Random" />
                  <DetailCell icon={Trophy} label="Total Prize" value="100K Stake" accent />
                  <DetailCell icon={Shield} label="Entry Fee" value="10K Stake" />
                  <DetailCell
                    icon={Users}
                    label="Current Players"
                    value={phase === "joined" || phase === "ready" ? "2 / 2" : match.players}
                  />
                  <DetailCell icon={Clock} label="Deadline" value="2024.05.25 23:59" />
                </div>
                <div className="grid grid-cols-5 gap-1 panel p-3 mt-1">
                  <DetailCell icon={PlayCircle} label="Starts" value="Immediately after match" />
                  <DetailCell icon={Zap} label="Mode" value="Best of 3" />
                  <DetailCell icon={Calendar} label="Random Character" value="On" />
                  <DetailCell icon={Monitor} label="Platform" value="PC" />
                  <DetailCell icon={Globe2} label="Region" value="No Region Restriction" />
                </div>
              </section>

              {/* PRIZE & PAYOUT */}
              <section className="mt-4">
                <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2">
                  PRIZE &amp; PAYOUT
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="panel p-3 flex items-center gap-2.5">
                    <Trophy className="w-7 h-7 text-gold" />
                    <div>
                      <div className="text-[10px] text-muted-foreground">Total Prize</div>
                      <div className="font-display font-bold text-[16px] text-gold leading-none mt-0.5">
                        {(totalPrize / 1000).toFixed(0)}K
                      </div>
                      <div className="text-[9.5px] text-muted-foreground mt-0.5">
                        (Up to {(totalPrize / 1000).toFixed(0)}K)
                      </div>
                    </div>
                  </div>
                  <div className="panel p-3 flex items-center gap-2.5">
                    <RefreshCcw className="w-7 h-7 text-primary" />
                    <div>
                      <div className="text-[10px] text-muted-foreground">Payout Method</div>
                      <div className="text-[12px] font-bold leading-tight mt-0.5">
                        Paid immediately
                        <br />
                        <span className="text-muted-foreground font-normal">after match ends</span>
                      </div>
                    </div>
                  </div>
                  <div className="panel p-3 flex items-center gap-2.5">
                    <Shield className="w-7 h-7 text-success" />
                    <div>
                      <div className="text-[10px] text-muted-foreground">Payout Conditions</div>
                      <div className="text-[12px] font-bold leading-tight mt-0.5">
                        Paid upon successful
                        <br />
                        <span className="text-muted-foreground font-normal">match completion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* MATCH RULES */}
              <section className="mt-4">
                <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2">MATCH RULES</div>
                <div className="grid grid-cols-5 gap-1 panel p-3">
                  <RuleCell icon={Check} label="Fair Play Required" />
                  <RuleCell icon={RefreshCcw} label="Rematch in Case of Disconnect" />
                  <RuleCell icon={X} label="No Cheating / Third-Party Tools" />
                  <RuleCell icon={Flag} label="Dispute Allowed" />
                  <RuleCell icon={Shield} label="Platform Policy Applies" />
                </div>
              </section>

              {/* ACTIONS — shared layout, button morphs per phase */}
              <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-3 mt-5">
                <Button
                  variant="outline"
                  className="h-11 border-border bg-secondary/40 text-[12px] font-bold tracking-wider gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> SHARE MATCH
                </Button>

                <AnimatePresence mode="wait">
                  {phase === "detail" && (
                    <motion.div key="btn-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Button
                        onClick={join}
                        className="w-full h-11 btn-neon border-0 text-[13px] font-bold tracking-wider"
                      >
                        JOIN MATCH
                      </Button>
                    </motion.div>
                  )}
                  {phase === "joining" && (
                    <motion.div key="btn-join" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Button
                        disabled
                        className="w-full h-11 border border-primary/60 bg-primary/20 text-primary text-[13px] font-bold tracking-wider gap-2 hover:bg-primary/20"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-flex"
                        >
                          <RefreshCcw className="w-4 h-4" />
                        </motion.span>
                        MATCHMAKING...
                      </Button>
                    </motion.div>
                  )}
                  {phase === "joined" && (
                    <motion.div
                      key="btn-joined"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        disabled
                        className="w-full h-11 border border-primary/70 bg-primary/10 text-primary text-[13px] font-bold tracking-wider gap-2 hover:bg-primary/10"
                      >
                        <span className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" strokeWidth={4} />
                        </span>
                        APPLICATION COMPLETE
                      </Button>
                    </motion.div>
                  )}
                  {phase === "ready" && (
                    <motion.div key="btn-ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Button
                        disabled
                        className="w-full h-11 bg-secondary/60 border border-border text-muted-foreground text-[13px] font-bold tracking-wider gap-2"
                      >
                        <Check className="w-4 h-4" /> APPLICATION COMPLETE
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  variant="outline"
                  onClick={() => close(false)}
                  className="h-11 border-border bg-secondary/40 text-[12px] font-bold tracking-wider"
                >
                  CANCEL
                </Button>
              </div>
            </>
          )}

          {tab === "participants" && (
            <div className="space-y-4">
              <div className="panel p-4">
                <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2">OVERALL STATS</div>
                <div className="grid grid-cols-7 gap-3 text-[10.5px]">
                  <Stat label="Win Rate" value="71%" color="text-success" />
                  <Stat label="Total Matches" value="128W 52L" sub="(180 Matches)" />
                  <Stat label="Win Streak" value="7 Wins" color="text-gold" />
                  <Stat label="Max Win Streak" value="12 Wins" color="text-gold" />
                  <Stat label="KO Rate" value="64%" />
                  <Stat label="Average Rounds" value="1.8" />
                  <Stat label="Perfect Wins" value="23" color="text-primary" />
                </div>
                <div className="text-right text-[11px] font-bold mt-3">
                  <span className="text-muted-foreground mr-2">Participation Rate</span>
                  <span className="text-success">62%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="panel p-4">
                  <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2">RECENT 5 MATCHES</div>
                  <div className="space-y-1.5">
                    {[
                      { r: "W", n: "ProGamer#KR1", d: "2024.05.24 21:30", s: "3 : 1" },
                      { r: "W", n: "GamerAce#777", d: "2024.05.24 20:15", s: "3 : 2" },
                      { r: "L", n: "BattleKing77", d: "2024.05.23 23:40", s: "1 : 3" },
                      { r: "W", n: "StarPlayer", d: "2024.05.23 22:05", s: "3 : 0" },
                      { r: "W", n: "ZeroTwo", d: "2024.05.23 19:10", s: "3 : 2" },
                    ].map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px]">
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                            m.r === "W" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                          }`}
                        >
                          {m.r}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-secondary border border-border" />
                        <span className="flex-1 font-semibold">{m.n}</span>
                        <span className="text-muted-foreground text-[10px]">1v1 Match</span>
                        <span className="text-muted-foreground text-[10px]">{m.d}</span>
                        <span className="font-bold font-display">{m.s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="panel p-4">
                    <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2">
                      RANK INFORMATION
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-gradient-to-br from-primary/30 to-secondary border border-primary flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-[13px]">Rage (Lv. 28)</div>
                        <div className="font-display text-[16px] font-bold text-primary">3,245 LP</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-[10px] text-muted-foreground">755 LP until next rank</div>
                      <div className="w-full h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-[oklch(0.78_0.18_35)]"
                          style={{ width: "70%" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-[10.5px]">
                      <div>
                        <div className="text-muted-foreground">Rank</div>
                        <div className="font-bold text-gold mt-0.5">Top 2.3% (1,245th)</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Season Best</div>
                        <div className="font-bold mt-0.5">God of Iron Fist (Lv. 30)</div>
                      </div>
                    </div>
                  </div>
                  <div className="panel p-4">
                    <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2">
                      REPORT / BAN STATUS
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-success" />
                      <div>
                        <div className="font-bold text-[12px] text-success">No Restrictions</div>
                        <div className="text-[10px] text-muted-foreground">You have no active reports or bans.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-3">
                <Button
                  variant="outline"
                  className="h-11 border-border bg-secondary/40 text-[12px] font-bold tracking-wider gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> SHARE MATCH
                </Button>
                <Button onClick={join} className="h-11 btn-neon border-0 text-[13px] font-bold tracking-wider">
                  JOIN MATCH
                </Button>
                <Button
                  variant="outline"
                  onClick={() => close(false)}
                  className="h-11 border-border bg-secondary/40 text-[12px] font-bold tracking-wider"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CenterDetail() {
  return (
    <>
      <VsBadge size={130} />
      <div className="text-center -mt-1">
        <div className="font-display font-bold text-[15px]">1 / 2</div>
        <div className="text-[10.5px] text-muted-foreground">Current Players</div>
      </div>
    </>
  );
}

function CenterReady() {
  return (
    <>
      <VsBadge size={130} />
      <div className="text-center -mt-1">
        <div className="font-display font-bold text-[15px]">2 / 2</div>
        <div className="text-[10.5px] text-muted-foreground">All players are ready.</div>
        <div className="text-[10.5px] text-muted-foreground">Waiting for match to start.</div>
      </div>
    </>
  );
}

function PlayerCardA({ match }: { match: Match }) {
  return (
    <div className="panel p-4 border-primary/50 relative z-[2]">
      <div className="text-[11px] font-bold text-primary tracking-wider mb-2">PLAYER A</div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary border border-primary flex items-center justify-center shadow-[0_0_16px_oklch(0.62_0.24_25/0.4)]">
          <User className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-[13px]">{match.host}</div>
          <div className="text-[10.5px] text-muted-foreground">{match.rank}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 text-[10px]">
        <div>
          <div className="text-muted-foreground">Win Rate</div>
          <div className="font-bold text-success text-[12px] mt-0.5">71%</div>
        </div>
        <div>
          <div className="text-muted-foreground">W / L</div>
          <div className="font-bold text-[12px] mt-0.5">28W 20L</div>
        </div>
        <div>
          <div className="text-muted-foreground">Recent Record</div>
          <div className="flex items-center gap-0.5 mt-1">
            {(["W", "W", "L", "W", "W"] as const).map((r, i) => (
              <span
                key={i}
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  r === "W"
                    ? "bg-success/20 text-success border border-success/50"
                    : "bg-primary/20 text-primary border border-primary/50"
                }`}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerCardB({ phase }: { phase: Phase }) {
  const filled = phase === "joined" || phase === "ready";
  return (
    <div
      className={`panel p-4 relative ${
        filled ? "border-[oklch(0.55_0.2_240)]/60" : "border-[oklch(0.55_0.2_240)]/40"
      } ${phase === "joined" ? "z-[1]" : "z-[2]"}`}
    >
      <div className="text-[11px] font-bold text-[oklch(0.7_0.2_240)] tracking-wider mb-2">PLAYER B</div>
      {filled ? (
        <>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(0.4_0.15_240)] to-secondary border border-[oklch(0.55_0.2_240)] flex items-center justify-center shadow-[var(--shadow-blue)]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-[13px]">Challenger123</div>
              <div className="text-[10.5px] text-muted-foreground">Mighty-Ruler (Lv. 25)</div>
              <div className="text-[10px] text-gold mt-0.5">Waiting for acceptance...</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-[10px]">
            <div>
              <div className="text-muted-foreground">Win Rate</div>
              <div className="font-bold text-success text-[12px] mt-0.5">68%</div>
            </div>
            <div>
              <div className="text-muted-foreground">W / L</div>
              <div className="font-bold text-[12px] mt-0.5">152W 70L</div>
            </div>
            <div>
              <div className="text-muted-foreground">Recent Record</div>
              <div className="flex items-center gap-0.5 mt-1">
                {(["W", "L", "W", "W", "W"] as const).map((r, i) => (
                  <span
                    key={i}
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      r === "W"
                        ? "bg-success/20 text-success border border-success/50"
                        : "bg-primary/20 text-primary border border-primary/50"
                    }`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <div className="font-bold text-[13px] text-muted-foreground">Looking for player...</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-[10px] opacity-60">
            <div>
              <div className="text-muted-foreground">Win Rate</div>
              <div className="font-bold text-[12px] mt-0.5">-</div>
            </div>
            <div>
              <div className="text-muted-foreground">W / L</div>
              <div className="font-bold text-[12px] mt-0.5">-</div>
            </div>
            <div>
              <div className="text-muted-foreground">Recent Record</div>
              <div className="font-bold text-[12px] mt-0.5">-</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCol({
  label,
  value,
  accent,
  highlight,
}: {
  label: string;
  value: string;
  accent?: boolean;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-muted-foreground uppercase tracking-wide text-[9.5px]">{label}</div>
      <div className={`font-bold text-[11.5px] mt-0.5 ${accent ? "text-gold" : highlight ? "text-success" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function DetailCell({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-2 px-1.5 py-1">
      <div className="w-7 h-7 rounded bg-secondary/60 border border-border flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <div className="text-[9.5px] text-muted-foreground uppercase tracking-wide">{label}</div>
        <div className={`text-[11px] font-bold truncate ${accent ? "text-gold" : ""}`}>{value}</div>
      </div>
    </div>
  );
}

function RuleCell({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <div className="w-6 h-6 rounded-full bg-secondary/60 border border-border flex items-center justify-center shrink-0">
        <Icon className="w-3 h-3 text-muted-foreground" />
      </div>
      <span className="text-[10.5px] font-semibold leading-tight">{label}</span>
    </div>
  );
}

function Stat({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className={`font-display font-bold text-[14px] mt-1 ${color || ""}`}>{value}</div>
      {sub && <div className="text-[9.5px] text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

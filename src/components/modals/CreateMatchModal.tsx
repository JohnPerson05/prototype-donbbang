import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Copy, Minus, Plus, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MatchmakingScene } from "@/components/cinematic/MatchmakingScene";
import { MatchCreatedScene } from "@/components/cinematic/MatchCreatedScene";
import { useApp, type Match } from "@/store/app";

type Phase = "form" | "matching" | "created" | "done";

export function CreateMatchModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const addMatch = useApp((s) => s.addMatch);
  const user = useApp((s) => s.user);
  const [phase, setPhase] = useState<Phase>("form");

  const [game, setGame] = useState("Overwatch 2");
  const [type, setType] = useState("1:1 Duel");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [map, setMap] = useState("Select map");
  const [rank, setRank] = useState("Select rank");
  const [format, setFormat] = useState<"1" | "3" | "5">("3");
  const [victory, setVictory] = useState("Select victory conditions");
  const [prize, setPrize] = useState(100000);
  const [players, setPlayers] = useState("2 Players (1 vs 1)");
  const [participantRange, setParticipantRange] = useState("All");
  const [startMode, setStartMode] = useState<"now" | "schedule">("now");
  const [matchType, setMatchType] = useState<"open" | "private">("open");
  const [autoCode, setAutoCode] = useState(true);
  const [code] = useState("A1B2C3");
  const [verify, setVerify] = useState(true);
  const [report, setReport] = useState(true);
  const [notes, setNotes] = useState("");

  const close = (v: boolean) => {
    onOpenChange(v);
    if (!v)
      setTimeout(() => {
        setPhase("form");
        setTitle("");
        setDesc("");
      }, 200);
  };

  const submit = () => {
    setPhase("matching");
    setTimeout(() => {
      setPhase("created");
      setTimeout(() => {
        const newCode = autoCode ? code : Math.random().toString(36).slice(2, 8).toUpperCase();
        const m: Match = {
          id: `20240525-${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
          game: game.toUpperCase(),
          title: title || "New Prize Match",
          tag: type,
          host: user?.name ?? "GAMER01",
          rank: "Diamond 1",
          winRate: "—",
          stake: `${prize.toLocaleString()}P`,
          mode: type.includes("1:1") ? "1 : 1" : "5 : 5",
          format: `Best of ${format}`,
          players: "1 / 2",
          status: "Recruiting",
          code: newCode,
        };
        addMatch(m);
        setPhase("done");
      }, 1600);
    }, 1800);
  };

  const cinematic = phase === "matching" || phase === "created";

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        className={
          cinematic
            ? "sm:max-w-none w-screen h-screen max-h-screen border-0 bg-transparent p-0 overflow-hidden gap-0 shadow-none top-0 left-0 translate-x-0 translate-y-0 rounded-none"
            : "sm:max-w-[620px] border-border bg-[linear-gradient(180deg,oklch(0.16_0.025_260/0.98),oklch(0.12_0.02_260/0.99))] p-0 overflow-hidden gap-0"
        }
      >
        {!cinematic && (
          <button
            onClick={() => close(false)}
            className="absolute right-5 top-5 text-primary/90 hover:text-primary z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {cinematic ? (
          <AnimatePresence mode="wait">
            {phase === "matching" && (
              <motion.div
                key="cine-m"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <MatchmakingScene />
              </motion.div>
            )}
            {phase === "created" && (
              <motion.div
                key="cine-c"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <MatchCreatedScene />
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="px-6 pt-5 pb-6 max-h-[92vh] overflow-y-auto scrollbar-thin">
            <h2 className="text-[18px] font-bold tracking-tight mb-4">Create Match</h2>

          <AnimatePresence mode="wait">
            {phase === "form" && (
              <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* SECTION 1: Basic Information */}
                <section className="mb-5">
                  <div className="text-[13px] font-bold mb-2.5">
                    <span className="text-primary">1.</span> Basic Information
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <Field label="Game">
                      <Select value={game} onValueChange={setGame}>
                        <SelectTrigger className="h-10 bg-input/60 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["Overwatch 2", "Valorant", "Tekken 8", "League of Legends", "PUBG"].map((g) => (
                            <SelectItem value={g} key={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Match Type">
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="h-10 bg-input/60 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:1 Duel">1:1 Duel</SelectItem>
                          <SelectItem value="2:2 Match">2:2 Match</SelectItem>
                          <SelectItem value="5:5 Team">5:5 Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Match Title">
                      <div className="relative">
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value.slice(0, 30))}
                          placeholder="Enter match title (max 30 characters)"
                          className="h-10 bg-input/60 border-border pr-12"
                        />
                      </div>
                    </Field>
                  </div>

                  <div className="mt-3">
                    <label className="text-[11px] text-muted-foreground">Match Description (Optional)</label>
                    <div className="relative mt-1">
                      <Textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value.slice(0, 200))}
                        placeholder="Enter a description for the match (max 200 characters)"
                        className="h-[58px] bg-input/60 border-border resize-none"
                      />
                      <span className="absolute bottom-2 right-3 text-[10.5px] text-muted-foreground">
                        {desc.length} / 200
                      </span>
                    </div>
                  </div>
                </section>

                {/* SECTION 2: Match Settings */}
                <section className="mb-5">
                  <div className="text-[13px] font-bold mb-2.5">
                    <span className="text-primary">2.</span> Match Settings
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Field label="Map Selection">
                      <Select value={map} onValueChange={setMap}>
                        <SelectTrigger className="h-10 bg-input/60 border-border">
                          <SelectValue placeholder="Select map" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="King's Row">King&apos;s Row</SelectItem>
                          <SelectItem value="Dorado">Dorado</SelectItem>
                          <SelectItem value="Numbani">Numbani</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Max Rank (Optional)">
                      <Select value={rank} onValueChange={setRank}>
                        <SelectTrigger className="h-10 bg-input/60 border-border">
                          <SelectValue placeholder="Select rank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="No Rank Limit">No Rank Limit</SelectItem>
                          <SelectItem value="Diamond">Diamond</SelectItem>
                          <SelectItem value="Master">Master</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="mt-3">
                    <label className="text-[11px] text-muted-foreground">Match Format</label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {[
                        { k: "1" as const, title: "Best of 1", sub: "1 Game" },
                        { k: "3" as const, title: "Best of 3", sub: "Win 2 out of 3" },
                        { k: "5" as const, title: "Best of 5", sub: "Win 3 out of 5" },
                      ].map((f) => (
                        <button
                          key={f.k}
                          onClick={() => setFormat(f.k)}
                          className={`rounded-md border px-3 py-2 text-left transition ${
                            format === f.k
                              ? "border-primary bg-primary/5 shadow-[0_0_0_1px_oklch(0.62_0.24_25/0.4)]"
                              : "border-border bg-secondary/30 hover:border-primary/40"
                          }`}
                        >
                          <div className="text-[12px] font-bold">{f.title}</div>
                          <div className="text-[10.5px] text-muted-foreground">{f.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="text-[11px] text-muted-foreground">Victory Conditions</label>
                    <Select value={victory} onValueChange={setVictory}>
                      <SelectTrigger className="h-10 mt-1 bg-input/60 border-border">
                        <SelectValue placeholder="Select victory conditions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="First to reach 5 eliminations">First to reach 5 eliminations</SelectItem>
                        <SelectItem value="Objective control">Objective control</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[10.5px] text-muted-foreground mt-1">
                      The selected conditions must be achieved to be recognized as a valid victory.
                    </p>
                  </div>
                </section>

                {/* SECTION 3: Prize & Participation */}
                <section className="mb-4">
                  <div className="text-[13px] font-bold mb-2.5">
                    <span className="text-primary">3.</span> Prize &amp; Participation Settings
                  </div>

                  <div className="grid grid-cols-4 gap-2.5">
                    <Field label="Prize (P)">
                      <div className="flex items-center bg-input/60 border border-border rounded-md h-10">
                        <button
                          onClick={() => setPrize(Math.max(1000, prize - 10000))}
                          className="px-2 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          value={`${(prize / 1000).toFixed(0)}K`}
                          readOnly
                          className="flex-1 bg-transparent text-center font-bold text-[12px] outline-none"
                        />
                        <button
                          onClick={() => setPrize(prize + 10000)}
                          className="px-2 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </Field>
                    <Field label="Players">
                      <Select value={players} onValueChange={setPlayers}>
                        <SelectTrigger className="h-10 bg-input/60 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2 Players (1 vs 1)">2 Players (1 vs 1)</SelectItem>
                          <SelectItem value="4 Players (2 vs 2)">4 Players (2 vs 2)</SelectItem>
                          <SelectItem value="10 Players (5 vs 5)">10 Players (5 vs 5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Participant Range">
                      <Select value={participantRange} onValueChange={setParticipantRange}>
                        <SelectTrigger className="h-10 bg-input/60 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="Friends Only">Friends Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Start Time">
                      <div className="flex flex-col gap-1 mt-1">
                        <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                          <input
                            type="radio"
                            checked={startMode === "now"}
                            onChange={() => setStartMode("now")}
                            className="accent-primary"
                          />
                          <Zap className="w-3 h-3 text-primary" /> Start Now
                        </label>
                        <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                          <input
                            type="radio"
                            checked={startMode === "schedule"}
                            onChange={() => setStartMode("schedule")}
                            className="accent-primary"
                          />
                          <Calendar className="w-3 h-3" /> Schedule
                        </label>
                      </div>
                    </Field>
                  </div>

                  <p className="text-[11px] text-muted-foreground mt-2">
                    My Points: <span className="text-foreground font-semibold">125,000P</span>
                  </p>

                  <div className="grid grid-cols-4 gap-2.5 mt-3">
                    <Field label="Match Type">
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                          <input
                            type="radio"
                            checked={matchType === "open"}
                            onChange={() => setMatchType("open")}
                            className="accent-primary"
                          />
                          Open Match
                        </label>
                        <label className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                          <input
                            type="radio"
                            checked={matchType === "private"}
                            onChange={() => setMatchType("private")}
                            className="accent-primary"
                          />
                          Private Match
                        </label>
                      </div>
                    </Field>
                    <Field label="Auto Create Code">
                      <div className="flex items-center gap-2 h-10">
                        <Toggle value={autoCode} onChange={setAutoCode} />
                        <div className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/40 border border-border text-[10.5px] font-mono">
                          {code}
                          <button className="text-muted-foreground hover:text-foreground">
                            <Copy className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </Field>
                    <Field label="Result Verification">
                      <div className="flex items-center gap-2 h-10">
                        <Toggle value={verify} onChange={setVerify} />
                        <span className="text-[10.5px] text-muted-foreground leading-tight">
                          Results must be confirmed by both players.
                        </span>
                      </div>
                    </Field>
                    <Field label="Report Abuse">
                      <div className="flex items-center gap-2 h-10">
                        <Toggle value={report} onChange={setReport} />
                        <span className="text-[10.5px] text-muted-foreground leading-tight">
                          Allow participants to report violations.
                        </span>
                      </div>
                    </Field>
                  </div>

                  <div className="mt-3">
                    <label className="text-[11px] text-muted-foreground">Additional Notes (Optional)</label>
                    <div className="relative mt-1">
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value.slice(0, 200))}
                        placeholder="Enter any additional notes (max 200 characters)"
                        className="h-[58px] bg-input/60 border-border resize-none"
                      />
                      <span className="absolute bottom-2 right-3 text-[10.5px] text-muted-foreground">
                        {notes.length} / 200
                      </span>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={submit} className="h-11 btn-neon border-0 text-[13px] font-bold tracking-wider">
                    CREATE MATCH
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => close(false)}
                    className="h-11 border-border bg-secondary/40 text-[13px] font-bold tracking-wider"
                  >
                    CANCEL
                  </Button>
                </div>
              </motion.div>
            )}

            {phase === "done" && (
              <motion.div
                key="d"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4"
              >
                <div className="panel p-4 mb-4 border-primary/40">
                  <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-2">MATCH CREATED</div>
                  <div className="grid grid-cols-4 gap-3 text-[11px]">
                    <div>
                      <div className="text-muted-foreground">Match ID</div>
                      <div className="font-semibold mt-0.5">20240525-0001</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Created</div>
                      <div className="font-semibold mt-0.5">2024.05.26 21:30</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Status</div>
                      <div className="font-semibold mt-0.5 text-success">Recruiting</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Current Players</div>
                      <div className="font-semibold mt-0.5">1 / 2</div>
                    </div>
                  </div>
                  <Button className="w-full mt-3 h-9 btn-neon border-0 text-[11.5px] font-bold tracking-wider gap-1">
                    Go to Match Page <span>→</span>
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <Button
                    variant="outline"
                    onClick={() => close(false)}
                    className="h-10 border-border bg-secondary/40 text-[12px] font-bold tracking-wider"
                  >
                    CANCEL
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 border-border bg-secondary/40 text-[12px] font-bold tracking-wider"
                  >
                    SAVE DRAFT
                  </Button>
                  <Button className="h-10 btn-neon border-0 text-[12px] font-bold tracking-wider">
                    MANAGE MATCH
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`relative inline-flex items-center shrink-0 w-[38px] h-[20px] rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        value
          ? "bg-gradient-to-r from-primary to-[oklch(0.55_0.22_20)] shadow-[0_0_10px_oklch(0.62_0.24_25/0.5),inset_0_1px_0_oklch(1_0_0/0.15)]"
          : "bg-secondary border border-border shadow-[inset_0_1px_2px_oklch(0_0_0/0.5)]"
      }`}
    >
      <motion.span
        className="absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-[0_2px_4px_oklch(0_0_0/0.5)]"
        animate={{ x: value ? 18 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <span
          className={`absolute inset-[3px] rounded-full transition-colors ${
            value ? "bg-[oklch(0.95_0.02_20)]" : "bg-[oklch(0.82_0.01_260)]"
          }`}
        />
      </motion.span>
    </button>
  );
}

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mic, MicOff, Minus, Plus, Shield, Sparkles, Swords, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/store/app";

type Phase = "form" | "done";

const roles = [
  { key: "tank", label: "Tank", icon: Shield },
  { key: "damage", label: "Damage", icon: Swords },
  { key: "support", label: "Support", icon: Sparkles },
  { key: "flex", label: "Flex", icon: Sparkles },
  { key: "any", label: "Any", icon: Sparkles },
];

export function CreateRecruitModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const addRecruit = useApp((s) => s.addRecruit);
  const [phase, setPhase] = useState<Phase>("form");
  const [game, setGame] = useState("Overwatch 2");
  const [category, setCategory] = useState("Team Recruitment");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tierMin, setTierMin] = useState("Diamond IV");
  const [tierMax, setTierMax] = useState("Champion");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [time, setTime] = useState("Everyday (6 PM ~ 12 AM)");
  const [voice, setVoice] = useState<"required" | "optional" | "none">("required");
  const [current, setCurrent] = useState(1);
  const [max, setMax] = useState(5);
  const [play, setPlay] = useState("Ranked");
  const [discord, setDiscord] = useState("");
  const [notes, setNotes] = useState("");
  const [rolesOpen, setRolesOpen] = useState(false);

  const close = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(() => setPhase("form"), 200);
  };

  const toggleRole = (k: string) =>
    setSelectedRoles((prev) => (prev.includes(k) ? prev.filter((r) => r !== k) : [...prev, k]));

  const submit = () => {
    addRecruit({
      id: `r-${Date.now()}`,
      game: game.toUpperCase(),
      category: "RECRUITING",
      tier: "RANKED",
      title: title || "Looking for a team",
      author: `GAMER01 · ${tierMin}`,
      time: `Available: ${time}`,
      roles: selectedRoles.length ? selectedRoles.map((k) => roles.find((r) => r.key === k)?.label || k) : ["Any"],
      members: `${current} / ${max}`,
      status: "RECRUITING",
    });
    setPhase("done");
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[760px] border-border bg-[linear-gradient(180deg,oklch(0.16_0.025_260/0.98),oklch(0.12_0.02_260/0.99))] p-0 overflow-hidden gap-0">
        <button
          onClick={() => close(false)}
          className="absolute right-5 top-5 text-primary/90 hover:text-primary z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {phase === "form" && (
            <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-h-[90vh] overflow-y-auto scrollbar-thin">
              <h2 className="text-[18px] font-bold tracking-tight">CREATE POST</h2>
              <p className="text-[12px] text-muted-foreground mb-5">Find or recruit team members for your team!</p>

              <div className="h-px bg-border mb-5" />

              <section className="mb-5">
                <div className="text-[13px] font-bold mb-3">
                  <span className="text-primary">1.</span> BASIC INFORMATION
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Game</label>
                    <Select value={game} onValueChange={setGame}>
                      <SelectTrigger className="h-10 mt-1 bg-input/60 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Overwatch 2", "Valorant", "League of Legends", "PUBG", "Tekken 8", "Apex Legends"].map(
                          (g) => (
                            <SelectItem value={g} key={g}>
                              {g}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="h-10 mt-1 bg-input/60 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Team Recruitment">Team Recruitment</SelectItem>
                        <SelectItem value="Looking for Team">Looking for Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Post Title</label>
                    <div className="relative mt-1">
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, 30))}
                        placeholder="Enter post title (max 30 characters)"
                        className="h-10 bg-input/60 border-border pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10.5px] text-muted-foreground">
                        {title.length} / 30
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-[11.5px] text-muted-foreground">Description</label>
                  <div className="relative mt-1">
                    <Textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value.slice(0, 100))}
                      placeholder="Introduce your team or leave a message (max 100 characters)"
                      className="h-[60px] bg-input/60 border-border resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-[10.5px] text-muted-foreground">
                      {desc.length} / 100
                    </span>
                  </div>
                </div>
              </section>

              <div className="h-px bg-border mb-5" />

              <section className="mb-5">
                <div className="text-[13px] font-bold mb-3">
                  <span className="text-primary">2.</span> MATCH SETTINGS
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Competitive Tier (Min)</label>
                    <Select value={tierMin} onValueChange={setTierMin}>
                      <SelectTrigger className="h-10 mt-1 bg-input/60 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Bronze", "Silver", "Gold", "Platinum", "Diamond IV", "Diamond I", "Master", "Champion"].map(
                          (g) => (
                            <SelectItem value={g} key={g}>
                              {g}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Competitive Tier (Max)</label>
                    <Select value={tierMax} onValueChange={setTierMax}>
                      <SelectTrigger className="h-10 mt-1 bg-input/60 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Champion"].map((g) => (
                          <SelectItem value={g} key={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative">
                    <label className="text-[11.5px] text-muted-foreground">Preferred Role (Optional)</label>
                    <button
                      onClick={() => setRolesOpen((v) => !v)}
                      className={`w-full h-10 mt-1 rounded-md border bg-input/60 px-3 text-left text-[13px] flex items-center justify-between ${
                        rolesOpen ? "border-primary" : "border-border"
                      }`}
                    >
                      <span className={selectedRoles.length ? "" : "text-muted-foreground"}>
                        {selectedRoles.length ? selectedRoles.map((k) => roles.find((r) => r.key === k)?.label).join(", ") : "Select role (multiple selection)"}
                      </span>
                      <span className="text-muted-foreground">▾</span>
                    </button>
                    {rolesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-[68px] left-0 right-0 rounded-md border border-primary bg-popover z-20 p-1"
                      >
                        {roles.map((r) => {
                          const checked = selectedRoles.includes(r.key);
                          return (
                            <button
                              key={r.key}
                              onClick={() => toggleRole(r.key)}
                              className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-accent text-[12px]"
                            >
                              <span
                                className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center ${
                                  checked ? "bg-primary border border-primary" : "border border-muted-foreground/50"
                                }`}
                              >
                                {checked && <Check className="w-2.5 h-2.5" strokeWidth={4} />}
                              </span>
                              <r.icon className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>{r.label}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-2.5 mt-3">
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Available Time</label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="h-10 mt-1 bg-input/60 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Everyday (6 PM ~ 12 AM)", "Weekends", "Weekdays After 7PM", "Anytime"].map((g) => (
                          <SelectItem value={g} key={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Voice Chat</label>
                    <div className="flex gap-1.5 mt-1">
                      <button
                        onClick={() => setVoice("required")}
                        className={`h-10 px-3 rounded-md border text-[11.5px] font-semibold flex items-center gap-1.5 ${
                          voice === "required"
                            ? "btn-neon border-0"
                            : "bg-secondary/40 border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" /> Required
                      </button>
                      <button
                        onClick={() => setVoice("optional")}
                        className={`h-10 px-3 rounded-md border text-[11.5px] font-semibold flex items-center gap-1.5 ${
                          voice === "optional"
                            ? "bg-foreground text-background border-0"
                            : "bg-secondary/40 border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" /> Optional
                      </button>
                      <button
                        onClick={() => setVoice("none")}
                        className={`h-10 px-3 rounded-md border text-[11.5px] font-semibold flex items-center gap-1.5 ${
                          voice === "none"
                            ? "bg-foreground text-background border-0"
                            : "bg-secondary/40 border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <MicOff className="w-3.5 h-3.5" /> Not Required
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="h-px bg-border mb-5" />

              <section className="mb-5">
                <div className="text-[13px] font-bold mb-3">
                  <span className="text-primary">3.</span> TEAM INFORMATION
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  <Stepper label="Current Members" value={current} onChange={setCurrent} />
                  <Stepper label="Max Members" value={max} onChange={setMax} />
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Play Style</label>
                    <Select value={play} onValueChange={setPlay}>
                      <SelectTrigger className="h-10 mt-1 bg-input/60 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ranked">Ranked</SelectItem>
                        <SelectItem value="Casual">Casual</SelectItem>
                        <SelectItem value="Scrim">Scrim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-[11.5px] text-muted-foreground">Discord (Optional)</label>
                    <Input
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      placeholder="Discord ID#0000"
                      className="h-10 mt-1 bg-input/60 border-border"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-[11.5px] text-muted-foreground">Additional Notes (Optional)</label>
                  <div className="relative mt-1">
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value.slice(0, 300))}
                      placeholder="Provide additional details about your team (max 300 characters)"
                      className="h-[70px] bg-input/60 border-border resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-[10.5px] text-muted-foreground">
                      {notes.length} / 300
                    </span>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => close(false)}
                  className="h-11 border-border bg-secondary/40 text-[13px] font-bold tracking-wider"
                >
                  CANCEL
                </Button>
                <Button onClick={submit} className="h-11 btn-neon border-0 text-[13px] font-bold tracking-wider">
                  POST
                </Button>
              </div>
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div key="d" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-10 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shadow-[0_0_40px_oklch(0.62_0.24_25/0.5)]">
                <Check className="w-10 h-10 text-primary" strokeWidth={3} />
              </div>
              <h3 className="text-[20px] font-bold mt-4 tracking-tight">
                Your post has been <span className="text-primary">created!</span>
              </h3>
              <p className="text-muted-foreground text-[12px] mt-1">Your team recruitment post was created successfully.</p>

              <div className="mt-4 panel p-3.5 text-left flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-secondary border border-border flex items-center justify-center font-display font-bold text-[10px]">
                  LoL
                </div>
                <div className="flex-1">
                  <div className="text-[12.5px] font-bold">Looking for a team (Mid Lane)</div>
                  <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground mt-0.5">
                    <span>Diamond IV ~ Challenger</span>
                    <span>·</span>
                    <span>1 / 5</span>
                    <span>·</span>
                    <span>Everyday (6 PM ~ 12 AM)</span>
                  </div>
                </div>
              </div>

              <p className="text-[11.5px] text-muted-foreground mt-3">
                ⊙ You can check your post in &quot;My Posts&quot;.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <Button
                  variant="outline"
                  onClick={() => close(false)}
                  className="h-10 border-border bg-secondary/40 text-[13px] font-semibold"
                >
                  Write Another Post
                </Button>
                <Button onClick={() => close(false)} className="h-10 btn-neon border-0 text-[13px] font-semibold">
                  Go to My Posts
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-[11.5px] text-muted-foreground">{label}</label>
      <div className="flex items-center mt-1 bg-input/60 border border-border rounded-md h-10">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="px-3 text-muted-foreground hover:text-foreground"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="flex-1 text-center font-semibold text-[13px]">{value}</div>
        <button
          onClick={() => onChange(value + 1)}
          className="px-3 text-muted-foreground hover:text-foreground"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

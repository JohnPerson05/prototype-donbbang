import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Gamepad2, Gift, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { registrationGames } from "@/data/mock";

type Step = 1 | 2 | 3;

export function SignUpModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [step, setStep] = useState<Step>(1);
  const [selectedGames, setSelectedGames] = useState<string[]>(["League of Legends", "Valorant"]);
  const [completed, setCompleted] = useState(false);

  const canGoNext = useMemo(() => {
    if (step === 2) return selectedGames.length > 0;
    return true;
  }, [step, selectedGames.length]);

  const resetAll = () => {
    setStep(1);
    setCompleted(false);
    setSelectedGames(["League of Legends", "Valorant"]);
  };

  const close = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(resetAll, 180);
  };

  const toggleGame = (game: string) => {
    setSelectedGames((prev) =>
      prev.includes(game) ? prev.filter((g) => g !== game) : prev.length < 5 ? [...prev, game] : prev,
    );
  };

  const stepMeta = [
    { n: 1, label: "Basic Info" },
    { n: 2, label: "Game Info" },
    { n: 3, label: "Complete" },
  ] as const;

  // Modal width: basic info ~560, game info ~600, complete ~560
  const widthClass = step === 2 && !completed ? "sm:max-w-[600px]" : "sm:max-w-[560px]";

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        className={`${widthClass} border-border bg-[linear-gradient(180deg,oklch(0.16_0.025_260/0.98),oklch(0.12_0.02_260/0.99))] p-0 overflow-hidden gap-0`}
      >
        <DialogHeader className="px-6 pt-6 pb-0 text-left space-y-0">
          <DialogTitle className="text-[22px] font-bold leading-none tracking-tight">Sign Up</DialogTitle>
        </DialogHeader>

        <button
          onClick={() => close(false)}
          className="absolute right-5 top-5 text-primary/90 hover:text-primary transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 pt-5 pb-6">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-6">
            {stepMeta.map((s, idx) => {
              const active = step === s.n && !completed;
              const done = (step > s.n) || (completed && s.n < 3) || (completed && s.n === 3);
              const reached = active || done;
              return (
                <div key={s.n} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold leading-none transition
                        ${reached
                          ? "bg-primary text-primary-foreground shadow-[0_0_10px_oklch(0.62_0.24_25/0.5)]"
                          : "bg-secondary text-muted-foreground border border-border"}`}
                    >
                      {done ? <Check className="w-3.5 h-3.5" /> : s.n}
                    </div>
                    <span
                      className={`text-[13px] font-semibold whitespace-nowrap tracking-tight
                        ${active ? "text-primary" : reached ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && <div className="flex-1 h-px bg-border mx-3" />}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {!completed && step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="space-y-3"
              >
                <Field label="Username" placeholder="Enter username" />
                <Field label="Password" placeholder="Enter password" type="password" hint="- Must be at least 10 characters long." />
                <Field label="Confirm Password" placeholder="Confirm password" type="password" />
                <Field label="Nickname" placeholder="Enter nickname" hint="- Must be 2-12 characters (letters, numbers, underscores only)" />
                <Field label="Email" placeholder="Enter email" />
                <Field
                  label="Phone Number"
                  placeholder="Enter phone number"
                  right={
                    <button className="h-9 px-3 shrink-0 rounded-md btn-neon border-0 text-[12px] font-semibold whitespace-nowrap">
                      Send Verification
                    </button>
                  }
                />
                <Field
                  label="Verification Code"
                  placeholder="Enter verification code"
                  right={
                    <button className="h-9 px-4 shrink-0 rounded-md bg-secondary/40 border border-border text-[12px] font-semibold whitespace-nowrap hover:bg-accent">
                      Verify
                    </button>
                  }
                />
                <Field label="Referral Code" placeholder="Enter referral code (optional)" />

                {/* Captcha */}
                <div className="grid grid-cols-[116px_1fr] items-start gap-3">
                  <label className="text-[12px] text-muted-foreground pt-2.5">Captcha</label>
                  <div className="flex items-center gap-2">
                    <div className="h-9 px-3 rounded-md bg-secondary/40 border border-border flex items-center justify-center font-display font-bold text-[18px] tracking-[0.25em] select-none min-w-[96px]">
                      82A15
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <button className="text-muted-foreground hover:text-foreground text-[11px] leading-none">🔊</button>
                      <button className="text-muted-foreground hover:text-foreground"><RefreshCw className="w-3 h-3" /></button>
                    </div>
                    <Input placeholder="Enter the code" className="h-9 bg-input/60 border-border text-[13px]" />
                  </div>
                </div>
              </motion.div>
            )}

            {!completed && step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight">Please enter the games you mainly play!</h3>
                  <p className="text-muted-foreground text-[12px] mt-0.5">This information will be used to provide personalized services.</p>
                </div>

                <div>
                  <p className="text-[13px] font-semibold mb-2">
                    Select Your Main Games <span className="text-muted-foreground font-normal text-[12px]">(Up to 5)</span>
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {registrationGames.map((game) => {
                      const checked = selectedGames.includes(game);
                      return (
                        <button
                          key={game}
                          onClick={() => toggleGame(game)}
                          className={`relative h-[96px] rounded-md border flex flex-col items-center justify-between p-2 transition text-center
                            ${checked
                              ? "border-primary bg-primary/5 shadow-[0_0_0_1px_oklch(0.62_0.24_25/0.5)]"
                              : "border-border bg-secondary/20 hover:border-primary/40"}`}
                        >
                          <div className="flex-1 flex items-center justify-center">
                            <Gamepad2 className={`w-6 h-6 ${checked ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <div className="text-[10.5px] font-semibold leading-tight tracking-korean min-h-[24px] flex items-center justify-center px-0.5">
                            {game}
                          </div>
                          <div
                            className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center
                              ${checked ? "bg-primary border border-primary" : "bg-transparent border border-muted-foreground/50"}`}
                          >
                            {checked && <Check className="w-2.5 h-2.5 text-primary-foreground" strokeWidth={4} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <SelectField
                    label="Highest Rank in Main Game"
                    optional
                    placeholder="Diamond IV"
                    values={["Diamond IV", "Platinum I", "Gold II"]}
                  />
                  <SelectField
                    label="Preferred Position"
                    optional
                    placeholder="Select Position"
                    values={["Top", "Jungle", "Mid", "Bot", "Support"]}
                  />
                  <SelectField
                    label="Preferred Play Time"
                    optional
                    placeholder="Evening (6 PM – 12 AM)"
                    values={["Morning", "Afternoon", "Evening (6 PM – 12 AM)", "Late Night"]}
                  />
                  <SelectField
                    label="Play Style"
                    optional
                    placeholder="Select"
                    values={["Aggressive", "Balanced", "Defensive"]}
                  />
                </div>

                <div>
                  <label className="text-[12px] font-semibold">
                    About Me <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <div className="relative mt-1">
                    <Textarea
                      maxLength={100}
                      placeholder="Tell us about yourself! (Max 100 characters)"
                      className="h-[72px] bg-input/60 border-border text-[12px] resize-none pr-14"
                    />
                    <span className="absolute bottom-2 right-3 text-[11px] text-muted-foreground">0 / 100</span>
                  </div>
                </div>
              </motion.div>
            )}

            {!completed && step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="text-center py-10"
              >
                <p className="text-[13px] text-muted-foreground">Review your information and confirm to complete registration.</p>
              </motion.div>
            )}

            {completed && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-2"
              >
                <div className="w-[76px] h-[76px] rounded-full mx-auto bg-gold/10 border-2 border-gold flex items-center justify-center mb-4 shadow-[0_0_26px_oklch(0.82_0.16_85/0.45)]">
                  <Check className="w-9 h-9 text-gold" strokeWidth={3} />
                </div>
                <h3 className="font-display text-[22px] font-bold tracking-wide">SIGN-UP COMPLETED!</h3>
                <p className="font-display text-[18px] font-bold text-gold mt-1 tracking-wider">★ CONGRATULATIONS! ★</p>
                <p className="text-[13px] text-muted-foreground mt-2">
                  You can now enjoy all of Donbbang&apos;s amazing features.
                </p>

                <div className="mt-4 panel p-4 flex items-center gap-3 text-left">
                  <div className="w-12 h-12 rounded-md bg-primary/15 border border-primary/60 flex items-center justify-center shrink-0">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold">NEW MEMBER REWARD</div>
                    <div className="text-[12px] mt-0.5">
                      You&apos;ve received <span className="text-gold font-bold">5,000P!</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Check My Page &gt; Points to view your reward.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-4">
                  <Button className="btn-neon h-10 border-0 text-[13px] font-semibold">Go to Login</Button>
                  <Button
                    variant="outline"
                    onClick={() => close(false)}
                    className="h-10 border-border bg-secondary/30 text-[13px] font-semibold"
                  >
                    Go to Homepage
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!completed && (
            <div className={`flex items-center gap-3 ${step === 1 ? "mt-5" : "mt-5"}`}>
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
                  className="flex-1 h-11 border-border bg-secondary/30 text-[13px] font-semibold"
                >
                  Back
                </Button>
              )}
              <Button
                className={`${step === 1 ? "w-full" : "flex-[2]"} h-11 btn-neon border-0 text-[13px] font-semibold gap-1`}
                disabled={!canGoNext}
                onClick={() => {
                  if (step < 3) setStep((s) => ((s + 1) as Step));
                  else setCompleted(true);
                }}
              >
                {step === 3 ? "Confirm" : "Next Step"}
                {step < 3 && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  right,
  hint,
}: {
  label: string;
  placeholder: string;
  type?: string;
  right?: ReactNode;
  hint?: string;
}) {
  return (
    <div className="grid grid-cols-[116px_1fr] items-start gap-3">
      <label className="text-[12px] text-muted-foreground pt-2.5 leading-tight">{label}</label>
      <div>
        <div className="flex gap-2">
          <Input type={type} placeholder={placeholder} className="h-9 bg-input/60 border-border text-[13px]" />
          {right}
        </div>
        {hint && <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>}
      </div>
    </div>
  );
}

function SelectField({
  label,
  placeholder,
  values,
  optional,
}: {
  label: string;
  placeholder: string;
  values: string[];
  optional?: boolean;
}) {
  return (
    <div>
      <label className="text-[12px] font-semibold">
        {label} {optional && <span className="text-muted-foreground font-normal">(Optional)</span>}
      </label>
      <Select>
        <SelectTrigger className="h-10 mt-1 bg-input/60 border-border text-[13px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {values.map((v) => (
            <SelectItem value={v} key={v} className="text-[13px]">
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

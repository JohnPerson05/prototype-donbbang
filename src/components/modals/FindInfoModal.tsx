import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FindInfoModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [tab, setTab] = useState<"id" | "pw">("id");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] border-border bg-[linear-gradient(180deg,oklch(0.16_0.025_260/0.98),oklch(0.12_0.02_260/0.99))] p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-6 pb-0 text-left space-y-0">
          <DialogTitle className="text-[20px] font-bold leading-none tracking-tight">Find Info</DialogTitle>
        </DialogHeader>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-5 top-5 text-primary/90 hover:text-primary transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 pt-4 pb-6">
          {/* Tabs */}
          <div className="flex items-center border-b border-border mb-5">
            <button
              onClick={() => setTab("id")}
              className={`px-6 pb-2.5 pt-1 text-[14px] font-semibold border-b-2 -mb-px transition
                ${tab === "id" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}
            >
              Find Username
            </button>
            <button
              onClick={() => setTab("pw")}
              className={`px-6 pb-2.5 pt-1 text-[14px] font-semibold border-b-2 -mb-px transition
                ${tab === "pw" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}
            >
              Find Password
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Section 01 */}
            <section>
              <h3 className="text-[14px] font-bold">
                <span className="text-primary">01.</span> Verify Identity
              </h3>
              <div className="mt-2.5 space-y-2">
                <Select defaultValue="phone">
                  <SelectTrigger className="h-10 bg-input/60 border-border text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone" className="text-[13px]">Mobile Phone Verification</SelectItem>
                    <SelectItem value="email" className="text-[13px]">Email Verification</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <div className="relative">
                    <Input placeholder="Enter phone number (including area code)" className="h-10 bg-input/60 border-border text-[13px] pr-6" />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-[11px]">*</span>
                  </div>
                  <Button className="btn-neon border-0 h-10 px-4 text-[12px] font-semibold">Send Code</Button>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <div className="relative">
                    <Input placeholder="Enter verification code" className="h-10 bg-input/60 border-border text-[13px] pr-6" />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-[11px]">*</span>
                  </div>
                  <Button variant="outline" className="h-10 border-border bg-secondary/30 px-5 text-[12px] font-semibold">Verify</Button>
                </div>
              </div>
            </section>

            {/* Section 02 */}
            <section className="pt-3 border-t border-border">
              <h3 className="text-[14px] font-bold">
                <span className="text-primary">02.</span> Anti-bot Verification
              </h3>
              <div className="grid grid-cols-[auto_1fr] gap-2 mt-2.5 items-center">
                <div className="flex items-center gap-2">
                  <div className="h-10 px-4 rounded-md border border-border bg-[oklch(0.1_0.01_260)] flex items-center justify-center font-display font-bold text-[18px] tracking-[0.22em] select-none min-w-[120px]">
                    379169
                  </div>
                  <div className="flex flex-col gap-1">
                    <button className="text-muted-foreground hover:text-foreground text-[12px] leading-none">🔊</button>
                    <button className="text-muted-foreground hover:text-foreground"><RefreshCw className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="relative">
                  <Input placeholder="Enter anti-bot code" className="h-10 bg-input/60 border-border text-[13px] pr-6" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-[11px]">*</span>
                </div>
              </div>
            </section>

            <Button className="w-full h-11 btn-neon border-0 text-[14px] font-semibold">Confirm</Button>

            <div className="panel p-3 border-primary/40 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[oklch(0.65_0.18_230)]/20 border border-[oklch(0.65_0.18_230)] flex items-center justify-center shrink-0">
                <Send className="w-4 h-4 text-[oklch(0.7_0.2_240)]" />
              </div>
              <div className="text-[12px] leading-tight">
                <div className="text-muted-foreground">Need more help?</div>
                <div className="text-[13px] font-semibold">
                  Contact us via <span className="text-[oklch(0.7_0.2_240)]">Telegram</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

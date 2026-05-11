import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bold, Check, FileText, Image, Italic, Link2, List, ListOrdered, Smile, Underline, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/store/app";

type Phase = "form" | "done";

export function CreatePostModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const addPost = useApp((s) => s.addPost);
  const [phase, setPhase] = useState<Phase>("form");
  const [board, setBoard] = useState<"free" | "info">("free");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const close = (v: boolean) => {
    onOpenChange(v);
    if (!v)
      setTimeout(() => {
        setPhase("form");
        setTitle("");
        setContent("");
      }, 200);
  };

  const submit = () => {
    if (!title.trim()) return;
    addPost({
      id: Date.now(),
      category: board === "free" ? "Free" : "Info",
      title: title.trim(),
      author: "GAMER01",
      comments: 0,
      views: 0,
      date: new Date().toISOString().slice(5, 10).replace("-", "."),
      badge: "NEW",
    });
    setPhase("done");
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[540px] border-border bg-[linear-gradient(180deg,oklch(0.16_0.025_260/0.98),oklch(0.12_0.02_260/0.99))] p-0 overflow-hidden gap-0">
        <button
          onClick={() => close(false)}
          className="absolute right-5 top-5 text-primary/90 hover:text-primary z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {phase === "form" && (
            <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
              <h2 className="text-[18px] font-bold tracking-tight mb-4">CREATE POST</h2>

              <section className="mb-4">
                <div className="text-[12px] font-bold mb-2">
                  <span className="text-primary">1.</span> BOARD SELECTION
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBoard("free")}
                    className={`h-10 rounded-md text-[12px] font-bold tracking-wide transition ${
                      board === "free" ? "btn-neon border-0" : "bg-secondary/40 border border-border hover:bg-accent"
                    }`}
                  >
                    FREE BOARD
                  </button>
                  <button
                    onClick={() => setBoard("info")}
                    className={`h-10 rounded-md text-[12px] font-bold tracking-wide transition ${
                      board === "info" ? "btn-neon border-0" : "bg-secondary/40 border border-border hover:bg-accent"
                    }`}
                  >
                    INFO BOARD
                  </button>
                </div>
              </section>

              <section className="mb-4">
                <div className="text-[12px] font-bold mb-2">
                  <span className="text-primary">2.</span> TITLE
                </div>
                <div className="relative">
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                    placeholder="Enter a title (max 100 characters)"
                    className="h-10 bg-input/60 border-border pr-14"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                    {title.length}/100
                  </span>
                </div>
              </section>

              <section className="mb-4">
                <div className="text-[12px] font-bold mb-2">
                  <span className="text-primary">3.</span> CONTENT
                </div>
                <div className="rounded-md border border-border bg-input/60">
                  <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border">
                    {[Bold, Italic, Underline, Link2, List, ListOrdered, Link2, Image, Smile].map((Icon, i) => (
                      <button
                        key={i}
                        className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value.slice(0, 5000))}
                      placeholder="Write your content here."
                      className="h-[140px] border-0 bg-transparent resize-none focus-visible:ring-0 shadow-none"
                    />
                    <span className="absolute bottom-2 right-3 text-[11px] text-muted-foreground">
                      {content.length}/5000
                    </span>
                  </div>
                </div>
              </section>

              <section className="mb-4">
                <div className="text-[12px] font-bold mb-2 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-primary" /> ATTACH FILES
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="h-9 px-3 rounded-md bg-secondary/40 border border-border text-[11.5px] font-semibold hover:bg-accent">
                    CHOOSE FILE
                  </button>
                  <span className="text-[11.5px] text-muted-foreground">No file selected.</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">0 / 5 files (max 5MB each)</span>
                </div>
                <p className="text-[11px] text-primary mt-1.5">Files up to 5MB are allowed.</p>
              </section>

              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  variant="outline"
                  onClick={() => close(false)}
                  className="h-10 border-border bg-secondary/40 text-[13px] font-semibold"
                >
                  CANCEL
                </Button>
                <Button onClick={submit} className="h-10 btn-neon border-0 text-[13px] font-semibold">
                  POST
                </Button>
              </div>
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="d"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-10 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-success/15 border border-success flex items-center justify-center shadow-[0_0_30px_oklch(0.7_0.2_145/0.45)]">
                <Check className="w-8 h-8 text-success" strokeWidth={3} />
              </div>
              <h3 className="text-[18px] font-bold mt-4 tracking-tight">
                Your post has been <span className="text-primary">created!</span>
              </h3>
              <p className="text-muted-foreground text-[12px] mt-1">Your post was submitted successfully.</p>
              <Button
                onClick={() => close(false)}
                className="h-10 mt-5 btn-neon border-0 px-7 text-[13px] font-semibold"
              >
                CLOSE
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

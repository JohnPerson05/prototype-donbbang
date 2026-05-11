import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-[1500px] mx-auto px-6 py-6 flex gap-5">
        <LeftSidebar />
        <main className="flex-1 min-w-0 space-y-5">{children}</main>
        <RightSidebar />
      </div>
    </div>
  );
}

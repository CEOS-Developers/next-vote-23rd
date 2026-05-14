"use client";

import { useState } from "react";
import { Part } from "@/constants/teams";

export default function Signup() {
  const [part, setPart] = useState<Part>("frontend");

  return (
    <main className="flex flex-col gap-3.5 w-[550px]">
      <p className="text-[20px] font-extrabold leading-[135%] tracking-[-0.02px] py-3 border-b mb-5">
        SIGNUP
      </p>

      <div className="flex">
        {(["frontend", "backend"] as const).map((p, idx) => {
          const selected = part === p;
          const rounded = idx === 0 ? "rounded-l-[12px]" : "rounded-r-[12px]";
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPart(p)}
              className={`w-[275px] h-[51px] border border-black text-label2 cursor-pointer transition-colors ${rounded} ${
                selected ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {p === "frontend" ? "FRONT - END" : "BACK - END"}
            </button>
          );
        })}
      </div>
    </main>
  );
}

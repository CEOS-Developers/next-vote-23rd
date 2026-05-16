"use client";

import { useState } from "react";
import { TEAM_NAMES, TeamName } from "@/constants/teams";

export default function VotingDemoday() {
  const [selected, setSelected] = useState<TeamName | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFFFF] via-[#D2E6FD] to-[#FFFFFF] flex flex-col pt-[12.75rem] pl-[21.75rem]">
      <ul className="flex flex-col items-start gap-12">
        {TEAM_NAMES.map((team) => (
          <li key={team}>
            <button
              type="button"
              onClick={() => setSelected(team)}
              className="relative text-label1 cursor-pointer px-6 py-2"
            >
              {selected === team && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-[#AAD2FF] blur-[10px] pointer-events-none" />
              )}
              <span className="relative">{team}</span>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import Chip from "@/components/common/Chip";
import { backendVoteRankings } from "@/data/members";

const page = () => {
  const searchParams = useSearchParams();
  const selectedMember = searchParams.get("selected");

  const updatedRankings = backendVoteRankings
    .map(item => ({
      ...item,
      voteCount: item.label === selectedMember ? item.voteCount + 1 : item.voteCount,
    }))
    .sort((a, b) => b.voteCount - a.voteCount)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

  return (
    <div className="min-h-screen bg-white px-2 pt-21">
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb mb-2 text-purple-50 md:mb-3">
          현재 백엔드 파트장 투표 순위
        </h1>

        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3 md:gap-x-8">
          {updatedRankings.map(item => (
            <div key={item.rank} className="flex min-w-max items-center gap-3">
              <span className="text-body1-sb md:text-heading1-sb text-purple-50">{item.rank}</span>

              <Chip
                label={item.label}
                voteCount={item.voteCount}
                isSelected={selectedMember === item.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

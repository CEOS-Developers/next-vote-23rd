"use client";

import { useParams, useSearchParams } from "next/navigation";
import Chip from "@/components/common/Chip";
import { backendVoteRankings, frontendVoteRankings } from "@/data/members";

const rankingConfigs = {
  frontend: {
    title: "현재 프론트엔드 파트장 투표 순위",
    rankings: frontendVoteRankings,
  },
  backend: {
    title: "현재 백엔드 파트장 투표 순위",
    rankings: backendVoteRankings,
  },
} as const;

type LeaderPart = keyof typeof rankingConfigs;

const page = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const part = params.part as LeaderPart;
  const rankingConfig = rankingConfigs[part];

  const selectedMember = searchParams.get("selected");

  const updatedRankings = rankingConfig.rankings
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
          {rankingConfig.title}
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

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import AppHeader from "@/components/AppHeader";
import Button from "@/components/common/Button";
import { CompleteBadge } from "@/components/common/CompleteBadge";
import { resetVotePoll, submitVote } from "@/services/vote";
import type { VotePoll, VoteResultItem } from "@/types/vote";

interface VoteClientProps {
  initialPoll: VotePoll;
}

export default function VoteClient({ initialPoll }: VoteClientProps) {
  const router = useRouter();
  const [poll, setPoll] = useState<VotePoll>(initialPoll);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const totalVotes = useMemo(
    () => Object.values(poll.results).reduce((total, vote) => total + vote, 0),
    [poll.results],
  );

  const resultItems = useMemo<VoteResultItem[]>(
    () =>
      poll.candidates.map((candidate) => {
        const count = poll.results[candidate.id] ?? 0;

        return {
          ...candidate,
          count,
          percentage: totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0,
          isVotedCandidate: poll.votedCandidateId === candidate.id,
        };
      }),
    [poll.candidates, poll.results, poll.votedCandidateId, totalVotes],
  );

  const handleVoteButtonClick = async () => {
    if (poll.votedCandidateId) {
      setPoll(await resetVotePoll(poll));
      setSelectedId(null);
      return;
    }

    if (!selectedId) {
      return;
    }

    setPoll(await submitVote(poll, selectedId));
  };

  return (
    <div className="app-page">
      <div className="app-container app-page-stack">
        <AppHeader />

        <main className="vote-main">
          <section className="candidate-list scrollbar-hidden">
            {poll.candidates.map((candidate) => (
              <article
                key={candidate.id}
                className="candidate-card card-surface card-hover rounded-20"
              >
                <div className="candidate-card-shell">
                  <div className="candidate-card-content">
                    <div className="flex flex-col items-center gap-2.5">
                      <div className="flex items-end justify-center gap-1">
                        <h2 className="text-t20-semibold text-center text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
                          {candidate.name}
                        </h2>
                      </div>
                      <div className="candidate-image-frame">
                        <Image
                          src={candidate.imageUrl}
                          alt={`${candidate.name} 프로필`}
                          width={420}
                          height={318}
                          quality={100}
                          className={`h-full w-full object-cover ${
                            candidate.imageClassName ?? ""
                          }`}
                          priority
                        />
                      </div>
                    </div>

                    <Button
                      label="프로필 보기"
                      styleType="secondary"
                      size="large"
                      className="w-full self-stretch max-[863px]:px-2 max-[863px]:py-2"
                      onClick={() =>
                        router.push(`/profile?candidate=${candidate.id}`)
                      }
                    />
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="card-surface flex flex-col items-start self-stretch overflow-hidden rounded-20">
            <div className="flex flex-col items-start gap-2.5 self-stretch bg-background-contents-assistive px-6">
              <div className="flex items-center self-stretch border-b-[0.75px] border-line-neutral-strong px-2 py-5">
                <div className="vote-option-anchor">
                  <p className="text-b16-semibold overflow-hidden text-ellipsis whitespace-nowrap text-gray-4 [font-feature-settings:'liga'_off,'clig'_off]">
                    {poll.title}
                  </p>
                </div>
              </div>
            </div>

            {poll.votedCandidateId ? (
              <VoteResultList items={resultItems} />
            ) : (
              <VoteOptionList
                poll={poll}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            )}

            <div className="vote-card-actions">
              <Button
                label={poll.votedCandidateId ? "다시 투표하기" : "투표하기"}
                size="large"
                className="flex-1"
                onClick={handleVoteButtonClick}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

interface VoteOptionListProps {
  poll: VotePoll;
  selectedId: string | null;
  onSelect: (candidateId: string) => void;
}

function VoteOptionList({ poll, selectedId, onSelect }: VoteOptionListProps) {
  return (
    <div className="flex flex-col items-start gap-2.5 self-stretch bg-background-contents-default-white px-6">
      {poll.candidates.map((candidate) => {
        const isSelected = selectedId === candidate.id;

        return (
          <button
            key={candidate.id}
            type="button"
            className="flex cursor-pointer items-center self-stretch px-2 py-4 text-left"
            onClick={() => onSelect(candidate.id)}
          >
            <span className="vote-option-anchor">
              {isSelected ? (
                <CompleteBadge />
              ) : (
                <span
                  className="h-6 w-6 shrink-0 rounded-full border-[2px] border-gray-3"
                  aria-hidden="true"
                />
              )}

              <span className="vote-label-pair">
                <span className="text-b16-semibold overflow-hidden text-ellipsis whitespace-nowrap text-gray-6 [font-feature-settings:'liga'_off,'clig'_off]">
                  {candidate.name}
                </span>
                <span className="text-b16-semibold overflow-hidden text-ellipsis whitespace-nowrap text-gray-5 [font-feature-settings:'liga'_off,'clig'_off]">
                  {poll.results[candidate.id] ?? 0}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface VoteResultListProps {
  items: VoteResultItem[];
}

function VoteResultList({ items }: VoteResultListProps) {
  return (
    <div className="flex flex-col items-start gap-2.5 self-stretch bg-background-contents-default-white px-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-start gap-2.5 self-stretch bg-background-contents-default-white"
        >
          <div className="flex items-center self-stretch px-2 py-4">
            <div className="flex flex-1 items-center gap-2.5">
              {item.isVotedCandidate ? (
                <CompleteBadge />
              ) : (
                <span
                  className="h-6 w-6 shrink-0 rounded-full border-[2px] border-gray-3"
                  aria-hidden="true"
                />
              )}

              <div className="vote-result-content">
                <div className="vote-result-line">
                  <span className="line-clamp-1 overflow-hidden text-ellipsis text-b16-semibold text-gray-6 [font-feature-settings:'liga'_off,'clig'_off]">
                    {item.name}
                  </span>
                  <span className="line-clamp-1 overflow-hidden text-ellipsis text-b16-semibold text-gray-5 [font-feature-settings:'liga'_off,'clig'_off]">
                    {item.count}
                  </span>
                  <span className="vote-result-percent text-b16-semibold [font-feature-settings:'liga'_off,'clig'_off]">
                    {item.percentage}%
                  </span>
                </div>

                <div className="vote-result-track">
                  <div
                    className={`vote-result-bar ${
                      item.isVotedCandidate ? "bg-green-primary" : "bg-gray-3"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

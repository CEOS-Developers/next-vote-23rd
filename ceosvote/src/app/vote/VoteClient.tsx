"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import { CompleteBadge } from "@/components/common/CompleteBadge";
import TextOnlyButton from "@/components/common/TextOnlyButton";
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
    <div className="min-h-screen bg-gray-1">
      <div className="app-container flex flex-col gap-[52px] pt-[10vh] pb-10">
        <header className="flex items-center justify-between self-stretch">
          <h1 className="neurimbo-head text-center text-blue-primary">
            CEOS VOTE
          </h1>

          <nav className="flex items-center justify-end gap-8">
            <TextOnlyButton
              label="투표하기"
              size="small"
              styleType="primary"
            />
            <TextOnlyButton
              label="로그아웃"
              size="small"
              styleType="secondary"
              className="text-black hover:text-black"
            />
          </nav>
        </header>

        <main className="flex flex-col items-end gap-[50px] self-stretch">
          <section className="scrollbar-hidden flex h-[350px] items-start gap-3 self-stretch overflow-x-auto overflow-y-hidden py-2">
            {poll.candidates.map((candidate) => (
              <article
                key={candidate.id}
                className="flex h-[334px] w-[312px] shrink-0 flex-col items-center justify-center gap-8 rounded-20 bg-fill-quaternary-default shadow-[0_0_24px_0_rgba(33,33,40,0.05)] transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_6px_18px_0_rgba(33,33,40,0.05)]"
              >
                <div className="flex self-stretch flex-col items-center justify-center gap-10 px-8 pt-8 pb-7">
                  <div className="flex self-stretch flex-col items-center justify-center gap-[30px]">
                    <div className="flex flex-col items-center gap-2.5">
                      <div className="flex items-end justify-center gap-1">
                        <h2 className="text-h24-bold text-center text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
                          {candidate.name}
                        </h2>
                      </div>
                      <div className="h-[159px] w-[210px] overflow-hidden rounded-[5px] bg-gray-2">
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
                      className="w-full self-stretch"
                      onClick={() => router.push(`/profile?candidate=${candidate.id}`)}
                    />
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="flex flex-col items-start self-stretch overflow-hidden rounded-20 bg-white shadow-[0_0_24px_0_rgba(33,33,40,0.05)]">
            <div className="flex flex-col items-start gap-2.5 self-stretch bg-gray-1 px-6">
              <div className="flex items-center self-stretch border-b-[0.75px] border-line-neutral-strong px-2 py-5">
                <div className="flex w-[240px] items-center gap-2.5">
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

            <div className="flex items-center justify-center gap-2.5 self-stretch bg-white px-[50px] py-5">
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
    <div className="flex flex-col items-start gap-2.5 self-stretch bg-white px-6">
      {poll.candidates.map((candidate) => {
        const isSelected = selectedId === candidate.id;

        return (
          <button
            key={candidate.id}
            type="button"
            className="flex cursor-pointer items-center self-stretch px-2 py-4 text-left"
            onClick={() => onSelect(candidate.id)}
          >
            <span className="flex w-[240px] items-center gap-2.5">
              {isSelected ? (
                <CompleteBadge />
              ) : (
                <span
                  className="h-6 w-6 shrink-0 rounded-full border-[2px] border-gray-3"
                  aria-hidden="true"
                />
              )}

              <span className="flex items-center gap-[5px]">
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
    <div className="flex flex-col items-start gap-2.5 self-stretch bg-white px-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-start gap-2.5 self-stretch bg-white"
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

              <div className="flex flex-1 flex-col items-start justify-center gap-[5px]">
                <div className="flex items-start gap-[5px] self-stretch">
                  <span className="line-clamp-1 overflow-hidden text-ellipsis text-b16-semibold text-gray-6 [font-feature-settings:'liga'_off,'clig'_off]">
                    {item.name}
                  </span>
                  <span className="line-clamp-1 overflow-hidden text-ellipsis text-b16-semibold text-gray-5 [font-feature-settings:'liga'_off,'clig'_off]">
                    {item.count}
                  </span>
                  <span className="h-[21px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-right text-b16-semibold text-gray-6 [font-feature-settings:'liga'_off,'clig'_off]">
                    {item.percentage}%
                  </span>
                </div>

                <div className="h-[9px] self-stretch rounded-[10px] bg-gray-2">
                  <div
                    className={`h-full rounded-[10px] ${
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

export interface VoteCandidate {
  id: string;
  name: string;
  imageUrl: string;
  imageClassName?: string;
}

export interface VotePoll {
  id: string;
  title: string;
  candidates: VoteCandidate[];
  results: Record<string, number>;
  votedCandidateId: string | null;
}

export interface VoteResultItem extends VoteCandidate {
  count: number;
  percentage: number;
  isVotedCandidate: boolean;
}

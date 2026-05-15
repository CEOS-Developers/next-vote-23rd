import VoteClient from "@/app/vote/VoteClient";
import { getVotePoll } from "@/services/vote";

export default async function VotePage() {
  const initialPoll = await getVotePoll();

  return <VoteClient initialPoll={initialPoll} />;
}

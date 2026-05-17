import type { CandidateProfile } from "@/types/profile";
import profiles from "@/data/profiles.json";

const profileData = profiles satisfies CandidateProfile[];

export async function getCandidateProfile(
  candidateId = "pororo",
): Promise<CandidateProfile> {
  return (
    profileData.find((profile) => profile.id === candidateId) ?? profileData[0]
  );
}

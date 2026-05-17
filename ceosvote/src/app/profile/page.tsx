import ProfileClient from "@/app/profile/ProfileClient";
import { getCandidateProfile } from "@/services/profile";

interface ProfilePageProps {
  searchParams?: Promise<{
    candidate?: string;
  }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const params = await searchParams;
  const profile = await getCandidateProfile(params?.candidate);

  return <ProfileClient profile={profile} />;
}

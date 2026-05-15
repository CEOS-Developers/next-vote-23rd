"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import IconOnlyButton from "@/components/common/IconOnlyButton";
import type { CandidateProfile } from "@/types/profile";

interface ProfileClientProps {
  profile: CandidateProfile;
}

export default function ProfileClient({ profile }: ProfileClientProps) {
  const router = useRouter();

  return (
    <div className="app-page">
      <div className="app-container app-page-stack items-start max-[863px]:items-center">
        <AppHeader />

        <section className="profile-card card-surface rounded-20">
            <div className="profile-close-slot">
              <IconOnlyButton onClick={() => router.push("/vote")} />
            </div>

            <div className="profile-top">
              <div className="profile-media-info">
                <div className="profile-image-frame">
                  <Image
                    src={profile.imageUrl}
                    alt={`${profile.name} 프로필`}
                    width={636}
                    height={482}
                    quality={100}
                    className={`h-full w-full object-cover ${
                      profile.imageClassName ?? ""
                    }`}
                    priority
                  />
                </div>

                <div className="profile-info">
                  <div className="flex items-center gap-1">
                    <h2 className="text-h24-bold text-gray-9 [font-feature-settings:'liga'_off,'clig'_off] max-[863px]:text-h28-bold">
                      {profile.name}
                    </h2>
                  </div>

                  <div className="flex flex-col items-start gap-[5px]">
                    <ProfileField label="종족:" value={profile.species} />
                    <ProfileField label="성별:" value={profile.gender} />
                    <ProfileField label="사는 곳:" value={profile.home} />
                    <ProfileField label="친한 친구:" value={profile.friends} />
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-detail">
              <h3 className="text-t20-semibold mobile-text-b16-semibold text-center text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
                상세 정보:
              </h3>
              <p className="self-stretch text-t20-reg-loose mobile-text-b16-med text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
                {profile.description}
              </p>
            </div>
        </section>
      </div>
    </div>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="flex items-start gap-1">
      <span className="shrink-0 text-t20-semibold mobile-text-b16-semibold text-left text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
        {label}
      </span>
      <span className="min-w-0 flex-1 text-left text-t20-reg-loose mobile-text-b16-med text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
        {value}
      </span>
    </div>
  );
}

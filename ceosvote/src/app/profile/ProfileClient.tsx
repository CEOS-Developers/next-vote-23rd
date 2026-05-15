"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import IconOnlyButton from "@/components/common/IconOnlyButton";
import TextOnlyButton from "@/components/common/TextOnlyButton";
import type { CandidateProfile } from "@/types/profile";

interface ProfileClientProps {
  profile: CandidateProfile;
}

export default function ProfileClient({ profile }: ProfileClientProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-1">
      <div className="app-container flex flex-col items-start gap-[50px] pt-[10vh] pb-10">
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

        <section className="relative flex flex-1 flex-col items-center gap-[30px] self-stretch rounded-20 bg-white px-8 pt-8 pb-7 shadow-[0_0_24px_0_rgba(33,33,40,0.05)]">
            <div className="absolute top-8 right-8">
              <IconOnlyButton onClick={() => router.push("/vote")} />
            </div>

            <div className="flex items-start justify-center gap-10 self-stretch">
              <div className="flex flex-1 items-center gap-[30px] pr-[70px]">
                <div className="flex h-[241px] w-[318px] items-center gap-2.5 overflow-hidden rounded-[5px]">
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

                <div className="flex flex-col items-start justify-center gap-[30px]">
                  <div className="flex items-center gap-1">
                    <h2 className="text-h24-bold text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
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

            <div className="flex flex-col items-start justify-center gap-1 self-stretch">
              <h3 className="text-t20-semibold text-center text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
                상세 정보:
              </h3>
              <p className="self-stretch text-t20-reg leading-[160%] text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
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
    <div className="flex items-center gap-1">
      <span className="text-t20-semibold text-center text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
        {label}
      </span>
      <span className="text-t20-reg leading-[160%] text-center text-gray-9 [font-feature-settings:'liga'_off,'clig'_off]">
        {value}
      </span>
    </div>
  );
}

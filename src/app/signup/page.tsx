"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import Button from "@/components/common/Button";
import CTA from "@/components/common/CTA";
import DropDown from "@/components/common/DropDown";
import InputField from "@/components/common/InputField";
import Modal from "@/components/common/Modal";
import TabToggle from "@/components/common/TabToggle";
import { EMAIL_REGEX, ID_REGEX } from "@/constants/regex";
import { FIELDS, NAME_MAP, TABS, TEAM_OPTIONS } from "@/constants/signup";
import { SignupFormValues, signupSchema } from "@/constants/signupSchema";

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("FE");
  const [team, setTeam] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const idValue = useWatch({ control, name: "id", defaultValue: "" });
  const emailValue = useWatch({ control, name: "email", defaultValue: "" });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setTeam("");
    setName("");
    reset();
  };

  const handleTeamChange = (value: string) => {
    setTeam(value);
    setName("");
    reset();
  };

  const handleNameChange = (value: string) => {
    setName(value);
    reset();
  };

  const nameOptions = (NAME_MAP[team]?.[activeTab] ?? []).map(n => ({ label: n, value: n }));

  const onSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal
          buttons="single"
          title="회원가입이 완료되었습니다."
          description="환영합니다! 로그인 후 투표를 진행해보세요."
          rightLabel="로그인하러 가기"
          onConfirm={() => router.push("/login")}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 pb-8">SIGNUP</h1>
      <div className="flex flex-col gap-3 pb-3">
        <h3 className="md:text-body2-m text-caption2-m text-black">파트 *</h3>
        <TabToggle tabs={TABS} value={activeTab} onChange={handleTabChange} />
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-1 flex-col gap-3">
          <h3 className="md:text-body2-m text-caption2-m text-black">팀명 *</h3>
          <DropDown
            options={TEAM_OPTIONS}
            value={team}
            onChange={handleTeamChange}
            placeholder="팀명"
          />
        </div>
        <div className="relative flex flex-1 flex-col gap-3">
          <h3 className="md:text-body2-m text-caption2-m text-black">이름 *</h3>
          <DropDown
            options={nameOptions}
            value={name}
            onChange={handleNameChange}
            placeholder="이름"
            disabled={!team}
          />
          {!team && (
            <p className="text-caption2-m text-gray-70 absolute top-full mt-1.5 w-full text-center">
              팀명을 먼저 선택해주세요
            </p>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10 pt-10 pb-12">
          {FIELDS.map(({ key, label, placeholder, type }) => {
            const hasCheckButton = key === "id" || key === "email";
            const isCheckDisabled =
              key === "id" ? !ID_REGEX.test(idValue) : !EMAIL_REGEX.test(emailValue);
            return (
              <div key={key} className="flex flex-row items-center justify-between">
                <label
                  htmlFor={`signup-${key}`}
                  className="md:text-body2-m text-caption2-m w-20 text-black"
                >
                  {label}
                </label>
                <div className="relative flex-1">
                  <InputField
                    id={`signup-${key}`}
                    type={type}
                    placeholder={placeholder}
                    errorMessage={errors[key as keyof SignupFormValues]?.message}
                    className={hasCheckButton ? "pr-24" : undefined}
                    {...register(key as keyof SignupFormValues)}
                  />
                  {hasCheckButton && (
                    <div className="absolute top-[45%] right-0 -translate-y-1/2">
                      <Button variant="check" disabled={isCheckDisabled}>
                        중복 확인
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <CTA label="가입하기" disabled={!team || !name} />
      </form>
    </div>
  );
};

export default Page;

"use client";

import { useState } from "react";
import clsx from "clsx";
import Icon from "@/components/common/icons/Icon";
import Button from "@/components/common/Button";

interface SignupModalProps {
  onSignup?: (email: string, password: string) => void;
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  iconType,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  iconType: "PROFILE" | "PASSWORD";
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sub14-med text-text-neutral-description">
        {label}
      </label>
      <div
        className={clsx(
          "flex items-center gap-2 border rounded-10 px-4 py-3 bg-fill-quaternary-default transition-colors",
          focused
            ? "border-fill-primary-default"
            : "border-line-neutral-default",
        )}
      >
        <Icon
          type={iconType}
          className="w-5 h-5 text-icon-neutral-assistive shrink-0"
        />
        <input
          type={type}
          className="w-full bg-transparent outline-none text-sub14-reg text-text-neutral-default placeholder:text-text-neutral-disabled"
          placeholder="내용을 입력해주세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}

export default function SignupModal({ onSignup }: SignupModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const isActive =
    email.length > 0 && password.length > 0 && confirm.length > 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background-page">
      <div className="flex flex-col items-center gap-8 bg-fill-quaternary-default rounded-20 px-10 py-10 w-[400px] shadow-modal">
        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="neurimbo-head text-fill-primary-default tracking-tight">
            CEOS VOTE
          </h1>
          <p className="neurimbo-body text-text-neutral-description">
            세오스 투표하기
          </p>
        </div>

        {/* 인풋 */}
        <div className="flex flex-col gap-4 w-full">
          <InputField
            label="이메일"
            value={email}
            onChange={setEmail}
            focused={emailFocused}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            iconType="PROFILE"
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            focused={pwFocused}
            onFocus={() => setPwFocused(true)}
            onBlur={() => setPwFocused(false)}
            iconType="PASSWORD"
          />
          <InputField
            label="비밀번호 확인"
            type="password"
            value={confirm}
            onChange={setConfirm}
            focused={confirmFocused}
            onFocus={() => setConfirmFocused(true)}
            onBlur={() => setConfirmFocused(false)}
            iconType="PASSWORD"
          />
        </div>

        {/* 버튼 */}
        <Button
          label="회원가입"
          styleType="tertiary"
          size="large"
          active={isActive}
          className="w-full justify-center"
          onClick={() => onSignup?.(email, password)}
        />
      </div>
    </div>
  );
}

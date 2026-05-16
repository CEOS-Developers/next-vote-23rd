"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Icon from "@/components/common/icons/Icon";
import Button from "@/components/common/Button";

interface LoginModalProps {
  onLogin?: (id: string, password: string) => void;
}

export default function LoginModal({ onLogin }: LoginModalProps) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idFocused, setIdFocused] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);

  const isActive = id.length > 0 && password.length > 0;

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
        <div className="flex flex-col gap-3 w-full">
          <div
            className={clsx(
              "flex items-center gap-2 border rounded-10 px-4 py-3 bg-fill-quaternary-default transition-colors",
              idFocused
                ? "border-fill-primary-default"
                : "border-line-neutral-default",
            )}
          >
            <Icon
              type="PROFILE"
              className="w-5 h-5 text-icon-neutral-assistive shrink-0"
            />
            <input
              className="w-full bg-transparent outline-none text-sub14-reg text-text-neutral-default placeholder:text-text-neutral-disabled"
              placeholder="내용을 입력해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
              onFocus={() => setIdFocused(true)}
              onBlur={() => setIdFocused(false)}
            />
          </div>

          <div
            className={clsx(
              "flex items-center gap-2 border rounded-10 px-4 py-3 bg-fill-quaternary-default transition-colors",
              pwFocused
                ? "border-fill-primary-default"
                : "border-line-neutral-default",
            )}
          >
            <Icon
              type="PASSWORD"
              className="w-5 h-5 text-icon-neutral-assistive shrink-0"
            />
            <input
              type="password"
              className="w-full bg-transparent outline-none text-sub14-reg text-text-neutral-default placeholder:text-text-neutral-disabled"
              placeholder="내용을 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwFocused(true)}
              onBlur={() => setPwFocused(false)}
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col items-center gap-4 w-full">
          <Button
            label="로그인"
            styleType="tertiary"
            size="large"
            active={isActive}
            className="w-full justify-center"
            onClick={() => onLogin?.(id, password)}
          />
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-sub14-med text-fill-primary-default hover:opacity-70 transition-opacity"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

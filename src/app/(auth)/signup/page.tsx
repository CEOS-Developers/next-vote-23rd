"use client";

import { useEffect, useRef, useState } from "react";
import {
  Part,
  TEAM_MEMBERS,
  TEAM_NAMES,
  TeamName,
} from "@/constants/teams";

type DropdownProps = {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

function Dropdown({
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="flex items-center gap-4 relative">
      <span className="text-label1 shrink-0">{label}</span>
      <div className="flex-1 relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className="w-full h-10 border-b px-1 flex items-center justify-between cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className={value ? "text-black" : "text-gray-400"}>
            {value || placeholder}
          </span>
          <span className="text-xs">▾</span>
        </button>
        {open && options.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-1 border bg-white shadow-md z-10 max-h-60 overflow-auto">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Signup() {
  const [part, setPart] = useState<Part>("frontend");
  const [team, setTeam] = useState<TeamName | "">("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");

  const memberOptions = team ? TEAM_MEMBERS[part][team] : [];

  const EMAIL_PATTERN = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
  const isEmailValid = EMAIL_PATTERN.test(email);
  const showEmailError = email.length > 0 && !isEmailValid;

  const isPasswordMatched = password === passwordRe;
  const showPasswordError = passwordRe.length > 0 && !isPasswordMatched;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 API 연동
  };

  const handlePartChange = (next: Part) => {
    if (next === part) return;
    setPart(next);
    setTeam("");
    setName("");
  };

  const handleTeamChange = (next: string) => {
    setTeam(next as TeamName);
    setName("");
  };

  return (
    <main className="flex flex-col gap-[1.88rem] w-[550px]">
      <p className="text-[20px] font-extrabold leading-[135%] tracking-[-0.02px] py-3 border-b">
        SIGNUP
      </p>

      <div className="flex">
        {(["frontend", "backend"] as const).map((p, idx) => {
          const selected = part === p;
          const rounded = idx === 0 ? "rounded-l-[12px]" : "rounded-r-[12px]";
          return (
            <button
              key={p}
              type="button"
              onClick={() => handlePartChange(p)}
              className={`w-[275px] h-[51px] border border-black text-label2 cursor-pointer transition-colors ${rounded} ${
                selected ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {p === "frontend" ? "FRONT - END" : "BACK - END"}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            label="팀"
            value={team}
            placeholder="팀을 선택해 주세요"
            options={TEAM_NAMES as unknown as string[]}
            onChange={handleTeamChange}
          />
          <Dropdown
            label="이름"
            value={name}
            placeholder="이름을 선택해 주세요"
            options={memberOptions}
            onChange={setName}
            disabled={!team}
          />
        </div>

        <label className="flex items-center mt-[1.88rem]">
          <span className="text-label1 w-[140px] shrink-0 whitespace-nowrap">아이디</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력해 주세요"
            className="flex-1 border-b border-black outline-none p-3"
          />
        </label>

        <label className="flex items-center mt-[1.88rem]">
          <span className="text-label1 w-[140px] shrink-0 whitespace-nowrap">이메일</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해 주세요"
            className="flex-1 border-b border-black outline-none p-3"
          />
        </label>

        <p className="text-label2 text-red-500 py-2 ml-[140px] pl-3">
          {showEmailError ? "이메일 형식이 올바르지 않습니다" : " "}
        </p>

        <label className="flex items-center">
          <span className="text-label1 w-[140px] shrink-0 whitespace-nowrap">비밀번호</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
            className="flex-1 border-b border-black outline-none p-3"
          />
        </label>

        <label className="flex items-center mt-[1.88rem]">
          <span className="text-label1 w-[140px] shrink-0 whitespace-nowrap">비밀번호 재확인</span>
          <input
            type="password"
            value={passwordRe}
            onChange={(e) => setPasswordRe(e.target.value)}
            placeholder="비밀번호를 다시 입력해 주세요"
            className="flex-1 border-b border-black outline-none p-3"
          />
        </label>

        <p className="text-label2 text-red-500 py-2 ml-[140px] pl-3">
          {showPasswordError ? "비밀번호가 일치하지 않습니다" : " "}
        </p>

        <button
          type="submit"
          className="w-full py-4 bg-black text-white text-label1 cursor-pointer mt-[0.69rem]"
        >
          회원가입하기
        </button>
      </form>
    </main>
  );
}

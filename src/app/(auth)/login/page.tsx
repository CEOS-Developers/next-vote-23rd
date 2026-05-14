import Link from "next/link";
import z from "zod";

export default function Login() {
  return (
    <main className="flex flex-col gap-3.5 w-137.5">
      <p className="text-heading1 py-3 border-b mb-5">LOGIN</p>
      <input
        type="text"
        className="border h-12 outline-none px-2"
        placeholder="아이디를 입력해주세요."
      />
      <input
        type="password"
        className="border h-12 outline-none px-2"
        placeholder="비밀번호를 입력해주세요."
      />
      <button className="border h-16 bg-black text-white cursor-pointer">
        로그인 하기
      </button>
      <button className="cursor-pointer underline text-gray-500">
        아직 계정이 없나요? 회원 가입 하러 가기
      </button>
    </main>
  );
}

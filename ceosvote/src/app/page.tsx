"use client"; // 클라이언트 컴포넌트 필수

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // '메인'으로 가고 싶다면 '/main' 등으로 수정
    }, 3000);

    // 컴포넌트가 사라질 때 타이머를 청소 (메모리 누수 방지)
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-screen h-screen bg-blue-primary flex flex-col justify-center items-center text-center">
      <main className="neurimbo-head text-white">
        <h1 className="animate-bounce">CEOS VOTE</h1>
        <h2 className="opacity-80">지금 투표하세요!</h2>
      </main>
    </div>
  );
}

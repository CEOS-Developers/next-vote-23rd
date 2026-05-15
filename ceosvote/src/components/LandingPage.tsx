"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.push("/vote");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-blue-primary text-center">
      <main className="neurimbo-head text-white">
        <h1 className="animate-bounce">CEOS VOTE</h1>
        <h2 className="opacity-80">지금 투표하세요!</h2>
      </main>
    </div>
  );
}

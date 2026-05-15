import Link from "next/link";

import TextOnlyButton from "@/components/common/TextOnlyButton";

export default function AppHeader() {
  return (
    <header className="app-header">
      <Link href="/main" className="neurimbo-head app-header-title">
        CEOS VOTE
      </Link>

      <nav className="app-header-nav">
        <Link href="/vote">
          <TextOnlyButton label="투표하기" size="small" styleType="primary" />
        </Link>
        <TextOnlyButton
          label="로그아웃"
          size="small"
          styleType="secondary"
          className="text-text-neutral-default hover:text-text-neutral-default"
        />
      </nav>
    </header>
  );
}

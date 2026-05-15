import TextOnlyButton from "@/components/common/TextOnlyButton";

export default function AppHeader() {
  return (
    <header className="app-header">
      <h1 className="neurimbo-head app-header-title">CEOS VOTE</h1>

      <nav className="app-header-nav">
        <TextOnlyButton label="투표하기" size="small" styleType="primary" />
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

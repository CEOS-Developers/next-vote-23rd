import Image from "next/image";
import Link from "next/link";

import AppHeader from "@/components/AppHeader";

const mainMenuItems = [
  {
    label: "투표하기",
    href: "/vote",
    iconSrc: "/ic_vote.svg",
  },
  {
    label: "ABOUT US",
    href: "#",
    iconSrc: "/ic_about-circle.svg",
  },
];

export default function MainPage() {
  return (
    <div className="app-page">
      <div className="app-container app-page-stack">
        <AppHeader />

        <main className="main-menu" aria-label="메인 메뉴">
          {mainMenuItems.map((item) => (
            <Link key={item.label} href={item.href} className="main-menu-card">
              <span className="main-menu-icon" aria-hidden="true">
                <Image src={item.iconSrc} alt="" width={24} height={24} />
              </span>

              <span className="main-menu-label text-t20-semibold">
                {item.label}
              </span>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}

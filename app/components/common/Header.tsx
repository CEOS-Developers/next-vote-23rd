import Link from "next/link";

import DitdaIcon from "@/app/assets/icons/icon_ditda_regular.svg";
import HamburgerIcon from "@/app/assets/icons/icon_hamburger_regular.svg";
import { NAV_ITEMS } from "@/app/constants/navigation";

const Header = () => {
  return (
    <header className="bg-gray-10 relative z-10 flex h-16 shrink-0 items-center justify-between px-6">
      <Link href="/">
        <DitdaIcon className="h-8.5 w-17" />
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        {NAV_ITEMS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-purple-60 text-heading1-sb transition-colors hover:underline"
          >
            {label}
          </Link>
        ))}
      </nav>
      <HamburgerIcon className="text-purple-60 size-6 cursor-pointer md:hidden" />
    </header>
  );
};

export default Header;

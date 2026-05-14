'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "VOTING", href: "#" },
  { label: "MEMBERS", href: "#" },
  { label: "ABOUT US", href: "#" },
  { label: "LOGIN", href: "/login" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row">
      <div className="flex items-center w-145 h-9 border-3 px-6 text-body1">
        2026 23TH CEOS AWARDS
      </div>
      <div className="flex items-center justify-around w-145 h-9 bg-black text-white px-7.5">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={pathname === item.href ? "text-blue-500" : "text-white"}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

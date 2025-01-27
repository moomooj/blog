"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Trand" },
    { href: "/new", label: "New" },
  ];

  return (
    <nav className="flex gap-8 border-b border-gray-200 mb-8">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`
            relative py-4 px-2
            text-lg font-medium
            transition-colors
            hover:text-gray-900
            ${pathname === href ? "text-gray-900" : "text-gray-500"}
          `}
        >
          {label}
          <span
            className={`
              absolute bottom-0 left-0
              h-0.5 bg-gray-900
              transition-all duration-300
              ${pathname === href ? "w-full" : "w-0"}
            `}
          />
        </Link>
      ))}
    </nav>
  );
}

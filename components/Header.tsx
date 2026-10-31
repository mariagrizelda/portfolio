"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <nav className="nav">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="btn btn-pink btn-sm">
          Let&apos;s talk
        </Link>
      </nav>
    </header>
  );
}

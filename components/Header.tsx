"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Bow from "./Bow";
import { nav, site } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="brand">
        <Bow />
        <div>
          <div className="brand-name">{site.name}</div>
          <div className="brand-tag">{site.tagline}</div>
        </div>
      </Link>
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Synchronise l'état React avec le thème déjà appliqué par le script anti-flash.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#ffffff" : "#0b0b0d");
    try {
      localStorage.setItem("nsj-theme", next);
    } catch {}
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`} id="header">
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="NSJ Multiservice, accueil">
          <Image
            src="/assets/logo-dark.jpeg"
            alt="NSJ Multiservice"
            width={44}
            height={44}
            className="logo__img"
            priority
          />
          <span className="logo__text">Multiservice</span>
        </Link>

        <nav
          className={`nav${navOpen ? " is-open" : ""}`}
          id="nav"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setNavOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label="Changer de thème clair/sombre"
            aria-pressed={theme === "light"}
            onClick={toggleTheme}
          >
            <svg className="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg className="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          </button>
          <Link href="/#devis" className="btn btn--primary btn--sm header__cta">
            Devis gratuit
          </Link>
          <button
            className={`nav-toggle${navOpen ? " is-open" : ""}`}
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

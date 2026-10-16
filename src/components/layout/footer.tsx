import React from "react";
import Link from "next/link";
import { Heart, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  "Play": [
    { href: "/quizzes", label: "All Quizzes" },
    { href: "/games", label: "Games" },
    { href: "/games/couples", label: "Couples" },
    { href: "/games/friends", label: "Friends" },
    { href: "/create", label: "Create a Quiz" },
  ],
  "Games": [
    { href: "/games/compatibility", label: "Compatibility" },
    { href: "/games/how-well", label: "How Well Do You Know Me?" },
    { href: "/games/likely-to", label: "Who Is More Likely To?" },
    { href: "/games/would-you-rather", label: "Would You Rather?" },
    { href: "/games/flames", label: "FLAMES" },
  ],
  "Company": [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Settings" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-[var(--color-bg-subtle)] mt-24">
      <div className="container py-12 sm:py-16">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 mb-12">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2" aria-label="Lovelle Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 shadow-md">
                <Heart className="h-5 w-5 text-white fill-white" />
              </div>
              <span className="font-display text-2xl font-bold text-gradient-brand">Lovelle</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed">
              Fun relationship quizzes and games for couples, best friends, and everyone in between.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-pink-50 text-pink-400 hover:bg-pink-100 hover:text-pink-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-pink-50 text-pink-400 hover:bg-pink-100 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                  {section}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-secondary)] hover:text-pink-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-pink-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} Lovelle. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 text-pink-500 fill-pink-500" /> for love &amp; fun
          </p>
        </div>
      </div>
    </footer>
  );
}

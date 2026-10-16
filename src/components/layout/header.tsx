"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Menu, X, Sparkles, GamepadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/quizzes", label: "Explore" },
  { href: "/games", label: "Games" },
  { href: "/create", label: "Create" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-pink-100"
            : "bg-transparent"
        )}
      >
        <div className="container">
          <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Lovelle Home"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.5 }}
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 shadow-[0_2px_10px_rgba(236,72,153,0.3)]"
              >
                <Heart className="h-5 w-5 text-white fill-white" />
              </motion.div>
              <span className="font-display text-xl font-bold text-gradient-brand">
                Lovelle
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                      pathname === link.href || pathname.startsWith(link.href + "/")
                        ? "text-pink-600 bg-pink-50"
                        : "text-[var(--color-text-secondary)] hover:text-pink-600 hover:bg-pink-50"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="primary" size="sm" asChild>
                <Link href="/quizzes">
                  <Sparkles className="h-4 w-4" />
                  Play Now
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-pink-50 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5 text-pink-600" />
                  ) : (
                    <Menu className="h-5 w-5 text-[var(--color-text-secondary)]" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl pt-safe"
            >
              <div className="flex h-16 items-center justify-between px-6 border-b border-pink-100">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-pink-600">
                    <Heart className="h-4 w-4 text-white fill-white" />
                  </div>
                  <span className="font-display text-lg font-bold text-gradient-brand">Lovelle</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-pink-50 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-pink-600" />
                </button>
              </div>

              <nav className="p-6 flex flex-col gap-2" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all",
                        pathname === link.href || pathname.startsWith(link.href + "/")
                          ? "text-pink-600 bg-pink-50"
                          : "text-[var(--color-text-secondary)] hover:text-pink-600 hover:bg-pink-50"
                      )}
                    >
                      <GamepadIcon className="h-5 w-5 text-pink-400" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  className="pt-4 mt-2 border-t border-pink-100"
                >
                  <Button variant="primary" className="w-full" asChild>
                    <Link href="/quizzes">
                      <Sparkles className="h-4 w-4" />
                      Play a Quiz
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { List, X, Moon, Sun, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Fixed Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--background)] bg-opacity-80 backdrop-blur-md border-b border-[color:var(--border)] border-opacity-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <Link href="/" className="flex items-center gap-2">
                <motion.div
                  className="h-8 w-8 rounded-lg bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)] flex items-center justify-center"
                  animate={{
                    rotateZ: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <span className="text-white font-bold text-sm">PP</span>
                </motion.div>
                <span className="hidden sm:inline text-lg font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                  ProjectPulse
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, idx) => (
                <Link key={item.label} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    whileHover={{ textDecoration: "underline" }}
                    className="px-4 py-2 text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Theme Toggle */}
              {isMounted && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-[color:var(--input)] border border-[color:var(--border)] text-[color:var(--foreground)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all"
                  title={isDark ? "Light mode" : "Dark mode"}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDark ? (
                      <Sun size={20} weight="fill" />
                    ) : (
                      <Moon size={20} weight="fill" />
                    )}
                  </motion.div>
                </motion.button>
              )}

              {/* Login Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Link href="/sign-in">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)] transition-colors cursor-pointer"
                  >
                    Login
                  </motion.div>
                </Link>
              </motion.div>

              {/* Signup Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/sign-up">
                  <motion.button className="hidden sm:flex px-6 py-2 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold text-sm items-center gap-2 group hover:shadow-lg transition-all">
                    Sign Up
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg bg-[color:var(--input)] border border-[color:var(--border)] text-[color:var(--foreground)]"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X size={24} weight="bold" />
                  ) : (
                    <List size={24} weight="bold" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={menuVariants}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3 border-t border-[color:var(--border)]">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="block px-4 py-2 text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)] transition-colors cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ))}

              <div className="flex gap-3 pt-4 border-t border-[color:var(--border)]">
                <Link href="/sign-in" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 border border-[color:var(--border)] text-[color:var(--foreground)] rounded-lg font-semibold text-sm hover:bg-[color:var(--card)] transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </motion.button>
                </Link>

                <Link href="/sign-up" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  );
}

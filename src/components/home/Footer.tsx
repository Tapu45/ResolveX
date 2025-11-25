"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  LinkedinLogo,
  TwitterLogo,
  GithubLogo,
  EnvelopeOpen,
  ArrowRight,
  Heart,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.34, 1.56, 0.64, 1),
      },
    },
  };

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Security", href: "#security" },
        { name: "Roadmap", href: "#roadmap" },
        { name: "Download", href: "#download" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Press Kit", href: "/press" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "/api" },
        { name: "Community", href: "/community" },
        { name: "Support", href: "/support" },
        { name: "Status", href: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
        { name: "Compliance", href: "/compliance" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <LinkedinLogo size={20} weight="fill" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: <TwitterLogo size={20} weight="fill" />,
      href: "https://twitter.com",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: <GithubLogo size={20} weight="fill" />,
      href: "https://github.com",
      label: "GitHub",
      color: "hover:text-gray-600 dark:hover:text-gray-300",
    },
  ];

  return (
    <footer className="relative w-full bg-[color:var(--background)] border-t border-[color:var(--border)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="none"
        >
          <defs>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Subtle gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.05,
          }}
          animate={{
            y: [0, 30, 0],
            transition: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.05,
          }}
          animate={{
            y: [0, -30, 0],
            transition: {
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-[color:var(--border)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Newsletter info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-3">
                Stay Updated
              </h3>
              <p className="text-[color:var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
                Get the latest updates on new features, tips, and best practices
                delivered to your inbox. Unsubscribe anytime.
              </p>
            </motion.div>

            {/* Newsletter form */}
            <motion.form
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-[color:var(--input)] border border-[color:var(--border)] text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] text-sm focus:outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-opacity-20 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold flex items-center justify-center gap-2 group hover:shadow-lg transition-all whitespace-nowrap"
              >
                Subscribe
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Main footer content */}
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12">
            {/* Brand section */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 sm:col-span-1"
            >
              <div className="mb-6">
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  whileHover={{ x: 4 }}
                >
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
                  <span className="text-lg font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent">
                    ProjectPulse
                  </span>
                </motion.div>

                <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed max-w-xs">
                  Enterprise-grade complaint management powered by AI. Transform
                  your support workflows today.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    title={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + idx * 0.1,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg bg-[color:var(--input)] text-[color:var(--muted-foreground)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer sections */}
            {footerSections.map((section, sectionIdx) => (
              <motion.div key={sectionIdx} variants={itemVariants}>
                <h4 className="text-sm font-bold text-[color:var(--foreground)] mb-4 uppercase tracking-widest">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <motion.li
                      key={linkIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + linkIdx * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <Link href={link.href}>
                        <motion.div
                          whileHover={{ x: 4, color: "var(--primary)" }}
                          className="text-sm text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)] transition-all inline-flex items-center gap-1 group cursor-pointer"
                        >
                          {link.name}
                          <motion.span
                            className="opacity-0 group-hover:opacity-100"
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                            }}
                          >
                            <ArrowRight size={12} weight="bold" />
                          </motion.span>
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-[color:var(--border)] to-transparent mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          {/* Bottom section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {/* Copyright and badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[color:var(--muted-foreground)]"
            >
              <div className="flex items-center gap-2">
                <span>© 2024 ProjectPulse</span>
                <span className="text-[color:var(--border)]">•</span>
                <span>All rights reserved</span>
              </div>

              {/* Compliance badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-[color:var(--card)] border border-[color:var(--border)]">
                  <span>🔒 SOC 2</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-[color:var(--card)] border border-[color:var(--border)]">
                  <span>🛡️ HIPAA</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-[color:var(--card)] border border-[color:var(--border)]">
                  <span>🌍 GDPR</span>
                </div>
              </div>
            </motion.div>

            {/* Made with love */}
            <motion.div
              variants={itemVariants}
              className="text-xs text-[color:var(--muted-foreground)] flex items-center gap-2"
            >
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  size={16}
                  weight="fill"
                  className="text-[color:var(--destructive)]"
                />
              </motion.div>
              <span>by the ProjectPulse team</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Status bar */}
        <motion.div
          className="border-t border-[color:var(--border)] bg-[color:var(--card)] bg-opacity-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[color:var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <motion.div
                className="h-2 w-2 rounded-full bg-[color:var(--secondary)]"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(var(--secondary), 0.7)",
                    "0 0 0 6px rgba(var(--secondary), 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <span>All systems operational</span>
            </div>

            <motion.a
              href="https://status.projectpulse.io"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              className="flex items-center gap-1 text-[color:var(--primary)] hover:text-[color:var(--secondary)] transition-colors group"
            >
              View status page
              <ArrowRight
                size={12}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

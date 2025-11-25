"use client";

import { motion, cubicBezier } from "framer-motion";
import { ArrowRight, Sparkle, Book as Zap } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/NavbarH";

export default function Hero() {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.34, 1.56, 0.64, 1),
      },
    },
  };

  // Floating background motion
  const floatingVariants = {
    floating: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: cubicBezier(0.42, 0, 0.58, 1),
      },
    },
  };

  // Pulse animation for gradient headline
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: cubicBezier(0.42, 0, 0.58, 1),
      },
    },
  };

  return (
    <>
    <Navbar />
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[color:var(--background)] via-[color:var(--background)] to-[color:var(--card)] dark:from-[color:var(--background)] dark:via-[color:var(--background)] dark:to-[color:var(--card)]">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Orb 1 */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--primary), transparent 70%)",
              opacity: 0.15,
            }}
            animate={floatingVariants.floating}
          />

          {/* Orb 2 */}
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--secondary), transparent 70%)",
              opacity: 0.1,
            }}
            animate={{
              y: [0, 30, 0],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, var(--border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--border) 1px, transparent 1px)
            `,
              backgroundSize: "100px 100px",
              opacity: 0.03,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl w-full text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--secondary)] bg-opacity-10 border border-[color:var(--secondary)] border-opacity-20 backdrop-blur-sm">
                <Sparkle
                  size={16}
                  weight="fill"
                  className="text-[color:var(--primary)]"
                />
                <span className="text-sm font-medium text-[color:var(--foreground)]">
                  AI-Powered Complaint Management
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-[color:var(--foreground)]">
                Transform Chaos Into
              </span>
              <br />
              <span className="relative inline-block">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-[color:var(--primary)] bg-clip-text text-transparent"
                  animate={pulseVariants.pulse}
                >
                  Clarity & Action
                </motion.span>
                <span className="bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-[color:var(--primary)] bg-clip-text text-transparent">
                  Clarity & Action
                </span>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed"
            >
              ProjectPulse harnesses intelligent automation to route, resolve,
              and analyze complaints with unprecedented speed. Enterprise-grade
              security meets AI sophistication.
            </motion.p>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2 text-[color:var(--foreground)]">
                <Zap
                  size={18}
                  weight="fill"
                  className="text-[color:var(--primary)]"
                />
                <span>Real-time AI Assignment</span>
              </div>

              <div className="hidden sm:flex w-px h-6 bg-[color:var(--border)]" />

              <div className="flex items-center gap-2 text-[color:var(--foreground)]">
                <Sparkle
                  size={18}
                  weight="fill"
                  className="text-[color:var(--secondary)]"
                />
                <span>Smart Analytics</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 bg-[color:var(--primary)] hover:bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold group"
                >
                  Start Free Trial
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 border-[color:var(--border)] text-[color:var(--foreground)] hover:bg-[color:var(--card)] rounded-lg font-semibold"
                >
                  View Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-[color:var(--border)]"
            >
              <p className="text-sm text-[color:var(--muted-foreground)] mb-4">
                Trusted by innovative teams worldwide
              </p>

              <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
                {["Enterprise Grade", "GDPR Compliant", "99.9% Uptime"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs font-medium text-[color:var(--foreground)]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--primary)]" />
                      {item}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[color:var(--muted-foreground)]">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border border-[color:var(--border)] rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-[color:var(--primary)] rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

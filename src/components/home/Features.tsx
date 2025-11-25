"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  Brain,
  Lightning,
  Users,
  Lock,
  ArrowRight,
} from "@phosphor-icons/react";
import { BarChart, Zap } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  highlights: string[];
}

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.34, 1.56, 0.64, 1),
      },
    },
  };

  const headingVariants = {
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

  const features: Feature[] = [
    {
      id: "1",
      title: "AI-Powered Assignment",
      description:
        "Intelligent complaint routing based on skills, workload, and expertise. Our AI learns from every resolution to improve future assignments.",
      icon: (
        <Brain
          size={40}
          weight="fill"
          className="text-[color:var(--primary)]"
        />
      ),
      gradient: "from-[color:var(--primary)] to-blue-500",
      highlights: [
        "Skill Matching",
        "Workload Balancing",
        "Learning Algorithm",
      ],
    },
    {
      id: "2",
      title: "Real-Time Analytics",
      description:
        "Comprehensive dashboards showing resolution times, team performance, and complaint patterns. Make data-driven decisions instantly.",
      icon: (
        <BarChart
          size={40}
          height="fill"
          className="text-[color:var(--secondary)]"
        />
      ),
      gradient: "from-[color:var(--secondary)] to-lime-500",
      highlights: ["KPI Tracking", "Custom Reports", "Predictive Insights"],
    },
    {
      id: "3",
      title: "Intelligent Automation",
      description:
        "Auto-categorization, priority prediction, and sentiment analysis. Let AI handle the repetitive work so your team focuses on resolution.",
      icon: <Lightning size={40} weight="fill" className="text-amber-500" />,
      gradient: "from-amber-500 to-orange-400",
      highlights: [
        "Auto-Categorize",
        "Priority Detection",
        "Sentiment Analysis",
      ],
    },
    {
      id: "4",
      title: "Team Collaboration",
      description:
        "Real-time updates, threaded conversations, and @mentions. Keep your entire team synchronized with instant notifications and activity feeds.",
      icon: (
        <Users
          size={40}
          weight="fill"
          className="text-[color:var(--primary)]"
        />
      ),
      gradient: "from-[color:var(--primary)] to-violet-500",
      highlights: ["Live Updates", "Threaded Chat", "Activity Tracking"],
    },
    {
      id: "5",
      title: "Enterprise Security",
      description:
        "Bank-level encryption, row-level security, and GDPR compliance. Your data is protected with enterprise-grade infrastructure.",
      icon: <Lock size={40} weight="fill" className="text-red-500" />,
      gradient: "from-red-500 to-pink-500",
      highlights: ["End-to-End Encryption", "RLS Policies", "GDPR Compliant"],
    },
    {
      id: "6",
      title: "Smart Search",
      description:
        "Natural language search with semantic understanding. Find relevant complaints instantly with AI-powered context awareness.",
      icon: <Zap size={40} height="fill" className="text-cyan-500" />,
      gradient: "from-cyan-500 to-blue-400",
      highlights: ["NLP Search", "Semantic Match", "Auto-Complete"],
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] to-[color:var(--card)] dark:from-[color:var(--background)] dark:to-[color:var(--card)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.05,
          }}
          animate={{
            y: [0, -30, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.05,
          }}
          animate={{
            y: [0, 30, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-semibold text-[color:var(--primary)] mb-3 uppercase tracking-widest"
          >
            Core Capabilities
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-[color:var(--primary)] bg-clip-text text-transparent">
              Master Complaints
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            ProjectPulse combines powerful AI, real-time collaboration, and
            intelligent automation to transform your complaint management
            process.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-transparent to-[color:var(--secondary)] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />

              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all duration-300 overflow-hidden">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon container */}
                <motion.div
                  className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] group-hover:shadow-lg transition-all duration-300"
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.1,
                  }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-[color:var(--foreground)] mb-3 group-hover:text-[color:var(--primary)] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((highlight, hidx) => (
                      <motion.span
                        key={hidx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + hidx * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[color:var(--primary)] from-opacity-10 to-[color:var(--secondary)] to-opacity-10 border border-[color:var(--primary)] border-opacity-20 text-xs font-medium text-[color:var(--foreground)]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--primary)]" />
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 pt-20 border-t border-[color:var(--border)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-4">
              Ready to Transform Your Complaint Management?
            </h3>
            <p className="text-[color:var(--muted-foreground)] mb-8 text-lg">
              Join hundreds of organizations using ProjectPulse to streamline
              their complaint resolution workflow with AI-powered automation and
              real-time collaboration.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[color:var(--primary)] hover:bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold flex items-center gap-2 group transition-all"
              >
                Start Free Trial
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-[color:var(--border)] text-[color:var(--foreground)] hover:bg-[color:var(--card)] rounded-lg font-semibold transition-all"
              >
                Schedule Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

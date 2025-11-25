"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  Brain,
  MagnifyingGlass,
  GitBranch,
  ChatCircle,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import { Sparkles, TrendingUp } from "lucide-react";

interface AiCapability {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

export default function AiCapabilities() {
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

  const capabilities: AiCapability[] = [
    {
      id: "1",
      title: "Intelligent Routing",
      description:
        "AI analyzes user skills, current workload, and complaint complexity to automatically assign to the best person on your team.",
      icon: (
        <GitBranch
          size={40}
          weight="fill"
          className="text-[color:var(--primary)]"
        />
      ),
      features: ["Skill Matching", "Workload Analysis", "Smart Learning"],
      color: "from-[color:var(--primary)] to-blue-500",
    },
    {
      id: "2",
      title: "Semantic Search",
      description:
        "Find relevant complaints instantly using natural language. AI understands context and meaning, not just keywords.",
      icon: (
        <MagnifyingGlass size={40} weight="fill" className="text-cyan-500" />
      ),
      features: ["NLP Search", "Context-Aware", "Auto-Complete"],
      color: "from-cyan-500 to-blue-400",
    },
    {
      id: "3",
      title: "Auto-Categorization",
      description:
        "Machine learning instantly categorizes complaints with high accuracy. The system learns from corrections to improve over time.",
      icon: <Sparkles size={40} height="fill" className="text-amber-500" />,
      features: [
        "ML Classification",
        "Confidence Scoring",
        "Continuous Learning",
      ],
      color: "from-amber-500 to-orange-400",
    },
    {
      id: "4",
      title: "Sentiment Analysis",
      description:
        "Real-time detection of customer sentiment and urgency. Automatically escalates urgent complaints to ensure critical issues are addressed first.",
      icon: (
        <ChatCircle
          size={40}
          weight="fill"
          className="text-[color:var(--secondary)]"
        />
      ),
      features: ["Real-Time Detection", "Urgency Scoring", "Auto-Escalation"],
      color: "from-[color:var(--secondary)] to-lime-500",
    },
    {
      id: "5",
      title: "Duplicate Detection",
      description:
        "AI identifies similar complaints and suggests merging them. Reduces duplicate work and maintains cleaner data.",
      icon: <Brain size={40} weight="fill" className="text-pink-500" />,
      features: ["Similarity Matching", "Merge Suggestions", "Data Cleanup"],
      color: "from-pink-500 to-rose-400",
    },
    {
      id: "6",
      title: "Predictive Analytics",
      description:
        "AI forecasts resolution times, complaint volumes, and resource needs. Make proactive decisions based on predictions.",
      icon: <TrendingUp size={40} height="fill" className="text-green-500" />,
      features: ["Time Prediction", "Volume Forecasting", "Resource Planning"],
      color: "from-green-500 to-emerald-400",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--card)] via-[color:var(--background)] to-[color:var(--card)] dark:from-[color:var(--card)] dark:via-[color:var(--background)] dark:to-[color:var(--card)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 left-1/3 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.1,
          }}
          animate={{
            x: [-50, 50, -50],
            y: [0, -30, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            x: [50, -50, 50],
            y: [0, 30, 0],
            transition: {
              duration: 10,
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
            AI Superpowers
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            Intelligent Features That
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] bg-clip-text text-transparent">
              Learn & Adapt
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            Our AI doesn't just automate—it learns from every interaction,
            improving accuracy and insights over time. Watch your complaint
            management evolve into an intelligent system.
          </motion.p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {capabilities.map((capability, idx) => (
            <motion.div
              key={capability.id}
              variants={itemVariants}
              whileHover={{
                y: -12,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-transparent to-[color:var(--secondary)] opacity-0 group-hover:opacity-15 rounded-2xl transition-opacity duration-300 blur-xl" />

              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all duration-300 overflow-hidden">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${capability.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon container with animation */}
                <motion.div
                  className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] group-hover:shadow-lg transition-all duration-300"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.15,
                  }}
                >
                  {capability.icon}
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-[color:var(--foreground)] mb-3 group-hover:text-[color:var(--primary)] transition-colors">
                    {capability.title}
                  </h3>

                  <p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed mb-6">
                    {capability.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2">
                    {capability.features.map((feature, fidx) => (
                      <motion.div
                        key={fidx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + fidx * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm text-[color:var(--muted-foreground)] group-hover:text-[color:var(--foreground)] transition-colors"
                      >
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className="text-[color:var(--primary)] flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional AI Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Priority Prediction */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-400 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />

            <div className="relative flex items-start gap-4">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center"
              >
                <Sparkles size={24} height="fill" className="text-white" />
              </motion.div>

              <div className="flex-1">
                <h4 className="text-lg font-bold text-[color:var(--foreground)] mb-2 group-hover:text-[color:var(--primary)] transition-colors">
                  Smart Priority Detection
                </h4>
                <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed mb-3">
                  AI analyzes complaint content, keywords, and historical
                  patterns to automatically assign accurate priority levels.
                  Escalate critical issues instantly.
                </p>
                <ul className="space-y-1">
                  {[
                    "Content Analysis",
                    "Keyword Detection",
                    "Pattern Learning",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[color:var(--muted-foreground)] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[color:var(--primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Auto-Response Generation */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--secondary)] hover:border-opacity-50 transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--secondary)] to-lime-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />

            <div className="relative flex items-start gap-4">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-[color:var(--secondary)] to-lime-500 flex items-center justify-center"
              >
                <ChatCircle size={24} weight="fill" className="text-white" />
              </motion.div>

              <div className="flex-1">
                <h4 className="text-lg font-bold text-[color:var(--foreground)] mb-2 group-hover:text-[color:var(--secondary)] transition-colors">
                  Auto-Response Suggestions
                </h4>
                <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed mb-3">
                  AI generates context-aware response suggestions based on
                  complaint type. Adjust tone and language to match your brand
                  voice.
                </p>
                <ul className="space-y-1">
                  {["Context-Aware", "Tone Adjustment", "Multi-Language"].map(
                    (item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-[color:var(--muted-foreground)] flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-[color:var(--secondary)]" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Learning System CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative rounded-2xl overflow-hidden border border-[color:var(--border)] bg-gradient-to-r from-[color:var(--card)] via-[color:var(--background)] to-[color:var(--card)] p-8 sm:p-12"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] opacity-5" />

          <motion.div
            variants={itemVariants}
            className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-3">
                Self-Learning AI System
              </h3>
              <p className="text-[color:var(--muted-foreground)] text-base sm:text-lg leading-relaxed max-w-2xl">
                Every time you correct or adjust an AI suggestion, the system
                learns from that feedback. Over time, accuracy improves and the
                AI adapts to your organization's unique needs and preferences.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 sm:mt-0 px-6 py-3 bg-[color:var(--primary)] hover:bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold flex items-center gap-2 group transition-all whitespace-nowrap"
            >
              Explore AI
              <ArrowRight
                size={18}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { label: "AI Accuracy", value: "94%+" },
            { label: "Learning Speed", value: "24 Hours" },
            { label: "Cases Resolved", value: "2.5M+" },
            { label: "Time Saved", value: "70%" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <p className="text-xs sm:text-sm text-[color:var(--muted-foreground)] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

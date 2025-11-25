"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  FileText,
  Brain,
  CheckCircle,
  ArrowRight,
  Lightning,
} from "@phosphor-icons/react";
import { BarChart } from "lucide-react";

interface WorkflowStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

export default function HowItWorks() {
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

  const steps: WorkflowStep[] = [
    {
      id: "1",
      number: 1,
      title: "Submit Complaint",
      description:
        "Customers or team members submit complaints through an intuitive form. Rich text support, file attachments, and voice-to-text make it effortless.",
      icon: <FileText size={32} weight="fill" className="text-cyan-500" />,
      details: [
        "Drag-and-drop attachments",
        "Rich text editor",
        "Voice-to-text support",
        "Template suggestions",
      ],
      color: "from-cyan-500 to-blue-400",
    },
    {
      id: "2",
      number: 2,
      title: "AI Analysis & Routing",
      description:
        "Our AI instantly analyzes the complaint, detects sentiment, predicts priority, and assigns it to the best team member based on skills and availability.",
      icon: (
        <Brain
          size={32}
          weight="fill"
          className="text-[color:var(--primary)]"
        />
      ),
      details: [
        "Auto-categorization",
        "Sentiment detection",
        "Priority prediction",
        "Smart assignment",
      ],
      color: "from-[color:var(--primary)] to-blue-500",
    },
    {
      id: "3",
      number: 3,
      title: "Collaborate & Resolve",
      description:
        "Your team collaborates in real-time with threaded conversations, @mentions, and activity updates. AI suggests responses to accelerate resolution.",
      icon: <Lightning size={32} weight="fill" className="text-amber-500" />,
      details: [
        "Real-time collaboration",
        "Threaded conversations",
        "AI response suggestions",
        "Auto notifications",
      ],
      color: "from-amber-500 to-orange-400",
    },
    {
      id: "4",
      number: 4,
      title: "Track & Optimize",
      description:
        "Real-time analytics show resolution times, team performance, and complaint trends. Use predictive insights to optimize workflows continuously.",
      icon: (
        <BarChart
          size={32}
          height="fill"
          className="text-[color:var(--secondary)]"
        />
      ),
      details: [
        "Real-time KPIs",
        "Team performance metrics",
        "Trend analysis",
        "Predictive forecasting",
      ],
      color: "from-[color:var(--secondary)] to-lime-500",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] via-[color:var(--card)] to-[color:var(--background)] dark:from-[color:var(--background)] dark:via-[color:var(--card)] dark:to-[color:var(--background)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/2 -left-40 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            y: [0, 40, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.06,
          }}
          animate={{
            y: [0, -40, 0],
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
            Workflow
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            How ProjectPulse
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-cyan-500 to-[color:var(--secondary)] bg-clip-text text-transparent">
              Works in 4 Steps
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            From complaint submission to intelligent resolution—see how our
            AI-powered platform transforms your workflow.
          </motion.p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection line - visible on desktop only */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-[color:var(--primary)] opacity-20" />

          {/* Steps Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="group relative"
              >
                {/* Step connector (visible on md and up) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-32 -right-8 w-16 h-1 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] opacity-30 group-hover:opacity-60 transition-opacity" />
                )}

                {/* Card */}
                <div className="relative h-full p-8 rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Step Number */}
                  <motion.div
                    className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] border-2 border-[color:var(--border)] group-hover:border-[color:var(--primary)] group-hover:border-opacity-50 transition-all"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(0,0,0,0)",
                        "0 0 20px 10px rgba(0,0,0,0.05)",
                        "0 0 0 0 rgba(0,0,0,0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2,
                    }}
                  >
                    <span className="text-xl font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] group-hover:shadow-lg transition-all duration-300"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.15,
                    }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="relative flex-1">
                    <h3 className="text-xl font-bold text-[color:var(--foreground)] mb-2 group-hover:text-[color:var(--primary)] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.map((detail, didx) => (
                        <motion.div
                          key={didx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.3 + didx * 0.1,
                          }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2 text-xs text-[color:var(--muted-foreground)] group-hover:text-[color:var(--foreground)] transition-colors"
                        >
                          <ArrowRight
                            size={14}
                            weight="bold"
                            className="text-[color:var(--primary)] flex-shrink-0 group-hover:translate-x-1 transition-transform"
                          />
                          <span>{detail}</span>
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
        </div>

        {/* Timeline Section - Mobile Friendly */}
        <motion.div
          className="mt-20 pt-20 border-t border-[color:var(--border)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-center text-[color:var(--foreground)] mb-12"
          >
            The Complete Flow
          </motion.h3>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative pl-8"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-0 h-6 w-6 rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)] shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.2,
                  }}
                />

                {/* Timeline line */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-2.5 top-6 w-0.5 h-12 bg-gradient-to-b from-[color:var(--primary)] to-transparent opacity-30" />
                )}

                {/* Content */}
                <div className="text-left">
                  <h4 className="text-lg font-bold text-[color:var(--foreground)] mb-1">
                    Step {step.number}: {step.title}
                  </h4>
                  <p className="text-sm text-[color:var(--muted-foreground)] mb-3">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Timeline - Horizontal */}
          <div className="hidden lg:block">
            <div className="relative h-40 flex items-center justify-between">
              {/* Connection line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-[color:var(--primary)] opacity-20 transform -translate-y-1/2" />

              {/* Timeline steps */}
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  className="relative flex flex-col items-center flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + idx * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Dot */}
                  <motion.div
                    className="relative z-10 h-12 w-12 rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)] border-4 border-[color:var(--background)] dark:border-[color:var(--background)] shadow-lg flex items-center justify-center"
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2,
                    }}
                  >
                    <span className="text-white font-bold">{step.number}</span>
                  </motion.div>

                  {/* Label */}
                  <p className="mt-4 text-center text-sm font-semibold text-[color:var(--foreground)]">
                    {step.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Time & Results Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-2xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all"
          >
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-[color:var(--primary)] to-cyan-500 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              ~2 Min
            </motion.div>
            <p className="text-[color:var(--muted-foreground)]">
              Average time to assign and start resolution
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 rounded-2xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--secondary)] hover:border-opacity-50 transition-all"
          >
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-[color:var(--secondary)] to-lime-500 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              70%
            </motion.div>
            <p className="text-[color:var(--muted-foreground)]">
              Faster resolution with AI-powered automation
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 rounded-2xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-amber-500 hover:border-opacity-50 transition-all"
          >
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              24/7
            </motion.div>
            <p className="text-[color:var(--muted-foreground)]">
              Continuous monitoring and real-time updates
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 relative rounded-2xl overflow-hidden border border-[color:var(--border)] bg-gradient-to-r from-[color:var(--card)] via-[color:var(--background)] to-[color:var(--card)] p-8 sm:p-12 text-center"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] opacity-5" />

          <motion.div variants={itemVariants} className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-3">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-[color:var(--muted-foreground)] text-lg mb-8 max-w-2xl mx-auto">
              Experience how ProjectPulse streamlines complaint management with
              intelligent automation and real-time collaboration.
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
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

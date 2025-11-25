"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  WarningCircle,
  Clock,
  Users,
  ChartLine,
  CheckCircle,
} from "@phosphor-icons/react";

interface ProblemItem {
  id: string;
  problem: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export default function Problem() {
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

  const problemItems: ProblemItem[] = [
    {
      id: "1",
      problem: "Complaint Chaos",
      icon: (
        <WarningCircle
          size={32}
          weight="fill"
          className="text-[color:var(--destructive)]"
        />
      ),
      description: "Dozens of complaints pile up daily with no clear ownership",
      color: "from-[color:var(--destructive)] to-orange-500",
    },
    {
      id: "2",
      problem: "Manual Routing",
      icon: (
        <Users
          size={32}
          weight="fill"
          className="text-[color:var(--primary)]"
        />
      ),
      description: "Teams waste hours manually assigning complaints",
      color: "from-[color:var(--primary)] to-blue-400",
    },
    {
      id: "3",
      problem: "Wasted Time",
      icon: <Clock size={32} weight="fill" className="text-amber-500" />,
      description: "Resolution times drag on without intelligent automation",
      color: "from-amber-500 to-yellow-400",
    },
    {
      id: "4",
      problem: "No Insights",
      icon: (
        <ChartLine
          size={32}
          weight="fill"
          className="text-[color:var(--secondary)]"
        />
      ),
      description: "Missing data-driven decisions about complaint patterns",
      color: "from-[color:var(--secondary)] to-lime-400",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] via-[color:var(--card)] to-[color:var(--background)] dark:from-[color:var(--background)] dark:via-[color:var(--card)] dark:to-[color:var(--background)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-40 w-72 h-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--destructive), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            y: [0, 20, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.06,
          }}
          animate={{
            y: [0, -25, 0],
            transition: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-semibold text-[color:var(--primary)] mb-3 uppercase tracking-widest"
          >
            The Challenge
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            Your Team Drowns in
            <br />
            <span className="bg-gradient-to-r from-[color:var(--destructive)] via-orange-500 to-[color:var(--destructive)] bg-clip-text text-transparent">
              Complaint Overload
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed"
          >
            Manual processes, unclear ownership, and lack of automation leave
            your team struggling. Complaints slip through cracks, customers grow
            frustrated, and resolution times spiral.
          </motion.p>
        </motion.div>

        {/* Problem Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {problemItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-6 rounded-xl bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] group-hover:from-[color:var(--primary)] group-hover:from-opacity-10 transition-all duration-300">
                {item.icon}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-bold text-[color:var(--foreground)] mb-2 group-hover:text-[color:var(--primary)] transition-colors">
                  {item.problem}
                </h3>
                <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--primary)] to-transparent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Solution teaser */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative rounded-2xl overflow-hidden border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] p-8 sm:p-12"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-transparent to-[color:var(--secondary)] opacity-5" />

          <motion.div
            variants={itemVariants}
            className="relative flex items-start gap-4 sm:gap-6"
          >
            {/* Check icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex-shrink-0 mt-1"
            >
              <CheckCircle
                size={32}
                weight="fill"
                className="text-[color:var(--primary)]"
              />
            </motion.div>

            {/* Text */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[color:var(--foreground)] mb-2">
                There's a Better Way
              </h3>
              <p className="text-[color:var(--muted-foreground)] text-base sm:text-lg leading-relaxed">
                ProjectPulse intelligently routes complaints, automates
                assignments, and provides real-time insights. Transform chaos
                into structured, efficient complaint resolution.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { label: "Manual Hours Saved", value: "15+" },
            { label: "Resolution Time", value: "70% Faster" },
            { label: "Complaint Handling", value: "5x More" },
            { label: "Team Satisfaction", value: "90%+" },
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

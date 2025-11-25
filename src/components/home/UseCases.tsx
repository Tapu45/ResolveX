"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  Buildings,
  ShoppingCart,
  Hospital,
  GraduationCap,
  Phone,
  Briefcase,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react";

interface UseCase {
  id: string;
  title: string;
  industry: string;
  icon: React.ReactNode;
  description: string;
  challenges: string[];
  solution: string;
  results: {
    metric: string;
    improvement: string;
  }[];
  color: string;
}

export default function UseCases() {
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

  const useCases: UseCase[] = [
    {
      id: "1",
      title: "Enterprise SaaS",
      industry: "Software & Technology",
      icon: (
        <Buildings
          size={40}
          weight="fill"
          className="text-[color:var(--primary)]"
        />
      ),
      description:
        "Scale customer support with intelligent routing and automated issue resolution.",
      challenges: [
        "High volume of support tickets",
        "Complex routing requirements",
        "Tracking across multiple channels",
      ],
      solution:
        "ProjectPulse automatically categorizes and routes complaints based on complexity and agent expertise, while AI provides suggested responses, enabling your team to resolve issues 70% faster.",
      results: [
        { metric: "Ticket Resolution Time", improvement: "↓ 68% faster" },
        { metric: "Team Capacity", improvement: "↑ 3x more tickets" },
        { metric: "First Response Time", improvement: "↓ 90% reduction" },
      ],
      color: "from-[color:var(--primary)] to-blue-500",
    },
    {
      id: "2",
      title: "E-Commerce Platforms",
      industry: "Retail & Consumer Goods",
      icon: <ShoppingCart size={40} weight="fill" className="text-cyan-500" />,
      description:
        "Handle customer complaints efficiently during peak seasons with AI-powered automation.",
      challenges: [
        "Seasonal traffic spikes",
        "High complaint volume",
        "Multiple complaint sources (email, chat, social)",
      ],
      solution:
        "Smart routing ensures urgent complaints reach experienced agents first. Real-time analytics show bottlenecks. AI suggests best responses, while automation handles common issues automatically.",
      results: [
        { metric: "Response Time", improvement: "↓ 75% reduction" },
        { metric: "Customer Satisfaction", improvement: "↑ 42% increase" },
        { metric: "Team Efficiency", improvement: "↑ 85% improvement" },
      ],
      color: "from-cyan-500 to-blue-400",
    },
    {
      id: "3",
      title: "Healthcare Organizations",
      industry: "Medical & Healthcare",
      icon: (
        <Hospital
          size={40}
          weight="fill"
          className="text-[color:var(--destructive)]"
        />
      ),
      description:
        "Manage patient complaints and feedback with GDPR-compliant security and privacy.",
      challenges: [
        "Sensitive patient data handling",
        "Compliance requirements (HIPAA, GDPR)",
        "Critical urgency differentiation",
      ],
      solution:
        "Enterprise-grade encryption and row-level security ensure patient privacy. Sentiment analysis automatically escalates urgent complaints. Audit logs maintain full compliance.",
      results: [
        { metric: "Complaint Resolution", improvement: "↑ 94% accuracy" },
        { metric: "Compliance Audits", improvement: "✓ 100% compliant" },
        { metric: "Patient Satisfaction", improvement: "↑ 38% increase" },
      ],
      color: "from-[color:var(--destructive)] to-pink-500",
    },
    {
      id: "4",
      title: "Educational Institutions",
      industry: "Education & Training",
      icon: (
        <GraduationCap size={40} weight="fill" className="text-amber-500" />
      ),
      description:
        "Streamline student and parent complaint handling across departments.",
      challenges: [
        "Multiple complaint sources",
        "Cross-department coordination",
        "Response time accountability",
      ],
      solution:
        "Categorize complaints by department (academic, administrative, facilities). Real-time collaboration ensures coordinated responses. Analytics track institutional trends and improvement areas.",
      results: [
        { metric: "Response Time", improvement: "↓ 60% faster" },
        { metric: "Student Satisfaction", improvement: "↑ 45% increase" },
        { metric: "Issue Resolution", improvement: "↑ 3x faster" },
      ],
      color: "from-amber-500 to-orange-400",
    },
    {
      id: "5",
      title: "Telecommunications",
      industry: "Telecom & Utilities",
      icon: (
        <Phone
          size={40}
          weight="fill"
          className="text-[color:var(--secondary)]"
        />
      ),
      description:
        "Handle high-volume service complaints with predictive analytics and automation.",
      challenges: [
        "Massive complaint volume",
        "Diverse complaint types",
        "SLA compliance critical",
      ],
      solution:
        "Priority prediction ensures urgent complaints reach teams first. Predictive analytics forecast peak periods for better resource planning. Automation handles 40% of common issues.",
      results: [
        { metric: "SLA Compliance", improvement: "↑ 98% on-time" },
        { metric: "Automation Rate", improvement: "↑ 40% auto-resolved" },
        { metric: "Operational Cost", improvement: "↓ 35% savings" },
      ],
      color: "from-[color:var(--secondary)] to-lime-500",
    },
    {
      id: "6",
      title: "Financial Services",
      industry: "Banking & Finance",
      icon: <Briefcase size={40} weight="fill" className="text-green-500" />,
      description:
        "Manage regulatory complaints with complete audit trails and compliance.",
      challenges: [
        "Strict regulatory requirements",
        "Complex complaint handling rules",
        "Complete audit trail requirements",
      ],
      solution:
        "Complete audit logging for every action. RLS ensures data segregation between clients. Custom workflows match regulatory requirements. Compliance reporting automated.",
      results: [
        { metric: "Regulatory Compliance", improvement: "✓ 100% compliant" },
        { metric: "Audit Time", improvement: "↓ 90% faster" },
        { metric: "Complaint Closure Rate", improvement: "↑ 92% on-time" },
      ],
      color: "from-green-500 to-emerald-400",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] via-[color:var(--card)] to-[color:var(--background)] dark:from-[color:var(--background)] dark:via-[color:var(--card)] dark:to-[color:var(--background)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 -left-40 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-40 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.06,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
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
            Use Cases
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            Trusted by Teams Across
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] bg-clip-text text-transparent">
              Every Industry
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            From SaaS to healthcare, finance to education—ProjectPulse adapts to
            any organization's complaint management needs.
          </motion.p>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {useCases.map((useCase, idx) => (
            <motion.div
              key={useCase.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-transparent to-[color:var(--secondary)] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />

              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Header with icon and industry */}
                <div className="relative mb-6 flex items-start justify-between">
                  <motion.div
                    className="h-14 w-14 rounded-lg bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] flex items-center justify-center group-hover:shadow-lg transition-all"
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.15,
                    }}
                  >
                    {useCase.icon}
                  </motion.div>

                  <span className="text-xs font-semibold text-[color:var(--primary)] uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-[color:var(--primary)] from-opacity-10 to-[color:var(--secondary)] to-opacity-10 border border-[color:var(--primary)] border-opacity-20">
                    {useCase.industry}
                  </span>
                </div>

                {/* Title and description */}
                <div className="relative mb-6">
                  <h3 className="text-2xl font-bold text-[color:var(--foreground)] mb-2 group-hover:text-[color:var(--primary)] transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-[color:var(--muted-foreground)] text-sm leading-relaxed mb-4">
                    {useCase.description}
                  </p>
                </div>

                {/* Challenges */}
                <div className="relative mb-6">
                  <h4 className="text-sm font-bold text-[color:var(--foreground)] mb-3">
                    Challenges
                  </h4>
                  <ul className="space-y-2">
                    {useCase.challenges.map((challenge, cidx) => (
                      <motion.li
                        key={cidx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + cidx * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2 text-xs text-[color:var(--muted-foreground)]"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[color:var(--destructive)] flex-shrink-0" />
                        <span>{challenge}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div className="relative mb-6 pb-6 border-b border-[color:var(--border)]">
                  <h4 className="text-sm font-bold text-[color:var(--foreground)] mb-2">
                    Solution
                  </h4>
                  <p className="text-xs text-[color:var(--muted-foreground)] leading-relaxed">
                    {useCase.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="relative flex-1">
                  <h4 className="text-sm font-bold text-[color:var(--foreground)] mb-4">
                    Results
                  </h4>
                  <div className="space-y-3">
                    {useCase.results.map((result, ridx) => (
                      <motion.div
                        key={ridx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + ridx * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gradient-to-r from-[color:var(--primary)] from-opacity-5 to-[color:var(--secondary)] to-opacity-5 border border-[color:var(--primary)] border-opacity-10"
                      >
                        <span className="text-xs font-medium text-[color:var(--muted-foreground)]">
                          {result.metric}
                        </span>
                        <span className="text-sm font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent">
                          {result.improvement}
                        </span>
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

        {/* Key Statistics */}
        <motion.div
          className="mb-20 grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { label: "Industries Served", value: "6+" },
            { label: "Active Organizations", value: "500+" },
            { label: "Complaints Managed", value: "2.5M+" },
            { label: "Team Members", value: "50K+" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all text-center"
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

        {/* Industry-Specific Features */}
        <motion.div
          className="mb-20 rounded-2xl overflow-hidden border border-[color:var(--border)] bg-gradient-to-r from-[color:var(--card)] via-[color:var(--background)] to-[color:var(--card)] p-8 sm:p-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] opacity-5" />

          <motion.div variants={itemVariants} className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-3">
              Industry-Specific Compliance & Features
            </h3>
            <p className="text-[color:var(--muted-foreground)] text-base sm:text-lg mb-8 max-w-3xl">
              ProjectPulse comes with built-in compliance tools and features
              tailored to your industry's specific requirements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Healthcare",
                  features: [
                    "HIPAA Compliance",
                    "Data Encryption",
                    "Audit Logs",
                  ],
                },
                {
                  title: "Finance",
                  features: [
                    "SOC 2 Type II",
                    "Regulatory Reports",
                    "Compliance Audit",
                  ],
                },
                {
                  title: "SaaS",
                  features: ["Multi-tenant", "Custom Branding", "API Access"],
                },
                {
                  title: "Education",
                  features: [
                    "FERPA Compliant",
                    "Bulk Operations",
                    "Department Management",
                  ],
                },
              ].map((industry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg bg-[color:var(--card)] border border-[color:var(--border)]"
                >
                  <h4 className="font-semibold text-[color:var(--foreground)] mb-3">
                    {industry.title}
                  </h4>
                  <ul className="space-y-2">
                    {industry.features.map((feature, fidx) => (
                      <li
                        key={fidx}
                        className="flex items-center gap-2 text-sm text-[color:var(--muted-foreground)]"
                      >
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className="text-[color:var(--primary)]"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Case Study CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-3">
              Ready to See ProjectPulse in Action?
            </h3>
            <p className="text-[color:var(--muted-foreground)] text-lg max-w-2xl mx-auto">
              Join leading organizations transforming their complaint management
              workflows with intelligent automation and AI-powered insights.
            </p>
          </motion.div>

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
              Request Demo
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
              Download Case Study
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

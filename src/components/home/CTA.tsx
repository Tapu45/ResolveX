"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  EnvelopeOpen,
  Phone,
  ChatCircle,
} from "@phosphor-icons/react";
import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] to-[color:var(--background)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="none"
          >
            <path
              d="M0 0h100M0 100v-100M100 0v100"
              stroke="var(--border)"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.1,
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            y: [0, 50, 0],
            scale: [1, 0.9, 1],
            transition: {
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.05, 1],
            transition: {
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main CTA Section */}
        <motion.div
          className="mb-20 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[color:var(--primary)] from-opacity-10 to-[color:var(--secondary)] to-opacity-10 border border-[color:var(--primary)] border-opacity-20"
          >
            <CheckCircle
              size={16}
              weight="fill"
              className="text-[color:var(--primary)]"
            />
            <span className="text-sm font-semibold text-[color:var(--foreground)]">
              14-day free trial • No credit card required
            </span>
          </motion.div>

          <motion.h2
            variants={headingVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[color:var(--foreground)] mb-6 leading-tight"
          >
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] bg-clip-text text-transparent">
              Complaint Management?
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Join hundreds of organizations transforming their workflows with
            ProjectPulse. Start your free trial today and experience the
            difference intelligent automation can make.
          </motion.p>

          {/* Email Signup */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full px-6 py-4 rounded-lg bg-[color:var(--input)] border border-[color:var(--border)] text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-opacity-20 transition-all"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold flex items-center justify-center gap-2 group hover:shadow-lg transition-all"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} weight="fill" />
                    Success!
                  </>
                ) : (
                  <>
                    Start Free Trial
                    <ArrowRight
                      size={18}
                      weight="bold"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isSubmitted ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-[color:var(--secondary)] font-semibold mt-3"
            >
              ✓ Check your email for setup instructions
            </motion.p>
          </motion.form>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-[color:var(--muted-foreground)]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle
                size={16}
                weight="fill"
                className="text-[color:var(--secondary)]"
              />
              <span>Quick setup (5 mins)</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-[color:var(--border)]" />
            <div className="flex items-center gap-2">
              <CheckCircle
                size={16}
                weight="fill"
                className="text-[color:var(--secondary)]"
              />
              <span>Full feature access</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-[color:var(--border)]" />
            <div className="flex items-center gap-2">
              <CheckCircle
                size={16}
                weight="fill"
                className="text-[color:var(--secondary)]"
              />
              <span>Instant onboarding</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            {
              icon: (
                <Phone
                  size={32}
                  weight="fill"
                  className="text-[color:var(--primary)]"
                />
              ),
              title: "Call Us",
              description: "Speak with our team",
              action: "+1 (555) 123-4567",
              actionType: "phone",
            },
            {
              icon: (
                <ChatCircle
                  size={32}
                  weight="fill"
                  className="text-[color:var(--secondary)]"
                />
              ),
              title: "Live Chat",
              description: "Chat with support",
              action: "Start Chat",
              actionType: "chat",
            },
            {
              icon: (
                <EnvelopeOpen
                  size={32}
                  weight="fill"
                  className="text-amber-500"
                />
              ),
              title: "Email Us",
              description: "We'll respond in 2 hours",
              action: "sales@projectpulse.io",
              actionType: "email",
            },
          ].map((method, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all cursor-pointer"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-transparent to-[color:var(--secondary)] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />

              {/* Icon */}
              <motion.div
                className="relative mb-4"
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
                {method.icon}
              </motion.div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-bold text-[color:var(--foreground)] mb-1 group-hover:text-[color:var(--primary)] transition-colors">
                  {method.title}
                </h3>
                <p className="text-sm text-[color:var(--muted-foreground)] mb-4">
                  {method.description}
                </p>

                <motion.a
                  href={
                    method.actionType === "phone"
                      ? `tel:${method.action}`
                      : method.actionType === "email"
                        ? `mailto:${method.action}`
                        : "#"
                  }
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)] hover:text-[color:var(--secondary)] transition-colors group/link"
                >
                  {method.action}
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </motion.a>
              </div>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-transparent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="mb-20 rounded-2xl overflow-hidden border border-[color:var(--border)] bg-gradient-to-r from-[color:var(--card)] via-[color:var(--background)] to-[color:var(--card)] p-8 sm:p-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] opacity-5" />

          <motion.div variants={itemVariants} className="relative mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-3">
              Why Choose ProjectPulse?
            </h3>
            <p className="text-[color:var(--muted-foreground)] text-base">
              Everything you need to transform complaint management
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {[
              {
                title: "AI-Powered Automation",
                description:
                  "Intelligent routing, sentiment analysis, and priority prediction powered by advanced AI.",
              },
              {
                title: "Real-Time Collaboration",
                description:
                  "Keep your entire team aligned with instant updates, threaded conversations, and @mentions.",
              },
              {
                title: "Enterprise Security",
                description:
                  "Bank-level encryption, row-level security, and compliance with HIPAA, SOC2, and GDPR.",
              },
              {
                title: "Advanced Analytics",
                description:
                  "Get actionable insights with real-time dashboards and predictive analytics.",
              },
              {
                title: "Seamless Integration",
                description:
                  "Connect with your favorite tools via API, Webhooks, and pre-built integrations.",
              },
              {
                title: "24/7 Support",
                description:
                  "Expert support team ready to help you succeed at every step of your journey.",
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-lg bg-[color:var(--card)] border border-[color:var(--border)] group hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all"
              >
                <motion.div
                  className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)] flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.15,
                  }}
                >
                  <CheckCircle size={16} weight="fill" className="text-white" />
                </motion.div>

                <h4 className="font-bold text-[color:var(--foreground)] mb-2 group-hover:text-[color:var(--primary)] transition-colors">
                  {benefit.title}
                </h4>
                <p className="text-sm text-[color:var(--muted-foreground)]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ Quick Links */}
        <motion.div
          className="mb-20 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-[color:var(--foreground)] mb-8"
          >
            Quick Questions?
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {[
              "How does pricing work?",
              "What's included in the trial?",
              "Do you offer API access?",
              "How secure is my data?",
            ].map((faq, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-lg bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all text-sm font-medium text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
              >
                {faq}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-[color:var(--primary)] hover:text-[color:var(--secondary)] font-semibold transition-colors group"
            >
              View all FAQs
              <ArrowRight
                size={18}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats Before Footer */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { label: "Active Users", value: "50K+" },
            { label: "Complaints Managed", value: "2.5M+" },
            { label: "Organizations", value: "500+" },
            { label: "Uptime Guarantee", value: "99.9%" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all"
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

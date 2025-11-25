"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Building,
  Rocket,
  X,
} from "@phosphor-icons/react";
import { Zap } from "lucide-react";
import { useState } from "react";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  period: string;
  yearlyPrice: number;
  cta: string;
  highlighted: boolean;
  features: {
    name: string;
    included: boolean;
  }[];
  color: string;
  accentColor: string;
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

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

  const pricingTiers: PricingTier[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small teams getting started",
      icon: <Zap size={40} height="fill" className="text-cyan-500" />,
      price: 49,
      yearlyPrice: 490,
      period: "per month",
      cta: "Start Free Trial",
      highlighted: false,
      features: [
        { name: "Up to 5 team members", included: true },
        { name: "500 complaints/month", included: true },
        { name: "Basic AI features", included: true },
        { name: "Email support", included: true },
        { name: "Basic analytics", included: true },
        { name: "1 workspace", included: true },
        { name: "Custom branding", included: false },
        { name: "Advanced API access", included: false },
        { name: "Priority support", included: false },
        { name: "Custom workflows", included: false },
      ],
      color: "from-cyan-500 to-blue-400",
      accentColor: "text-cyan-500",
    },
    {
      id: "professional",
      name: "Professional",
      description: "For growing teams with advanced needs",
      icon: (
        <Rocket
          size={40}
          weight="fill"
          className="text-[color:var(--primary)]"
        />
      ),
      price: 149,
      yearlyPrice: 1490,
      period: "per month",
      cta: "Start Free Trial",
      highlighted: true,
      features: [
        { name: "Up to 25 team members", included: true },
        { name: "5,000 complaints/month", included: true },
        { name: "Advanced AI features", included: true },
        { name: "Priority email & chat support", included: true },
        { name: "Advanced analytics & reporting", included: true },
        { name: "Unlimited workspaces", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced API access", included: true },
        { name: "Custom workflows", included: true },
        { name: "SSO & advanced security", included: false },
      ],
      color: "from-[color:var(--primary)] to-blue-500",
      accentColor: "text-[color:var(--primary)]",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with custom needs",
      icon: (
        <Building
          size={40}
          weight="fill"
          className="text-[color:var(--secondary)]"
        />
      ),
      price: 0,
      yearlyPrice: 0,
      period: "Custom pricing",
      cta: "Contact Sales",
      highlighted: false,
      features: [
        { name: "Unlimited team members", included: true },
        { name: "Unlimited complaints", included: true },
        { name: "Full AI capabilities", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Custom analytics & reporting", included: true },
        { name: "Unlimited workspaces", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced API access", included: true },
        { name: "Custom workflows & automation", included: true },
        { name: "SSO & compliance features (HIPAA, SOC2)", included: true },
      ],
      color: "from-[color:var(--secondary)] to-lime-500",
      accentColor: "text-[color:var(--secondary)]",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] to-[color:var(--card)] dark:from-[color:var(--background)] dark:to-[color:var(--card)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-40 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
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
            Pricing
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Choose the plan that fits your team. All plans include a 14-day free
            trial with full access to features.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            <span
              className={`text-sm font-medium ${
                billingCycle === "monthly"
                  ? "text-[color:var(--foreground)]"
                  : "text-[color:var(--muted-foreground)]"
              }`}
            >
              Monthly
            </span>

            <motion.button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
              className="relative h-8 w-16 rounded-full bg-[color:var(--muted)] cursor-pointer border border-[color:var(--border)]"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 left-1 h-6 w-6 rounded-full bg-[color:var(--primary)] shadow-lg"
                animate={{
                  x: billingCycle === "yearly" ? 32 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.button>

            <span
              className={`text-sm font-medium ${
                billingCycle === "yearly"
                  ? "text-[color:var(--foreground)]"
                  : "text-[color:var(--muted-foreground)]"
              }`}
            >
              Yearly
            </span>

            <span className="ml-2 px-3 py-1 rounded-full bg-gradient-to-r from-[color:var(--primary)] from-opacity-20 to-[color:var(--secondary)] to-opacity-20 text-xs font-bold text-[color:var(--primary)]">
              Save 20%
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              variants={itemVariants}
              whileHover={
                tier.highlighted
                  ? { y: -16, transition: { duration: 0.3 } }
                  : { y: -8, transition: { duration: 0.3 } }
              }
              className="group relative"
            >
              {/* Glow effect for highlighted card */}
              {tier.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-transparent to-[color:var(--secondary)] opacity-0 group-hover:opacity-15 rounded-3xl transition-opacity duration-300 blur-xl" />
              )}

              {/* Highlighted Badge */}
              {tier.highlighted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] text-white text-xs font-bold">
                    Most Popular
                  </span>
                </motion.div>
              )}

              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-3xl bg-[color:var(--card)] border ${
                  tier.highlighted
                    ? "border-[color:var(--primary)] border-opacity-50 lg:scale-105"
                    : "border-[color:var(--border)]"
                } hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all duration-300 overflow-hidden flex flex-col`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  className="relative mb-6 h-16 w-16 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] flex items-center justify-center group-hover:shadow-lg transition-all"
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
                  {tier.icon}
                </motion.div>

                {/* Tier Name */}
                <h3 className="relative text-2xl font-bold text-[color:var(--foreground)] mb-2 group-hover:text-[color:var(--primary)] transition-colors">
                  {tier.name}
                </h3>

                <p className="relative text-sm text-[color:var(--muted-foreground)] mb-8">
                  {tier.description}
                </p>

                {/* Pricing */}
                <div className="relative mb-8">
                  {tier.price === 0 ? (
                    <div>
                      <p className="text-sm text-[color:var(--muted-foreground)] mb-2">
                        Custom pricing tailored to your needs
                      </p>
                      <p className="text-3xl font-bold text-[color:var(--foreground)]">
                        Let's Talk
                      </p>
                    </div>
                  ) : (
                    <div>
                      <motion.div
                        key={billingCycle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-baseline"
                      >
                        <span className="text-5xl font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent">
                          $
                          {billingCycle === "monthly"
                            ? tier.price
                            : Math.floor((tier.yearlyPrice / 12) * 10) / 10}
                        </span>
                        <span className="ml-2 text-[color:var(--muted-foreground)] text-sm">
                          {billingCycle === "monthly"
                            ? "/month"
                            : `/month (${tier.yearlyPrice}/yr)`}
                        </span>
                      </motion.div>

                      {billingCycle === "yearly" && (
                        <p className="text-xs text-[color:var(--secondary)] font-semibold mt-2">
                          Save $
                          {(
                            tier.price * 12 -
                            tier.yearlyPrice
                          ).toLocaleString()}
                          /year
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 group/btn transition-all mb-8 ${
                    tier.highlighted
                      ? "bg-[color:var(--primary)] hover:bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                      : "bg-[color:var(--input)] hover:bg-[color:var(--muted)] text-[color:var(--foreground)] border border-[color:var(--border)]"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </motion.button>

                {/* Features List */}
                <div className="relative flex-1">
                  <p className="text-xs font-bold text-[color:var(--muted-foreground)] mb-4 uppercase tracking-widest">
                    What's included
                  </p>

                  <ul className="space-y-3">
                    {tier.features.map((feature, fidx) => (
                      <motion.li
                        key={fidx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + fidx * 0.05,
                        }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-sm text-[color:var(--muted-foreground)]"
                      >
                        {feature.included ? (
                          <CheckCircle
                            size={18}
                            weight="fill"
                            className="text-[color:var(--primary)] flex-shrink-0 mt-0.5"
                          />
                        ) : (
                          <X
                            size={18}
                            weight="bold"
                            className="text-[color:var(--border)] flex-shrink-0 mt-0.5 opacity-50"
                          />
                        )}
                        <span
                          className={
                            !feature.included
                              ? "text-[color:var(--muted-foreground)] opacity-50"
                              : ""
                          }
                        >
                          {feature.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="mb-20 rounded-2xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--card)] overflow-x-auto"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--border)] bg-[color:var(--background)] bg-opacity-50">
                <th className="p-4 text-left font-bold text-[color:var(--foreground)]">
                  Feature
                </th>
                <th className="p-4 text-center font-bold text-[color:var(--foreground)]">
                  Starter
                </th>
                <th className="p-4 text-center font-bold text-[color:var(--primary)]">
                  Professional
                </th>
                <th className="p-4 text-center font-bold text-[color:var(--secondary)]">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Team Members",
                  starter: "5",
                  pro: "25",
                  enterprise: "Unlimited",
                },
                {
                  label: "Complaints/Month",
                  starter: "500",
                  pro: "5,000",
                  enterprise: "Unlimited",
                },
                {
                  label: "AI Features",
                  starter: "Basic",
                  pro: "Advanced",
                  enterprise: "Full",
                },
                {
                  label: "API Access",
                  starter: "Limited",
                  pro: "Advanced",
                  enterprise: "Full",
                },
                {
                  label: "Custom Workflows",
                  starter: "❌",
                  pro: "✓",
                  enterprise: "✓",
                },
                {
                  label: "SSO & SAML",
                  starter: "❌",
                  pro: "❌",
                  enterprise: "✓",
                },
                {
                  label: "Compliance Features",
                  starter: "❌",
                  pro: "Basic",
                  enterprise: "Full (HIPAA, SOC2)",
                },
                {
                  label: "Dedicated Support",
                  starter: "❌",
                  pro: "✓",
                  enterprise: "24/7",
                },
              ].map((row, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                  viewport={{ once: true }}
                  className={`border-b border-[color:var(--border)] hover:bg-[color:var(--background)] hover:bg-opacity-30 transition-colors ${
                    idx % 2 === 1
                      ? "bg-[color:var(--background)] bg-opacity-20"
                      : ""
                  }`}
                >
                  <td className="p-4 font-medium text-[color:var(--foreground)]">
                    {row.label}
                  </td>
                  <td className="p-4 text-center text-[color:var(--muted-foreground)]">
                    {row.starter}
                  </td>
                  <td className="p-4 text-center text-[color:var(--muted-foreground)]">
                    {row.pro}
                  </td>
                  <td className="p-4 text-center text-[color:var(--muted-foreground)]">
                    {row.enterprise}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-center text-[color:var(--foreground)] mb-12"
          >
            Pricing FAQs
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                question: "Can I change plans anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan anytime. Changes take effect on your next billing cycle.",
              },
              {
                question: "What happens after the free trial?",
                answer:
                  "After your 14-day trial, you'll need to enter a payment method to continue. You won't be charged until you confirm.",
              },
              {
                question: "Do you offer annual discounts?",
                answer:
                  "Yes! Annual plans come with a 20% discount compared to monthly billing.",
              },
              {
                question: "Is there a setup fee?",
                answer:
                  "No setup fees. You start immediately with your chosen plan, and we handle the onboarding.",
              },
              {
                question: "What support do you offer?",
                answer:
                  "All plans include email support. Professional gets priority support, and Enterprise includes 24/7 dedicated support.",
              },
              {
                question: "Can I get a custom plan?",
                answer:
                  "Absolutely! Contact our sales team for Enterprise plans tailored to your specific needs.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all"
              >
                <h4 className="font-bold text-[color:var(--foreground)] mb-2">
                  {faq.question}
                </h4>
                <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-[color:var(--muted-foreground)] text-lg max-w-2xl mx-auto">
              Join hundreds of organizations already using ProjectPulse. Start
              your free 14-day trial today—no credit card required.
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
              Talk to Sales
            </motion.button>
          </motion.div>

          <p className="mt-6 text-sm text-[color:var(--muted-foreground)]">
            Questions? We're here to help. Email us at{" "}
            <span className="text-[color:var(--primary)] font-semibold">
              support@projectpulse.io
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

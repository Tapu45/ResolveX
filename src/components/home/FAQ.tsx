"use client";

import { motion, cubicBezier, AnimatePresence } from "framer-motion";
import { CaretDown, MagnifyingGlass, CheckCircle } from "@phosphor-icons/react";
import { useState } from "react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  relatedTopics?: string[];
}

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const faqItems: FAQItem[] = [
    {
      id: "general-1",
      category: "General",
      question: "What is ProjectPulse?",
      answer:
        "ProjectPulse is an enterprise-grade, AI-powered SaaS platform designed to streamline complaint and issue management. It combines intelligent automation, real-time collaboration, and advanced analytics to help organizations resolve complaints faster and improve customer satisfaction. Our multi-tenant architecture ensures data security while our AI capabilities automate routing, prioritization, and response suggestions.",
      relatedTopics: ["Features", "Security"],
    },
    {
      id: "general-2",
      category: "General",
      question: "Who should use ProjectPulse?",
      answer:
        "ProjectPulse is ideal for any organization that receives and manages complaints or support tickets. This includes SaaS companies, e-commerce platforms, healthcare providers, educational institutions, telecommunications companies, financial services firms, and more. Teams of any size—from startups to enterprises—can benefit from our intelligent automation and collaboration features.",
      relatedTopics: ["Industries", "Use Cases"],
    },
    {
      id: "general-3",
      category: "General",
      question: "How does ProjectPulse compare to competitors?",
      answer:
        "ProjectPulse stands out with its AI-powered intelligent routing, advanced sentiment analysis, and predictive analytics. Unlike traditional systems, we offer real-time collaboration, customizable workflows, and industry-specific compliance features out of the box. Our multi-tenant architecture ensures enterprise-grade security while maintaining ease of use. Plus, our pricing is transparent and scalable for teams of all sizes.",
      relatedTopics: ["Pricing", "Features"],
    },
    {
      id: "getting-started-1",
      category: "Getting Started",
      question: "How do I start my free trial?",
      answer:
        "Starting is simple! Just enter your work email on our homepage and click 'Start Free Trial'. You'll receive setup instructions in your email. No credit card is required. Your 14-day trial includes full access to all features, and you can upgrade or cancel anytime. Most teams are up and running within 2 hours.",
      relatedTopics: ["Pricing", "Onboarding"],
    },
    {
      id: "getting-started-2",
      category: "Getting Started",
      question: "What happens after my free trial ends?",
      answer:
        "After your 14-day trial, you'll need to choose a paid plan to continue using ProjectPulse. We'll remind you 3 days before your trial ends. If you don't upgrade, your account will be paused, and you can reactivate it at any time. Your data will be retained for 30 days. No charges will be made without your explicit confirmation.",
      relatedTopics: ["Pricing", "Billing"],
    },
    {
      id: "getting-started-3",
      category: "Getting Started",
      question: "How long does onboarding take?",
      answer:
        "Most teams complete setup in under 2 hours. This includes creating an organization, inviting team members, connecting your first integration, and customizing your workflows. We provide step-by-step guided setup and offer live chat support to answer any questions. Enterprise customers receive dedicated onboarding assistance from our team.",
      relatedTopics: ["Support", "Implementation"],
    },
    {
      id: "features-1",
      category: "Features",
      question: "What AI features does ProjectPulse include?",
      answer:
        "ProjectPulse includes several AI-powered features: (1) Intelligent Routing—automatically assigns complaints to the best agent based on skills and workload; (2) Sentiment Analysis—detects urgency and emotion in complaints; (3) Smart Categorization—auto-tags complaints with the right category; (4) Response Suggestions—AI-generated initial responses save time; (5) Predictive Analytics—forecasts peak periods and potential issues; (6) Duplicate Detection—identifies and merges similar complaints.",
      relatedTopics: ["Features", "Automation"],
    },
    {
      id: "features-2",
      category: "Features",
      question: "Can I customize workflows?",
      answer:
        "Yes! ProjectPulse offers extensive workflow customization. You can create custom stages, define approval processes, set up auto-actions based on conditions, and build multi-step workflows. Professional and Enterprise plans include advanced workflow builder with conditional logic. You can also create industry-specific templates or company-specific processes. No coding required—everything is visual.",
      relatedTopics: ["Features", "Customization"],
    },
    {
      id: "features-3",
      category: "Features",
      question: "Does ProjectPulse integrate with other tools?",
      answer:
        "Yes, ProjectPulse integrates with many popular tools. We have pre-built integrations with Slack, Microsoft Teams, Jira, GitHub, Salesforce, HubSpot, and more. We also offer a robust REST API and webhooks for custom integrations. Enterprise customers can request custom integrations. All integrations are secure and use OAuth 2.0 or API keys.",
      relatedTopics: ["Integrations", "API"],
    },
    {
      id: "pricing-1",
      category: "Pricing",
      question: "What's included in each pricing tier?",
      answer:
        "Starter ($49/mo): 5 team members, 500 complaints/month, basic AI, email support. Professional ($149/mo): 25 members, 5,000 complaints, advanced AI, priority support, custom branding, API access. Enterprise (custom): Unlimited everything, full AI, 24/7 support, compliance features, custom workflows. All plans include 14-day free trial, multi-workspace support, and basic analytics.",
      relatedTopics: ["Pricing", "Features"],
    },
    {
      id: "pricing-2",
      category: "Pricing",
      question: "Can I change plans or cancel anytime?",
      answer:
        "Absolutely! You can upgrade or downgrade your plan anytime. Changes take effect on your next billing cycle. If you downgrade, you'll only be charged for the lower-tier plan. You can also cancel your subscription at any time—your data remains accessible during your current billing period. After cancellation, data is retained for 30 days before deletion.",
      relatedTopics: ["Billing", "Pricing"],
    },
    {
      id: "pricing-3",
      category: "Pricing",
      question: "Do you offer annual discounts?",
      answer:
        "Yes! Annual billing comes with a 20% discount compared to monthly pricing. For example, the Professional plan is $149/month ($1,788/year) or $1,490/year with annual billing—saving you $298/year. Annual plans are paid upfront. You can still cancel within 30 days for a full refund if you're not satisfied.",
      relatedTopics: ["Pricing", "Billing"],
    },
    {
      id: "security-1",
      category: "Security",
      question: "Is my data secure with ProjectPulse?",
      answer:
        "Security is our top priority. We use bank-level encryption (AES-256) for data at rest and TLS 1.3 for data in transit. All data is stored in isolated, encrypted databases. We maintain SOC 2 Type II compliance, HIPAA compliance for healthcare, GDPR compliance for EU data, and annual third-party security audits. We never access your data without permission, and you can request data deletion anytime.",
      relatedTopics: ["Compliance", "Privacy"],
    },
    {
      id: "security-2",
      category: "Security",
      question: "What compliance certifications do you have?",
      answer:
        "ProjectPulse maintains multiple compliance certifications: SOC 2 Type II (security and availability), HIPAA (healthcare), GDPR (EU privacy), CCPA (California privacy), and ISO 27001 (information security). We undergo annual third-party audits and maintain detailed compliance documentation. Enterprise customers can request security assessments and sign BAAs (Business Associate Agreements) as needed.",
      relatedTopics: ["Security", "Privacy"],
    },
    {
      id: "security-3",
      category: "Security",
      question: "Do you offer SSO and advanced security?",
      answer:
        "Yes! Professional and Enterprise plans support SSO (Single Sign-On) via SAML 2.0. Enterprise plans include advanced features like IP whitelisting, two-factor authentication (2FA), role-based access control (RBAC), audit logging, and session management. You can also enforce password policies and set up organization-level security rules. All authentication is managed securely with no password stored in plain text.",
      relatedTopics: ["Security", "Access Control"],
    },
    {
      id: "support-1",
      category: "Support",
      question: "What support options are available?",
      answer:
        "Support varies by plan. Starter includes email support with 24-hour response time. Professional includes priority email and chat support with 4-hour response time and live onboarding. Enterprise includes 24/7 dedicated support with 1-hour response time, direct phone line, and a dedicated account manager. All customers can access our knowledge base, community forum, and video tutorials.",
      relatedTopics: ["Pricing", "Support"],
    },
    {
      id: "support-2",
      category: "Support",
      question: "Is there a knowledge base or documentation?",
      answer:
        "Yes! ProjectPulse offers comprehensive documentation including user guides, admin guides, API reference, integration tutorials, and video walkthroughs. Our knowledge base covers setup, features, troubleshooting, and best practices. You can also join our community forum to connect with other users and share tips. All documentation is searchable and regularly updated.",
      relatedTopics: ["Support", "Resources"],
    },
    {
      id: "technical-1",
      category: "Technical",
      question: "What's the API rate limit?",
      answer:
        "API rate limits vary by plan. Starter tier: 100 requests/minute. Professional tier: 500 requests/minute. Enterprise tier: Unlimited (or custom). All limits are per organization. We recommend using webhooks for real-time updates instead of polling. If you need higher limits, contact our sales team to discuss custom arrangements.",
      relatedTopics: ["API", "Technical"],
    },
    {
      id: "technical-2",
      category: "Technical",
      question: "Can I use ProjectPulse with my existing system?",
      answer:
        "Absolutely! ProjectPulse is designed to integrate with existing systems. You can connect via API, webhooks, or pre-built integrations. Our middleware can transform data between your existing format and ProjectPulse format. We also offer data import tools for bulk migrations from other platforms. Enterprise customers receive dedicated migration support from our team.",
      relatedTopics: ["Integration", "Migration"],
    },
    {
      id: "technical-3",
      category: "Technical",
      question: "What's your uptime guarantee?",
      answer:
        "ProjectPulse maintains a 99.9% uptime SLA (Service Level Agreement). This means we commit to 99.9% availability, with only ~45 minutes of downtime per month. If we fail to meet this SLA, Enterprise customers receive service credits. We have redundant systems across multiple availability zones, automated failover, and 24/7 monitoring. You can check our real-time status page at status.projectpulse.io.",
      relatedTopics: ["Reliability", "SLA"],
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(faqItems.map((item) => item.category))),
  ];

  const filteredItems = faqItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] to-[color:var(--card)]">
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
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-semibold text-[color:var(--primary)] mb-3 uppercase tracking-widest"
          >
            FAQ
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed"
          >
            Find answers to common questions about ProjectPulse, pricing,
            features, and more.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 relative"
        >
          <div className="relative">
            <MagnifyingGlass
              size={20}
              weight="bold"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[color:var(--muted-foreground)]"
            />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-[color:var(--input)] border border-[color:var(--border)] text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] focus:outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-opacity-20 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 flex flex-wrap gap-3 justify-center"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] text-[color:var(--primary-foreground)]"
                  : "bg-[color:var(--card)] border border-[color:var(--border)] text-[color:var(--muted-foreground)] hover:border-[color:var(--primary)] hover:border-opacity-50"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="group"
                >
                  <motion.button
                    onClick={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                    className="w-full text-left p-6 rounded-lg bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all overflow-hidden relative"
                    whileHover={{ backgroundColor: "var(--muted)" }}
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-transparent to-[color:var(--secondary)] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors">
                          {item.question}
                        </h3>
                        <p className="text-sm text-[color:var(--muted-foreground)] mt-1">
                          {item.category}
                        </p>
                      </div>

                      <motion.div
                        animate={{
                          rotate: expandedId === item.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 text-[color:var(--primary)]"
                      >
                        <CaretDown size={24} weight="bold" />
                      </motion.div>
                    </div>

                    {/* Accent line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-transparent group-hover:w-full transition-all duration-500" />
                  </motion.button>

                  {/* Expanded Answer */}
                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gradient-to-r from-[color:var(--card)] to-[color:var(--background)] border border-t-0 border-[color:var(--border)] border-[color:var(--primary)] border-opacity-20 rounded-b-lg">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <p className="text-[color:var(--muted-foreground)] leading-relaxed mb-6">
                              {item.answer}
                            </p>

                            {/* Related Topics */}
                            {item.relatedTopics &&
                              item.relatedTopics.length > 0 && (
                                <div>
                                  <p className="text-xs font-bold text-[color:var(--foreground)] mb-3 uppercase tracking-widest">
                                    Related Topics
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {item.relatedTopics.map((topic) => (
                                      <motion.button
                                        key={topic}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() =>
                                          setSelectedCategory(topic)
                                        }
                                        className="px-3 py-1 text-xs rounded-full bg-[color:var(--input)] border border-[color:var(--border)] text-[color:var(--primary)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all flex items-center gap-1"
                                      >
                                        <CheckCircle size={12} weight="fill" />
                                        {topic}
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-[color:var(--muted-foreground)]">
                  No results found for "{searchQuery}". Try a different search
                  or browse by category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results counter */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-sm text-[color:var(--muted-foreground)]"
          >
            Showing {filteredItems.length} of {faqItems.length} questions
          </motion.div>
        )}

        {/* Still have questions CTA */}
        <motion.div
          className="mt-20 text-center p-8 rounded-2xl bg-gradient-to-r from-[color:var(--card)] via-[color:var(--background)] to-[color:var(--card)] border border-[color:var(--border)]"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-xl font-bold text-[color:var(--foreground)] mb-2">
            Still have questions?
          </h3>
          <p className="text-[color:var(--muted-foreground)] mb-4">
            Can't find the answer you're looking for? Our support team is here
            to help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:support@projectpulse.io"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold flex items-center gap-2 group transition-all"
            >
              Contact Support
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-[color:var(--border)] text-[color:var(--foreground)] rounded-lg font-semibold hover:bg-[color:var(--card)] transition-all"
            >
              Schedule a Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

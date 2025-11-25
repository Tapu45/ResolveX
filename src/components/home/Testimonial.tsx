"use client";

import { motion, cubicBezier } from "framer-motion";
import { Star, ArrowRight } from "@phosphor-icons/react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  initials: string;
  rating: number;
  testimonial: string;
  highlight: string;
  metrics: {
    label: string;
    value: string;
  };
  bgColor: string;
}

export default function Testimonial() {
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

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Head of Customer Success",
      company: "TechFlow Solutions",
      image: "/avatars/sarah.jpg",
      initials: "SJ",
      rating: 5,
      testimonial:
        "ProjectPulse transformed how we handle complaints. What used to take 3 days now takes hours. Our team's productivity skyrocketed, and customer satisfaction improved dramatically.",
      highlight: "Reduced complaint resolution time by 70% in the first month.",
      metrics: {
        label: "Resolution Time",
        value: "↓ 70%",
      },
      bgColor: "from-blue-500 to-cyan-400",
    },
    {
      id: "2",
      name: "Marcus Chen",
      role: "Operations Manager",
      company: "RetailHub Inc.",
      image: "/avatars/marcus.jpg",
      initials: "MC",
      rating: 5,
      testimonial:
        "The AI-powered routing is incredible. Complaints reach the right person instantly, and the automated suggestions help our team respond faster than ever. This is a game-changer.",
      highlight: "Team handling 5x more complaints without additional staff.",
      metrics: {
        label: "Capacity Increase",
        value: "↑ 5x",
      },
      bgColor: "from-emerald-500 to-teal-400",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      role: "Chief Operations Officer",
      company: "MediCare Solutions",
      image: "/avatars/emily.jpg",
      initials: "ER",
      rating: 5,
      testimonial:
        "As a healthcare provider, compliance is critical. ProjectPulse gives us enterprise-grade security, complete audit trails, and the peace of mind we need. Highly recommended.",
      highlight: "100% HIPAA compliant with automated audit reporting.",
      metrics: {
        label: "Compliance Score",
        value: "✓ 100%",
      },
      bgColor: "from-rose-500 to-pink-400",
    },
    {
      id: "4",
      name: "James Patterson",
      role: "Support Team Lead",
      company: "CloudFirst Technologies",
      image: "/avatars/james.jpg",
      initials: "JP",
      rating: 5,
      testimonial:
        "Implementation was seamless. The dashboard is intuitive, and our team was productive within hours. The real-time collaboration features keep everyone on the same page.",
      highlight:
        "Onboarded entire team in under 2 hours with zero training needed.",
      metrics: {
        label: "Onboarding Time",
        value: "↓ 2 hrs",
      },
      bgColor: "from-amber-500 to-orange-400",
    },
    {
      id: "5",
      name: "Lisa Wong",
      role: "Finance Director",
      company: "FinServe Global",
      image: "/avatars/lisa.jpg",
      initials: "LW",
      rating: 5,
      testimonial:
        "The ROI was immediate. We've reduced operational costs by 35% and improved customer satisfaction scores. ProjectPulse is now essential to our operations.",
      highlight: "Generated 35% cost savings and 98% SLA compliance in Q1.",
      metrics: {
        label: "Cost Savings",
        value: "↓ 35%",
      },
      bgColor: "from-green-500 to-emerald-400",
    },
    {
      id: "6",
      name: "David Kim",
      role: "Director of Student Services",
      company: "University of Excellence",
      image: "/avatars/david.jpg",
      initials: "DK",
      rating: 5,
      testimonial:
        "Student satisfaction with our complaint handling increased from 65% to 89% in just 3 months. ProjectPulse made our team more responsive and transparent.",
      highlight: "Student satisfaction improved by 24 percentage points in Q1.",
      metrics: {
        label: "Satisfaction +",
        value: "↑ 24%",
      },
      bgColor: "from-purple-500 to-indigo-400",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] to-[color:var(--card)] dark:from-[color:var(--background)] dark:to-[color:var(--card)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.08,
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
          className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.06,
          }}
          animate={{
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
            Social Proof
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            Loved by Teams
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] bg-clip-text text-transparent">
              Worldwide
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            See how organizations across industries are transforming their
            complaint management with ProjectPulse.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{
                y: -12,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--primary)] via-transparent to-[color:var(--secondary)] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />

              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Rating Stars */}
                <motion.div
                  className="relative flex gap-1 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + i * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <Star
                        size={18}
                        weight="fill"
                        className="text-amber-400"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Testimonial Text */}
                <p className="relative text-[color:var(--muted-foreground)] text-sm leading-relaxed mb-6 italic flex-1">
                  "{testimonial.testimonial}"
                </p>

                {/* Highlight Box */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative p-4 rounded-lg bg-gradient-to-r from-[color:var(--primary)] from-opacity-10 to-[color:var(--secondary)] to-opacity-10 border border-[color:var(--primary)] border-opacity-20 mb-6"
                >
                  <p className="text-xs font-semibold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent">
                    {testimonial.highlight}
                  </p>
                </motion.div>

                {/* Author Info */}
                <div className="relative flex items-center justify-between pt-6 border-t border-[color:var(--border)]">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <motion.div
                      className={`h-12 w-12 rounded-full bg-gradient-to-br ${testimonial.bgColor} flex items-center justify-center text-white font-bold text-sm`}
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.15,
                      }}
                    >
                      {testimonial.initials}
                    </motion.div>

                    {/* Name and role */}
                    <div>
                      <h4 className="text-sm font-bold text-[color:var(--foreground)]">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-[color:var(--muted-foreground)]">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-[color:var(--primary)] font-semibold">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="text-right">
                    <p className="text-xs text-[color:var(--muted-foreground)] mb-1">
                      {testimonial.metrics.label}
                    </p>
                    <p className="text-lg font-bold bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] bg-clip-text text-transparent">
                      {testimonial.metrics.value}
                    </p>
                  </div>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--primary)] via-[color:var(--secondary)] to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Testimonials Section */}
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
              Watch Client Success Stories
            </h3>
            <p className="text-[color:var(--muted-foreground)] text-base sm:text-lg mb-8 max-w-2xl">
              Hear directly from our customers about their transformation
              journey with ProjectPulse.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "TechFlow Solutions",
                  subtitle: "70% Faster Resolution Times",
                  duration: "3:42",
                },
                {
                  title: "RetailHub Inc.",
                  subtitle: "5x Capacity Increase",
                  duration: "4:15",
                },
                {
                  title: "MediCare Solutions",
                  subtitle: "Enterprise Security & Compliance",
                  duration: "3:28",
                },
              ].map((video, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-lg overflow-hidden bg-[color:var(--card)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all cursor-pointer"
                >
                  {/* Video placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-[color:var(--primary)] from-opacity-20 to-[color:var(--secondary)] to-opacity-20 relative flex items-center justify-center group-hover:from-opacity-30 group-hover:to-opacity-30 transition-all">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-16 w-16 rounded-full bg-[color:var(--primary)] flex items-center justify-center group-hover:bg-opacity-90 transition-all"
                    >
                      <svg
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </motion.div>

                    {/* Duration */}
                    <span className="absolute bottom-3 right-3 text-xs font-semibold bg-black bg-opacity-70 text-white px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h4 className="font-bold text-[color:var(--foreground)] mb-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-[color:var(--muted-foreground)]">
                      {video.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mb-20 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-[color:var(--muted-foreground)] text-sm mb-8"
          >
            Trusted by leading organizations:
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {[
              "TechFlow Solutions",
              "RetailHub Inc.",
              "MediCare Solutions",
              "CloudFirst Technologies",
            ].map((company, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-lg bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all"
              >
                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                  {company}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] text-center"
          >
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-[color:var(--primary)] to-blue-500 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              98%
            </motion.div>
            <p className="text-[color:var(--muted-foreground)]">
              Customer Satisfaction Score
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] text-center"
          >
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-[color:var(--secondary)] to-lime-500 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              4.9/5
            </motion.div>
            <p className="text-[color:var(--muted-foreground)]">
              Average Product Rating
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] text-center"
          >
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              500+
            </motion.div>
            <p className="text-[color:var(--muted-foreground)]">
              Active Organizations
            </p>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-20 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-[color:var(--foreground)] mb-3">
              Join Hundreds of Happy Teams
            </h3>
            <p className="text-[color:var(--muted-foreground)] text-lg max-w-2xl mx-auto">
              Start your free 14-day trial today. No credit card required.
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
        </motion.div>
      </div>
    </section>
  );
}

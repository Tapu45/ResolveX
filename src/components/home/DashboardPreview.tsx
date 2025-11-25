"use client";

import { motion, cubicBezier } from "framer-motion";
import { ArrowRight, Play } from "@phosphor-icons/react";

export default function DashboardPreview() {
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

  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[color:var(--background)] to-[color:var(--card)] dark:from-[color:var(--background)] dark:to-[color:var(--card)]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 right-1/3 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            y: [0, -40, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
            opacity: 0.06,
          }}
          animate={{
            y: [0, 40, 0],
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
            Product Tour
          </motion.p>

          <motion.h2
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--foreground)] mb-6"
          >
            Experience the
            <br />
            <span className="bg-gradient-to-r from-[color:var(--primary)] via-purple-500 to-[color:var(--secondary)] bg-clip-text text-transparent">
              Power of ProjectPulse
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[color:var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed"
          >
            A clean, intuitive interface designed for teams of all sizes.
            Real-time collaboration, AI-powered insights, and streamlined
            workflows all in one place.
          </motion.p>
        </motion.div>

        {/* Dashboard Preview Container */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-[color:var(--border)] shadow-2xl"
        >
          {/* SVG Dashboard Illustration */}
          <svg
            viewBox="0 0 1400 900"
            className="w-full h-auto bg-[color:var(--card)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for gradients and patterns */}
            <defs>
              <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--card)" stopOpacity="1" />
                <stop
                  offset="100%"
                  stopColor="var(--background)"
                  stopOpacity="0.5"
                />
              </linearGradient>

              <linearGradient
                id="cardGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity="0.1"
                />
                <stop
                  offset="100%"
                  stopColor="var(--secondary)"
                  stopOpacity="0.05"
                />
              </linearGradient>

              <filter
                id="softShadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="8"
                  floodOpacity="0.15"
                />
              </filter>

              <linearGradient id="chartGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity="0.6"
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity="0.1"
                />
              </linearGradient>

              <linearGradient id="chartGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  stopColor="var(--secondary)"
                  stopOpacity="0.6"
                />
                <stop
                  offset="100%"
                  stopColor="var(--secondary)"
                  stopOpacity="0.1"
                />
              </linearGradient>

              <linearGradient
                id="progressGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
            </defs>

            {/* Background */}
            <rect width="1400" height="900" fill="var(--card)" />

            {/* Sidebar */}
            <rect
              x="0"
              y="0"
              width="280"
              height="900"
              fill="var(--background)"
              opacity="0.8"
            />
            <line
              x1="280"
              y1="0"
              x2="280"
              y2="900"
              stroke="var(--border)"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Sidebar Logo */}
            <circle
              cx="140"
              cy="40"
              r="8"
              fill="var(--primary)"
              opacity="0.8"
            />
            <text
              x="165"
              y="47"
              fontFamily="system-ui"
              fontSize="16"
              fontWeight="bold"
              fill="var(--foreground)"
            >
              ProjectPulse
            </text>

            {/* Sidebar Menu Items */}
            <g opacity="0.7">
              <rect
                x="20"
                y="90"
                width="240"
                height="40"
                rx="8"
                fill="var(--primary)"
                opacity="0.15"
              />
              <text
                x="50"
                y="115"
                fontFamily="system-ui"
                fontSize="13"
                fill="var(--foreground)"
                fontWeight="500"
              >
                Dashboard
              </text>
            </g>

            <g opacity="0.5">
              <text
                x="50"
                y="160"
                fontFamily="system-ui"
                fontSize="13"
                fill="var(--muted-foreground)"
              >
                Complaints
              </text>
              <text
                x="50"
                y="200"
                fontFamily="system-ui"
                fontSize="13"
                fill="var(--muted-foreground)"
              >
                Analytics
              </text>
              <text
                x="50"
                y="240"
                fontFamily="system-ui"
                fontSize="13"
                fill="var(--muted-foreground)"
              >
                Team
              </text>
              <text
                x="50"
                y="280"
                fontFamily="system-ui"
                fontSize="13"
                fill="var(--muted-foreground)"
              >
                Settings
              </text>
            </g>

            {/* Header Bar */}
            <rect
              x="280"
              y="0"
              width="1120"
              height="70"
              fill="url(#headerGrad)"
            />
            <line
              x1="280"
              y1="70"
              x2="1400"
              y2="70"
              stroke="var(--border)"
              strokeWidth="1"
              opacity="0.2"
            />

            {/* Search Bar */}
            <rect
              x="310"
              y="15"
              width="400"
              height="40"
              rx="8"
              fill="var(--input)"
              stroke="var(--border)"
              strokeWidth="1"
              opacity="0.5"
            />
            <text
              x="330"
              y="42"
              fontFamily="system-ui"
              fontSize="13"
              fill="var(--muted-foreground)"
            >
              Search complaints...
            </text>

            {/* Header Actions */}
            <circle
              cx="1320"
              cy="35"
              r="18"
              fill="var(--primary)"
              opacity="0.2"
            />
            <circle
              cx="1360"
              cy="35"
              r="18"
              fill="var(--secondary)"
              opacity="0.2"
            />

            {/* Main Content Area */}
            {/* KPI Cards Row 1 */}
            <g filter="url(#softShadow)">
              {/* Card 1 - Active Complaints */}
              <rect
                x="310"
                y="110"
                width="260"
                height="140"
                rx="12"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x="330"
                y="135"
                fontFamily="system-ui"
                fontSize="12"
                fill="var(--muted-foreground)"
              >
                Active Complaints
              </text>
              <text
                x="330"
                y="170"
                fontFamily="system-ui"
                fontSize="32"
                fontWeight="bold"
                fill="var(--primary)"
              >
                284
              </text>
              <text
                x="330"
                y="195"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--secondary)"
              >
                ↑ 12% from last week
              </text>

              {/* Card 2 - Avg Resolution Time */}
              <rect
                x="595"
                y="110"
                width="260"
                height="140"
                rx="12"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x="615"
                y="135"
                fontFamily="system-ui"
                fontSize="12"
                fill="var(--muted-foreground)"
              >
                Avg Resolution Time
              </text>
              <text
                x="615"
                y="170"
                fontFamily="system-ui"
                fontSize="32"
                fontWeight="bold"
                fill="var(--secondary)"
              >
                2.4h
              </text>
              <text
                x="615"
                y="195"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--primary)"
              >
                ↓ 8% improvement
              </text>

              {/* Card 3 - Team Efficiency */}
              <rect
                x="880"
                y="110"
                width="260"
                height="140"
                rx="12"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x="900"
                y="135"
                fontFamily="system-ui"
                fontSize="12"
                fill="var(--muted-foreground)"
              >
                Team Efficiency
              </text>
              <text
                x="900"
                y="170"
                fontFamily="system-ui"
                fontSize="32"
                fontWeight="bold"
                fill="var(--primary)"
              >
                94%
              </text>
              <text
                x="900"
                y="195"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--secondary)"
              >
                ↑ 5% increase
              </text>

              {/* Card 4 - Satisfaction Rate */}
              <rect
                x="1165"
                y="110"
                width="215"
                height="140"
                rx="12"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x="1185"
                y="135"
                fontFamily="system-ui"
                fontSize="12"
                fill="var(--muted-foreground)"
              >
                Satisfaction
              </text>
              <text
                x="1185"
                y="170"
                fontFamily="system-ui"
                fontSize="32"
                fontWeight="bold"
                fill="var(--secondary)"
              >
                4.8/5
              </text>
              <text
                x="1185"
                y="195"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--primary)"
              >
                98% positive
              </text>
            </g>

            {/* Charts Section */}
            {/* Left Chart - Line Chart */}
            <g filter="url(#softShadow)">
              <rect
                x="310"
                y="290"
                width="650"
                height="300"
                rx="12"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.6"
              />

              <text
                x="330"
                y="320"
                fontFamily="system-ui"
                fontSize="14"
                fontWeight="bold"
                fill="var(--foreground)"
              >
                Complaint Trends (Last 7 Days)
              </text>

              {/* Chart area */}
              <defs>
                <path
                  id="lineChart"
                  d="M 350 380 L 430 360 L 510 375 L 590 350 L 670 330 L 750 345 L 830 310"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                />
              </defs>

              {/* Area under curve */}
              <path
                d="M 350 380 L 430 360 L 510 375 L 590 350 L 670 330 L 750 345 L 830 310 L 830 520 L 350 520 Z"
                fill="url(#chartGrad1)"
              />

              {/* Line */}
              <polyline
                points="350 380 430 360 510 375 590 350 670 330 750 345 830 310"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.5"
              />

              {/* Data points */}
              {[350, 430, 510, 590, 670, 750, 830].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={[380, 360, 375, 350, 330, 345, 310][i]}
                  r="4"
                  fill="var(--primary)"
                />
              ))}

              {/* X Axis */}
              <line
                x1="330"
                y1="520"
                x2="900"
                y2="520"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.3"
              />

              {/* X Labels */}
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => (
                  <text
                    key={i}
                    x={350 + i * 80}
                    y="550"
                    fontFamily="system-ui"
                    fontSize="11"
                    fill="var(--muted-foreground)"
                    textAnchor="middle"
                  >
                    {day}
                  </text>
                )
              )}
            </g>

            {/* Right Chart - Category Breakdown */}
            <g filter="url(#softShadow)">
              <rect
                x="985"
                y="290"
                width="395"
                height="300"
                rx="12"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.6"
              />

              <text
                x="1005"
                y="320"
                fontFamily="system-ui"
                fontSize="14"
                fontWeight="bold"
                fill="var(--foreground)"
              >
                Complaint Categories
              </text>

              {/* Bar chart */}
              {[
                { label: "Billing", value: 45, color: "var(--primary)" },
                { label: "Support", value: 32, color: "var(--secondary)" },
                { label: "Feature", value: 28, color: "#8B5CF6" },
                { label: "Performance", value: 15, color: "#EC4899" },
              ].map((item, idx) => (
                <g key={idx}>
                  <text
                    x="1005"
                    y={380 + idx * 50}
                    fontFamily="system-ui"
                    fontSize="12"
                    fill="var(--muted-foreground)"
                  >
                    {item.label}
                  </text>
                  <rect
                    x="1090"
                    y={365 + idx * 50}
                    width={(item.value / 50) * 200}
                    height="20"
                    rx="6"
                    fill={item.color}
                    opacity="0.7"
                  />
                  <text
                    x={1295 + (item.value / 50) * 200}
                    y={380 + idx * 50}
                    fontFamily="system-ui"
                    fontSize="11"
                    fill="var(--foreground)"
                    fontWeight="bold"
                  >
                    {item.value}
                  </text>
                </g>
              ))}
            </g>

            {/* Bottom Section - Recent Activity */}
            <g filter="url(#softShadow)">
              <rect
                x="310"
                y="620"
                width="1070"
                height="240"
                rx="12"
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.6"
              />

              <text
                x="330"
                y="650"
                fontFamily="system-ui"
                fontSize="14"
                fontWeight="bold"
                fill="var(--foreground)"
              >
                Recent Complaints
              </text>

              {/* Table headers */}
              <text
                x="330"
                y="685"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--muted-foreground)"
                fontWeight="bold"
              >
                ID
              </text>
              <text
                x="430"
                y="685"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--muted-foreground)"
                fontWeight="bold"
              >
                Customer
              </text>
              <text
                x="680"
                y="685"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--muted-foreground)"
                fontWeight="bold"
              >
                Category
              </text>
              <text
                x="880"
                y="685"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--muted-foreground)"
                fontWeight="bold"
              >
                Status
              </text>
              <text
                x="1050"
                y="685"
                fontFamily="system-ui"
                fontSize="11"
                fill="var(--muted-foreground)"
                fontWeight="bold"
              >
                Priority
              </text>

              {/* Table rows */}
              {[
                {
                  id: "#CP-2847",
                  customer: "John Smith",
                  category: "Billing Issue",
                  status: "In Progress",
                  priority: "High",
                },
                {
                  id: "#CP-2846",
                  customer: "Sarah Johnson",
                  category: "Feature Request",
                  status: "Resolved",
                  priority: "Low",
                },
                {
                  id: "#CP-2845",
                  customer: "Mike Davis",
                  category: "Technical Support",
                  status: "Escalated",
                  priority: "Critical",
                },
              ].map((row, idx) => (
                <g key={idx}>
                  <line
                    x1="330"
                    y1={710 + idx * 50}
                    x2="1340"
                    y2={710 + idx * 50}
                    stroke="var(--border)"
                    strokeWidth="1"
                    opacity="0.1"
                  />
                  <text
                    x="330"
                    y={735 + idx * 50}
                    fontFamily="system-ui"
                    fontSize="12"
                    fill="var(--foreground)"
                  >
                    {row.id}
                  </text>
                  <text
                    x="430"
                    y={735 + idx * 50}
                    fontFamily="system-ui"
                    fontSize="12"
                    fill="var(--foreground)"
                  >
                    {row.customer}
                  </text>
                  <text
                    x="680"
                    y={735 + idx * 50}
                    fontFamily="system-ui"
                    fontSize="12"
                    fill="var(--muted-foreground)"
                  >
                    {row.category}
                  </text>

                  {/* Status Badge */}
                  <rect
                    x="880"
                    y={720 + idx * 50}
                    width="100"
                    height="24"
                    rx="6"
                    fill={
                      row.status === "In Progress"
                        ? "var(--primary)"
                        : row.status === "Resolved"
                          ? "var(--secondary)"
                          : "var(--destructive)"
                    }
                    opacity="0.15"
                  />
                  <text
                    x="930"
                    y={735 + idx * 50}
                    fontFamily="system-ui"
                    fontSize="12"
                    fill={
                      row.status === "In Progress"
                        ? "var(--primary)"
                        : row.status === "Resolved"
                          ? "var(--secondary)"
                          : "var(--destructive)"
                    }
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {row.status}
                  </text>

                  {/* Priority Badge */}
                  <rect
                    x="1050"
                    y={720 + idx * 50}
                    width="80"
                    height="24"
                    rx="6"
                    fill={
                      row.priority === "Critical"
                        ? "var(--destructive)"
                        : row.priority === "High"
                          ? "var(--primary)"
                          : "var(--secondary)"
                    }
                    opacity="0.15"
                  />
                  <text
                    x="1090"
                    y={735 + idx * 50}
                    fontFamily="system-ui"
                    fontSize="12"
                    fill={
                      row.priority === "Critical"
                        ? "var(--destructive)"
                        : row.priority === "High"
                          ? "var(--primary)"
                          : "var(--secondary)"
                    }
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {row.priority}
                  </text>
                </g>
              ))}
            </g>
          </svg>

          {/* Overlay Gradient - Fade effect on edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)] via-transparent to-transparent opacity-0 pointer-events-none" />
        </motion.div>

        {/* Interactive Demo CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[color:var(--primary)] hover:bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded-lg font-semibold flex items-center gap-2 group transition-all"
          >
            <Play size={18} weight="fill" />
            View Interactive Demo
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
            Schedule Product Tour
          </motion.button>
        </motion.div>

        {/* Features Highlight Below Dashboard */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:border-opacity-50 transition-all"
          >
            <h3 className="text-lg font-bold text-[color:var(--foreground)] mb-2">
              Real-Time Metrics
            </h3>
            <p className="text-sm text-[color:var(--muted-foreground)]">
              Live KPIs and analytics update instantly as your team works,
              giving you perfect visibility into operations.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-[color:var(--secondary)] hover:border-opacity-50 transition-all"
          >
            <h3 className="text-lg font-bold text-[color:var(--foreground)] mb-2">
              Smart Filtering
            </h3>
            <p className="text-sm text-[color:var(--muted-foreground)]">
              Advanced filters and search capabilities help you find exactly
              what you need in seconds, powered by AI.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] border border-[color:var(--border)] hover:border-amber-500 hover:border-opacity-50 transition-all"
          >
            <h3 className="text-lg font-bold text-[color:var(--foreground)] mb-2">
              Custom Views
            </h3>
            <p className="text-sm text-[color:var(--muted-foreground)]">
              Create personalized dashboards and views tailored to your team's
              specific needs and workflows.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

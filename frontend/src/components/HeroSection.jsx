
import { motion } from "motion/react";

import {
  FaArrowRight,
  FaRegCircleCheck,
} from "react-icons/fa6";

import {
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineDocumentText,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineArrowTrendingUp,
  HiOutlineBolt,
} from "react-icons/hi2";

import { MdOutlineAutoGraph } from "react-icons/md";

const stats = [
  { label: "Interviews", value: "21", change: "+5 this week" },
  { label: "Questions", value: "126", change: "Across all sessions" },
  { label: "Completed", value: "15", change: "Practice sessions" },
  { label: "Average score", value: "82%", change: "+12% improvement" },
];

const interviewHistory = [
  {
    title: "Frontend Developer",
    type: "Technical Interview",
    score: 92,
    date: "Today",
  },
  {
    title: "Product Designer",
    type: "HR Interview",
    score: 84,
    date: "Yesterday",
  },
];

const features = [
  "AI-powered mock interviews",
  "Personalized feedback",
  "Career growth roadmap",
];

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="relative isolate overflow-hidden bg-[#fafaff] px-5 pb-20 pt-16 text-slate-900 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-violet-300/20 blur-[120px]" />

        <div className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-indigo-300/20 blur-[130px]" />

        <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-purple-200/20 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(#64748b 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Hero Content */}
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
          >

            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/80 px-4 py-2 shadow-sm shadow-violet-100/50 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600" />
              </span>

              <span className="text-xs font-semibold tracking-wide text-violet-700">
                The Future of AI Interview Preparation
              </span>

              <HiOutlineSparkles className="text-sm text-violet-500" />
            </div>

            {/* Heading */}
            <h1 className="text-[42px] font-black leading-[1.12] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[64px] xl:text-[72px]">
              Your Next Big
              <span className="block">
                Opportunity
              </span>

              <span className="mt-1 block bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:mx-0">
              Practice smarter, not harder. Prepare for real-world interviews
              with intelligent AI agents, get personalized feedback, and build
              the confidence to land your dream job.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <motion.button
                type="button"
                onClick={onGetStarted}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40 sm:w-auto"
              >
                Get Started for Free

                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <HiOutlineBolt className="text-lg text-amber-500" />
                Start practicing today
              </div>
            </div>

            {/* Features */}
            <div className="mt-9 flex flex-wrap justify-center gap-x-5 gap-y-3 lg:justify-start">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs font-medium text-slate-500"
                >
                  <FaRegCircleCheck className="shrink-0 text-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Trust indicator */}
            <div className="mt-10 flex flex-col items-center gap-3 border-t border-slate-200/70 pt-7 sm:flex-row sm:justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["Y", "A", "R", "S"].map((letter, index) => (
                  <div
                    key={letter}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#fafaff] text-xs font-bold text-white ${
                      index % 2 === 0
                        ? "bg-violet-600"
                        : "bg-indigo-600"
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-1 text-amber-400 sm:justify-start">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <span key={item}>★</span>
                  ))}
                </div>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Built for ambitious job seekers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[650px] lg:mx-0"
          >

            {/* Decorative Glow */}
            <div className="absolute -inset-5 -z-10 rounded-[35px] bg-gradient-to-br from-violet-300/30 via-indigo-300/20 to-purple-300/30 blur-2xl" />

            {/* Main Dashboard */}
            <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_25px_90px_-25px_rgba(79,70,229,0.25)] sm:rounded-3xl">

              {/* Browser Header */}
              <div className="flex h-12 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="hidden h-6 w-44 items-center justify-center rounded-md bg-slate-50 text-[9px] text-slate-400 sm:flex">
                  app.intervexa.ai/dashboard
                </div>

                <HiOutlineSparkles className="text-lg text-violet-600" />
              </div>

              <div className="grid min-h-[390px] sm:min-h-[440px] md:grid-cols-[145px_1fr]">

                {/* Sidebar */}
                <aside className="hidden border-r border-slate-100 bg-white p-4 md:flex md:flex-col">

                  <div className="flex items-center gap-2 border-b border-slate-100 pb-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                      <HiOutlineSparkles className="text-lg" />
                    </div>

                    <span className="text-xs font-extrabold tracking-tight text-slate-900">
                      Intervexa<span className="text-violet-600">AI</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onGetStarted}
                    className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-2 py-2.5 text-[10px] font-semibold text-white transition hover:bg-violet-700"
                  >
                    <span>+</span>
                    Create Interview
                  </button>

                  <p className="mb-3 mt-7 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    Workspace
                  </p>

                  {[
                    { label: "Dashboard", icon: HiOutlineSquares2X2, active: true },
                    { label: "Resume Scorer", icon: HiOutlineDocumentText },
                    { label: "Career Roadmap", icon: HiOutlineAcademicCap },
                    { label: "Analytics", icon: HiOutlineChartBar },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-[10px] font-medium ${
                          item.active
                            ? "bg-violet-50 text-violet-700"
                            : "text-slate-400"
                        }`}
                      >
                        <Icon className="text-sm" />
                        {item.label}
                      </div>
                    );
                  })}

                  <div className="mt-auto rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 p-3 text-white">
                    <p className="text-[9px] text-white/60">
                      Interview Coins
                    </p>

                    <p className="mt-1 text-lg font-bold">120</p>

                    <div className="mt-2 h-1 rounded-full bg-white/20">
                      <div className="h-full w-2/3 rounded-full bg-violet-400" />
                    </div>
                  </div>
                </aside>

                {/* Dashboard Content */}
                <div className="min-w-0 bg-[#f8f9fd] p-4 sm:p-6">

                  {/* Dashboard Heading */}
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Your Workspace
                      </p>

                      <h2 className="mt-1 text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
                        Welcome back! 👋
                      </h2>

                      <p className="mt-1 text-[10px] text-slate-400">
                        Track your interview preparation progress.
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white text-violet-600 shadow-sm">
                      <HiOutlineSparkles />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        whileHover={{ y: -3 }}
                        className={`rounded-xl border border-white p-3 shadow-sm ${
                          index === 3
                            ? "bg-gradient-to-br from-violet-600 to-indigo-700 text-white"
                            : "bg-white text-slate-900"
                        }`}
                      >
                        <p
                          className={`text-[9px] ${
                            index === 3 ? "text-white/70" : "text-slate-400"
                          }`}
                        >
                          {stat.label}
                        </p>

                        <p className="mt-2 text-xl font-extrabold tracking-tight">
                          {stat.value}
                        </p>

                        <p
                          className={`mt-1 text-[8px] ${
                            index === 3 ? "text-white/60" : "text-emerald-600"
                          }`}
                        >
                          {stat.change}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Performance */}
                  <div className="mt-5 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">
                          Performance Overview
                        </h3>

                        <p className="mt-1 text-[9px] text-slate-400">
                          Your recent interview performance
                        </p>
                      </div>

                      <MdOutlineAutoGraph className="text-xl text-violet-600" />
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-2">
                      {[35, 55, 43, 72, 58, 88, 100].map((height, index) => (
                        <div
                          key={index}
                          className="flex flex-1 flex-col items-center gap-2"
                        >
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height * 0.75}px` }}
                            transition={{
                              duration: 0.8,
                              delay: 0.3 + index * 0.08,
                            }}
                            className={`w-full max-w-8 rounded-t-md ${
                              index === 6
                                ? "bg-gradient-to-t from-violet-700 to-indigo-500"
                                : "bg-violet-100"
                            }`}
                          />

                          <span className="text-[8px] text-slate-400">
                            W{index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Interviews */}
                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">
                          Recent Interviews
                        </h3>

                        <p className="mt-1 text-[9px] text-slate-400">
                          Your latest practice sessions
                        </p>
                      </div>

                      <span className="text-[9px] font-semibold text-violet-600">
                        View all
                      </span>
                    </div>

                    <div className="space-y-2">
                      {interviewHistory.map((item, index) => (
                        <div
                          key={item.title}
                          className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-3"
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                              <MdOutlineAutoGraph />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-[10px] font-bold text-slate-800">
                                {item.title}
                              </p>

                              <p className="mt-1 text-[8px] text-slate-400">
                                {item.type} · {item.date}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-xs font-extrabold text-slate-900">
                              {item.score}%
                            </p>

                            <p className="mt-0.5 text-[8px] font-semibold text-emerald-600">
                              Excellent
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Floating AI Feedback Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute -right-2 top-[15%] hidden rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl shadow-indigo-950/10 backdrop-blur-xl sm:block lg:-right-12"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <HiOutlineArrowTrendingUp className="text-xl" />
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-900">
                    Great Progress!
                  </p>

                  <p className="mt-0.5 text-[9px] text-slate-400">
                    Your skills are improving
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating AI Assistant Card */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute -bottom-7 -left-2 hidden rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl shadow-indigo-950/10 backdrop-blur-xl sm:block lg:-left-10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                  <HiOutlineSparkles className="text-xl" />
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-900">
                    AI Interview Coach
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    <p className="text-[9px] text-slate-400">
                      Ready to help you
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Bottom Feature Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-24 grid grid-cols-1 gap-5 border-t border-slate-200/70 pt-9 sm:grid-cols-3 sm:gap-8"
        >
          {[
            {
              icon: HiOutlineSparkles,
              title: "Multi-Agent AI",
              description: "Intelligent agents for realistic interview practice.",
            },
            {
              icon: HiOutlineAcademicCap,
              title: "Personalized Learning",
              description: "Improve your skills with tailored career roadmaps.",
            },
            {
              icon: HiOutlineChartBar,
              title: "Detailed Analytics",
              description: "Understand your strengths and track your growth.",
            },
          ].map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl text-violet-700">
                  <Icon />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <p className="mt-12 text-center text-[10px] font-semibold tracking-[0.2em] text-slate-400">
          YOUR JOURNEY TO CAREER SUCCESS STARTS HERE
        </p>

      </div>
    </section>
  );
};

export default HeroSection;

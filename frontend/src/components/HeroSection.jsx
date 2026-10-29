import { motion } from "motion/react";
import {
  FaArrowRight,
  FaRegClock,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineAutoGraph } from "react-icons/md";

const stats = [
  { label: "Total Interviews", value: "21", detail: "+5 this week" },
  { label: "Questions Solved", value: "126", detail: "Across all sessions" },
  { label: "Completed", value: "15", detail: "Practice sessions" },
  { label: "Average Score", value: "23/100", detail: "Keep improving" },
];

const interviewHistory = [
  { title: "Technical Interview", score: 82, date: "Oct 24, 2026" },
  { title: "HR Interview", score: 76, date: "Oct 22, 2026" },
];

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f8] px-5 pb-24 pt-16 text-[#111111] sm:px-8 sm:pt-20 lg:px-12 lg:pb-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-violet-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-gray-600 shadow-sm">
            <HiOutlineSparkles className="text-sm text-violet-600" />
            Multi-Agent Interview Platform
          </div>

          <h1 className="text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Job Interviews
            <span className="block text-[#a4a4a4]">
              Don&apos;t Have to Suck
            </span>
            <span className="block">Anymore!</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            IntervexaAI is an AI-powered interview preparation platform
            designed to help job seekers improve their skills, practice with
            intelligent agents, and walk into every interview with confidence.
          </p>

          <motion.button
            type="button"
            onClick={onGetStarted}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#292929] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-black/15 transition hover:bg-black"
          >
            Get started for free
            <FaArrowRight className="text-xs" />
          </motion.button>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <FaRegCircleCheck className="text-emerald-600" />
              AI-powered practice
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaRegCircleCheck className="text-emerald-600" />
              Personalized feedback
            </span>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_30px_100px_-35px_rgba(0,0,0,0.22)] sm:mt-20"
        >
          <div className="grid min-h-[440px] md:grid-cols-[190px_1fr]">
            {/* Sidebar */}
            <aside className="hidden border-r border-gray-100 bg-white p-4 md:flex md:flex-col">
              <div className="flex items-center gap-2.5 border-b border-gray-100 pb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white">
                  <HiOutlineSparkles className="text-lg" />
                </div>
                <span className="text-sm font-bold tracking-tight">
                  Intervexa<span className="text-violet-600">AI</span>
                </span>
              </div>

              <button
                type="button"
                onClick={onGetStarted}
                className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-black px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-700"
              >
                <span>+</span> Create Interview
              </button>

              <p className="mb-3 mt-7 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Workspace
              </p>

              {["Dashboard", "Resume Builder", "Roadmap Builder", "Interview History"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={`mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[11px] ${
                      index === 0
                        ? "bg-gray-100 font-semibold text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    {item}
                  </div>
                )
              )}

              <div className="mt-auto rounded-xl border border-gray-100 bg-gray-50 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    A
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold">Ankush</p>
                    <p className="text-[9px] text-gray-400">Free plan</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main dashboard */}
            <div className="min-w-0 bg-[#fcfcfc] p-4 sm:p-6 lg:p-8">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
                    Overview
                  </p>
                  <h2 className="mt-1 text-lg font-bold tracking-tight sm:text-xl">
                    Hello, Ankush 👋
                  </h2>
                  <p className="mt-1 text-xs text-gray-400">
                    Here&apos;s your interview preparation progress.
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600">
                  <HiOutlineSparkles />
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -3 }}
                    className={`rounded-xl border border-white/10 p-4 text-white shadow-lg ${
                      index === 3
                        ? "bg-gradient-to-br from-violet-800 to-indigo-950"
                        : "bg-gradient-to-br from-[#292929] to-[#101010]"
                    }`}
                  >
                    <p className="text-[10px] leading-4 text-white/60">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[9px] text-white/50">
                      {stat.detail}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Interview history */}
              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold">Interview History</h3>
                    <p className="mt-1 text-[10px] text-gray-400">
                      Your recent performance
                    </p>
                  </div>
                  <MdOutlineAutoGraph className="text-xl text-violet-600" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {interviewHistory.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-gray-100 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                            <MdOutlineAutoGraph />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">{item.title}</p>
                            <p className="mt-1 text-[10px] text-gray-400">
                              {item.date}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold">{item.score}%</span>
                      </div>

                      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <FaRegClock />
                          Practice completed
                        </span>
                        <span className="font-medium text-emerald-600">
                          {item.score >= 80 ? "Excellent" : "Good progress"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-5 text-center text-[10px] tracking-wide text-gray-400">
          YOUR PERSONAL AI INTERVIEW COACH
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
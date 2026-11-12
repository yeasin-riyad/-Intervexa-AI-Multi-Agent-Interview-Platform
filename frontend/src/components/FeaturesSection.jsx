import { motion } from "motion/react";

import {
  HiOutlineDocumentText,
  HiOutlineMicrophone,
  HiOutlineChartBar,
  HiOutlineMap,
  HiOutlineSparkles,
  HiOutlineArrowUpRight,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

import { FaArrowRight } from "react-icons/fa6";

const agents = [
  {
    title: "Resume Agent",
    subtitle: "Build your foundation",
    description:
      "Create ATS-friendly resumes, strengthen your professional profile, and highlight the skills that make you stand out.",
    icon: HiOutlineDocumentText,
    number: "01",
    accent: "violet",
    features: ["ATS Optimization", "Profile Analysis"],
  },
  {
    title: "Interview Agent",
    subtitle: "Practice with confidence",
    description:
      "Experience realistic HR, technical, and coding interviews through intelligent AI-powered interview simulations.",
    icon: HiOutlineMicrophone,
    number: "02",
    accent: "indigo",
    features: ["Mock Interviews", "Real-time Practice"],
  },
  {
    title: "Feedback Agent",
    subtitle: "Understand your performance",
    description:
      "Analyze your answers with detailed scoring, communication insights, and actionable improvement suggestions.",
    icon: HiOutlineChartBar,
    number: "03",
    accent: "blue",
    features: ["Performance Scoring", "Smart Insights"],
  },
  {
    title: "Roadmap Agent",
    subtitle: "Plan your next move",
    description:
      "Discover skill gaps and follow a personalized learning roadmap designed around your career goals.",
    icon: HiOutlineMap,
    number: "04",
    accent: "purple",
    features: ["Skill Gap Analysis", "Learning Resources"],
  },
];

const accentStyles = {
  violet: {
    icon: "bg-violet-100 text-violet-700",
    glow: "bg-violet-400",
    number: "text-violet-200",
    line: "from-violet-500 to-fuchsia-500",
    tag: "bg-violet-50 text-violet-700",
  },
  indigo: {
    icon: "bg-indigo-100 text-indigo-700",
    glow: "bg-indigo-400",
    number: "text-indigo-200",
    line: "from-indigo-500 to-blue-500",
    tag: "bg-indigo-50 text-indigo-700",
  },
  blue: {
    icon: "bg-blue-100 text-blue-700",
    glow: "bg-blue-400",
    number: "text-blue-200",
    line: "from-blue-500 to-cyan-500",
    tag: "bg-blue-50 text-blue-700",
  },
  purple: {
    icon: "bg-purple-100 text-purple-700",
    glow: "bg-purple-400",
    number: "text-purple-200",
    line: "from-purple-500 to-pink-500",
    tag: "bg-purple-50 text-purple-700",
  },
};

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative isolate overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-10"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[350px] w-[350px] rounded-full bg-violet-100/70 blur-[120px]" />

        <div className="absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-indigo-100/60 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
            backgroundSize: "25px 25px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/80 px-4 py-2">
            <HiOutlineSparkles className="text-base text-violet-600" />

            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700">
              Meet Your AI Career Team
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-black leading-[1.15] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[54px]">
            Everything You Need
            <span className="mt-1 block bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              To Land Your Dream Job.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
            Meet your personal AI-powered career team. Four specialized agents
            work together to help you prepare, practice, improve, and move
            confidently toward your next opportunity.
          </p>
        </motion.div>

        {/* Agent Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const style = accentStyles[agent.accent];

            return (
              <motion.article
                key={agent.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -8 }}
                className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_-20px_rgba(15,23,42,0.18)] transition-all duration-300 hover:border-violet-200 hover:shadow-[0_25px_55px_-25px_rgba(99,102,241,0.25)] sm:p-7"
              >
                {/* Hover Glow */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${style.glow} opacity-0 blur-[65px] transition-opacity duration-500 group-hover:opacity-20`}
                />

                {/* Top */}
                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.icon} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="text-[27px]" />
                  </div>

                  <span
                    className={`text-4xl font-black tracking-tighter ${style.number}`}
                  >
                    {agent.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative mt-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
                    {agent.subtitle}
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900">
                    {agent.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-7 text-slate-500">
                    {agent.description}
                  </p>
                </div>

                {/* Features */}
                <div className="relative mt-5 space-y-2.5">
                  {agent.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-[11px] font-medium text-slate-600"
                    >
                      <HiOutlineCheckCircle
                        className={`text-base ${style.tag.split(" ")[1]}`}
                      />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Bottom */}
                <div className="relative mt-auto pt-7">
                  <div
                    className={`h-[3px] w-10 rounded-full bg-gradient-to-r ${style.line} transition-all duration-300 group-hover:w-full`}
                  />
                </div>

                {/* Corner Decoration */}
                <HiOutlineArrowUpRight className="absolute bottom-6 right-6 text-lg text-slate-200 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-500" />
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#29204f] via-[#43318a] to-[#3730a3] px-6 py-9 text-white shadow-xl shadow-indigo-900/10 sm:px-10 sm:py-11"
        >
          {/* CTA Decoration */}
          <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full border-[35px] border-white/[0.05]" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-violet-400/20 blur-[80px]" />

          <div className="relative flex flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-violet-200">
                <HiOutlineSparkles className="text-base" />
                YOUR CAREER JOURNEY STARTS HERE
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Ready to become interview-ready?
              </h3>

              <p className="mt-2 max-w-xl text-xs leading-6 text-white/65 sm:text-sm">
                Start practicing with your AI career team and take the next step
                toward your dream job.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-violet-50"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Explore IntervexaAI
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

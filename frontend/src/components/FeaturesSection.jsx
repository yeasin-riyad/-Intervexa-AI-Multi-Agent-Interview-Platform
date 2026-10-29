import { motion } from "motion/react";
import {
  HiOutlineDocumentText,
  HiOutlineMicrophone,
  HiOutlineChartBar,
  HiOutlineMap,
  HiOutlineSparkles,
} from "react-icons/hi2";

const agents = [
  {
    title: "Resume Agent",
    description:
      "Create ATS-friendly resumes, improve your profile strength, and discover opportunities that match your skills.",
    icon: HiOutlineDocumentText,
    number: "01",
  },
  {
    title: "Interview Agent",
    description:
      "Practice realistic HR, technical, and coding interviews with intelligent AI-powered simulations.",
    icon: HiOutlineMicrophone,
    number: "02",
  },
  {
    title: "Feedback Agent",
    description:
      "Get detailed answer analysis, performance scoring, actionable insights, and personalized recommendations.",
    icon: HiOutlineChartBar,
    number: "03",
  },
  {
    title: "Roadmap Agent",
    description:
      "Follow a personalized learning roadmap built around your goals, skill gaps, and interview performance.",
    icon: HiOutlineMap,
    number: "04",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#f7f7f8] px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-gray-600">
            <HiOutlineSparkles className="text-sm text-violet-600" />
            AI Powered Agents
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Specialized Agents For
            <span className="block text-[#a4a4a4]">
              Every Interview Stage
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            IntervexaAI brings specialized AI agents together to help you build
            your resume, practice interviews, receive meaningful feedback, and
            follow a personalized roadmap toward your dream job.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {agents.map((agent, index) => {
            const Icon = agent.icon;

            return (
              <motion.article
                key={agent.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -7 }}
                className="group relative flex min-h-[230px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#383838] to-[#242424] p-5 text-white shadow-[0_16px_35px_-18px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_24px_45px_-18px_rgba(0,0,0,0.5)] sm:p-6"
              >
                <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/0 blur-3xl transition-colors duration-500 group-hover:bg-violet-500/20" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-xl text-white/80 transition-all duration-300 group-hover:border-violet-400/30 group-hover:bg-violet-500/15 group-hover:text-violet-300">
                    <Icon />
                  </div>

                  <span className="text-[10px] font-medium tracking-[0.15em] text-white/25">
                    AGENT {agent.number}
                  </span>
                </div>

                <h3 className="relative mt-5 text-base font-bold tracking-tight">
                  {agent.title}
                </h3>

                <p className="relative mt-2 text-xs leading-6 text-white/55">
                  {agent.description}
                </p>

                <div className="relative mt-auto flex items-center gap-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  AI powered
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
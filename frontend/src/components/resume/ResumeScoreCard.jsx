
import { motion } from "motion/react";
import { HiOutlineBriefcase, HiOutlineSparkles } from "react-icons/hi2";

const ResumeScoreCard = ({ resume }) => {
  const score = Math.min(100, Math.max(0, Number(resume?.score) || 0));

  const getScoreLabel = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  const getScoreColor = () => {
    if (score >= 85) return "#22C55E";
    if (score >= 70) return "#F59E0B";
    if (score >= 50) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-[#171717] p-5 text-white shadow-xl shadow-black/5 sm:p-7 lg:p-8"
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">

        {/* Circular Score */}
        <div
          className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full sm:h-36 sm:w-36"
          style={{
            background: `conic-gradient(${getScoreColor()} ${score * 3.6}deg, #3A3A3A 0deg)`,
          }}
        >
          <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full bg-[#171717]">
            <div className="text-center">
              <p className="text-3xl font-bold tracking-tight">
                {score}
                <span className="text-xs font-medium text-gray-500">
                  /100
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Score Details */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-medium text-gray-400">
            Resume Score
          </p>

          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
            {getScoreLabel()}
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-purple-300 sm:justify-start">
            <HiOutlineBriefcase className="text-lg" />
            <span>{resume?.suggestedRole || "Career Role Not Identified"}</span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500 sm:justify-start">
            <HiOutlineSparkles className="text-purple-400" />
            AI-powered resume evaluation
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default ResumeScoreCard;

import { motion } from "motion/react";
import InterviewChartCard from "./InterviewChartCard";

const PerformanceSection = ({ interviews }) => {
  return (
    <section className="mt-8">
      <div className="mb-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
          Performance
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            Interview History
          </h2>

          <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-500">
            {interviews.reduce((sum, item) => sum + item.count, 0)} sessions
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {interviews.map((interview, index) => (
          <InterviewChartCard
            key={interview.title}
            interview={interview}
            index={index}
          />
        ))}
      </div>

      {interviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center"
        >
          <p className="font-semibold text-gray-800">No interview history yet</p>
          <p className="mt-2 text-sm text-gray-500">
            Complete your first interview to see your performance here.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default PerformanceSection;
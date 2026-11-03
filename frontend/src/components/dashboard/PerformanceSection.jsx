
import { motion } from "motion/react";
import InterviewChartCard from "./InterviewChartCard";

const dummyInterviews = [
  {
    title: "Technical Interview",
    count: 8,
    averageScore: 85,
    data: [
      { date: "Oct 01", score: 65 },
      { date: "Oct 05", score: 72 },
      { date: "Oct 09", score: 68 },
      { date: "Oct 14", score: 80 },
      { date: "Oct 18", score: 76 },
      { date: "Oct 24", score: 85 },
      { date: "Oct 28", score: 90 },
      { date: "Nov 02", score: 92 },
    ],
  },
  {
    title: "HR Interview",
    count: 5,
    averageScore: 82,
    data: [
      { date: "Oct 03", score: 60 },
      { date: "Oct 08", score: 70 },
      { date: "Oct 13", score: 75 },
      { date: "Oct 20", score: 85 },
      { date: "Oct 29", score: 82 },
    ],
  },
  {
    title: "Frontend Developer",
    count: 6,
    averageScore: 88,
    data: [
      { date: "Oct 04", score: 72 },
      { date: "Oct 10", score: 78 },
      { date: "Oct 15", score: 82 },
      { date: "Oct 19", score: 85 },
      { date: "Oct 25", score: 90 },
      { date: "Nov 01", score: 88 },
    ],
  },
  {
    title: "Backend Developer",
    count: 4,
    averageScore: 76,
    data: [
      { date: "Oct 06", score: 55 },
      { date: "Oct 12", score: 68 },
      { date: "Oct 21", score: 75 },
      { date: "Oct 30", score: 76 },
    ],
  },
];

const PerformanceSection = ({ interviews = dummyInterviews }) => {
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
          <p className="font-semibold text-gray-800">
            No interview history yet
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Complete your first interview to see your performance here.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default PerformanceSection;

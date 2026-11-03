import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "motion/react";
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

const InterviewChartCard = ({ interview=dummyInterviews, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      className="min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#292929] to-[#171717] p-4 text-white shadow-lg shadow-black/5 sm:p-5"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-white/90">
            {interview.title}
          </p>
          <p className="mt-1 text-[10px] text-white/40">
            {interview.count} completed sessions
          </p>
        </div>

        <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[10px] text-white/60">
          Performance
        </span>
      </div>

      <div className="h-[250px] w-full sm:h-[285px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={interview.data}
            cx="50%"
            cy="50%"
            outerRadius="65%"
          >
            <PolarGrid stroke="rgba(255,255,255,0.12)" />

            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: "#a3a3a3",
                fontSize: 10,
              }}
            />

            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />

            <Radar
              name="Score"
              dataKey="score"
              stroke="#e5e7eb"
              strokeWidth={2}
              fill="#d1d5db"
              fillOpacity={0.18}
              isAnimationActive
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#202020",
                border: "1px solid #444",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "12px",
              }}
              formatter={(value) => [`${value}/100`, "Score"]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 border-t border-white/10 pt-4 text-center">
        <h3 className="text-sm font-semibold">{interview.title}</h3>
        <p className="mt-1 text-[10px] text-white/40">
          Average performance by skill
        </p>
      </div>
    </motion.article>
  );
};

export default InterviewChartCard;
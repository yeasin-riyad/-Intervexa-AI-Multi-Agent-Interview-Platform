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

const InterviewChartCard = ({ interview, index = 0 }) => {
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
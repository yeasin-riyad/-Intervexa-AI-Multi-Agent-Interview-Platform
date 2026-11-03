import StatCard from "./StatCard";


const StatsGrid = () => {
  const stats = [
  { label: "Total Interviews", value: "21", detail: "+5 this week" },
  { label: "Questions Solved", value: "126", detail: "Across all sessions" },
  { label: "Completed", value: "15", detail: "Practice sessions" },
  { label: "Average Score", value: "23/100", detail: "Keep improving" },
];
  return (
    <section
      aria-label="Interview statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </section>
  );
};

export default StatsGrid;
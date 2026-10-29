import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {
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
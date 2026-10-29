import { motion } from "motion/react";

const StatCard = ({ stat, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className="min-w-0 rounded-2xl border border-white/10 bg-gradient-to-br from-[#292929] to-[#171717] p-5 text-white shadow-lg shadow-black/5 sm:p-6"
    >
      <p className="text-[10px] font-bold tracking-[0.12em] text-white/45 sm:text-[11px]">
        {stat.label}
      </p>

      <h3 className="mt-3 break-words text-2xl font-bold tracking-tight sm:text-3xl">
        {stat.value}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold text-white/80">
          {stat.badge}
        </span>

        <span className="text-[10px] leading-4 text-white/40">
          {stat.description}
        </span>
      </div>
    </motion.article>
  );
};

export default StatCard;
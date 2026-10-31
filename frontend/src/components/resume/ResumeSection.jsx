
import { motion } from "motion/react";

const ResumeSection = ({
  title,
  items = [],
  icon: Icon,
  color = "purple",
  emptyMessage = "No information available.",
}) => {
  const colors = {
    green: {
      icon: "text-emerald-400",
      badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    },
    yellow: {
      icon: "text-amber-400",
      badge: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    },
    red: {
      icon: "text-red-400",
      badge: "border-red-500/20 bg-red-500/10 text-red-300",
    },
    purple: {
      icon: "text-purple-400",
      badge: "border-purple-500/20 bg-purple-500/10 text-purple-300",
    },
    blue: {
      icon: "text-blue-400",
      badge: "border-blue-500/20 bg-blue-500/10 text-blue-300",
    },
  };

  const theme = colors[color] || colors.purple;

  const validItems = Array.isArray(items)
    ? items.filter(Boolean)
    : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full rounded-2xl border border-white/[0.07] bg-[#171717] p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center gap-2.5">
        {Icon && (
          <Icon className={`shrink-0 text-xl ${theme.icon}`} />
        )}

        <h3 className="text-sm font-semibold text-white sm:text-base">
          {title}
        </h3>

        <span className="ml-auto rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-gray-400">
          {validItems.length}
        </span>
      </div>

      {validItems.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {validItems.map((item, index) => (
            <span
              key={`${title}-${index}`}
              className={`max-w-full break-words rounded-lg border px-3 py-2 text-xs font-medium leading-relaxed sm:text-sm ${theme.badge}`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          {emptyMessage}
        </p>
      )}
    </motion.section>
  );
};

export default ResumeSection;

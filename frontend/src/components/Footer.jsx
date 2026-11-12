import { motion } from "motion/react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white px-3 py-5 sm:px-5 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-7xl flex-row flex-nowrap items-center justify-center gap-1 sm:gap-1.5"
      >
        <p className="whitespace-nowrap text-xs text-slate-500 sm:text-sm">
          Made with
        </p>

        <span
          className="shrink-0 text-xs text-rose-500 sm:text-sm"
          aria-label="love"
        >
          ♥
        </span>

        <p className="whitespace-nowrap text-xs text-slate-500 sm:text-sm">
          by
        </p>

        <span className="whitespace-nowrap text-xs font-bold text-slate-900 transition-colors hover:text-indigo-600 sm:text-sm">
          Yeasin Riyad
        </span>
      </motion.div>
    </footer>
  );
};

export default Footer;
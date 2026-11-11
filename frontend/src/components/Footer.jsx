
import { motion } from "motion/react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 sm:flex-row sm:gap-1"
      >
        <p className="text-sm text-slate-500">
          Made with
        </p>

        <span className="text-sm text-rose-500" aria-label="love">
          ♥
        </span>

        <p className="text-sm text-slate-500">
          by
        </p>

        <span className="text-sm font-bold text-slate-900 transition-colors hover:text-indigo-600">
          Yeasin Riyad
        </span>
      </motion.div>
    </footer>
  );
};

export default Footer;

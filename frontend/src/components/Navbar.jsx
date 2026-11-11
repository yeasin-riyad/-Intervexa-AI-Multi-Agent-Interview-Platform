
import { motion } from "motion/react";
import { GiArtificialHive } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ onLoginClick }) => {
 

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-100 to-violet-100 text-3xl text-indigo-600 shadow-sm shadow-indigo-100"
          >
            <GiArtificialHive />
          </motion.div>

          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Intervexa
              <span className="text-indigo-600">AI</span>
            </span>

            <p className="text-[10px] font-semibold tracking-[0.22em] text-slate-400">
              INTELLIGENT INTERVIEWING
            </p>
          </div>
        </Link>

     

        {/* Login Button */}
        <motion.button
          type="button"
          onClick={onLoginClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition-all duration-300 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg hover:shadow-indigo-200"
        >
          Log In

          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;

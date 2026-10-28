
import { useState } from "react";
import { motion } from "motion/react";
import { GiArtificialHive } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import LoginModal from "../components/LoginModal";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080B14]/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-3xl text-violet-300 shadow-lg shadow-violet-500/10"
            >
              <GiArtificialHive />
            </motion.div>

            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                Intervexa
                <span className="text-violet-400">AI</span>
              </span>
              <p className="text-[10px] font-medium tracking-[0.22em] text-gray-500">
                INTELLIGENT INTERVIEWING
              </p>
            </div>
          </a>

          {/* Navigation links */}
          <div className="hidden items-center gap-8 text-sm font-medium text-gray-400 md:flex">
            {[
              { label: "Home", href: "/" },
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Technology", href: "#technology" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-2 transition-colors duration-200 hover:text-white"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-violet-400 transition-all duration-300 hover:w-full" />
              </a>
            ))}
          </div>

          {/* Login button */}
          <motion.button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2 rounded-xl border border-violet-400/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/10"
          >
            Log In
            <FaArrowRight className="text-xs text-violet-300 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Login modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Home;

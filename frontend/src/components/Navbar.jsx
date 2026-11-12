
import { useState } from "react";
import { motion } from "motion/react";
import { GiArtificialHive } from "react-icons/gi";
import {
  FaArrowRight,
  FaUserSecret,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../utils/axios";
import { setUserData } from "../redux/userSlice";
import toast from "react-hot-toast";

const Navbar = ({ onLoginClick, user, setUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState("");

  // Demo Login
  const handleDemoLogin = async () => {
    try {
      setLoading("demo");

      const { data } = await api.post("/api/auth/demo-login", {});

      if (!data.success) {
        throw new Error(data.message || "Demo login failed.");
      }

      dispatch(setUserData(data.user));
      setUser(data.user);

      toast.success("Welcome to IntervexaAI Demo!");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Demo login error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to enter demo mode."
      );
    } finally {
      setLoading("");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      setLoading("logout");

      await api.post("/api/auth/logout", {});

      dispatch(setUserData(null));
      setUser(null);

      toast.success("Logged out successfully!");

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to logout. Please try again."
      );
    } finally {
      setLoading("");
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4 lg:px-12">

        {/* Logo */}
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
        >
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-100 to-violet-100 text-2xl text-indigo-600 shadow-sm shadow-indigo-100 sm:h-11 sm:w-11 sm:rounded-2xl sm:text-3xl"
          >
            <GiArtificialHive />
          </motion.div>

          <div className="min-w-0">
            <span className="whitespace-nowrap text-base font-bold tracking-tight text-slate-900 sm:text-xl">
              Intervexa
              <span className="text-indigo-600">AI</span>
            </span>

            <p className="hidden text-[9px] font-semibold tracking-[0.15em] text-slate-400 min-[380px]:block sm:text-[10px] sm:tracking-[0.22em]">
              INTELLIGENT INTERVIEWING
            </p>
          </div>
        </Link>

        {/* Authentication Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 lg:gap-3">

          {user ? (
            <>
              {/* Dashboard */}
              <motion.button
                type="button"
                onClick={() => navigate("/dashboard")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-200/60 transition hover:from-indigo-700 hover:to-violet-700 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm lg:px-5"
              >
                <HiOutlineSquares2X2 className="shrink-0 text-base sm:text-lg" />
                <span>Dashboard</span>
              </motion.button>

              {/* Logout */}
              <motion.button
                type="button"
                onClick={handleLogout}
                disabled={!!loading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 sm:gap-2 sm:rounded-xl sm:px-3.5 sm:py-2.5 sm:text-sm lg:px-4"
              >
                <FaSignOutAlt className="shrink-0" />

                <span>
                  {loading === "logout" ? "Logging out..." : "Logout"}
                </span>
              </motion.button>
            </>
          ) : (
            <>
              {/* Google Login */}
              <motion.button
                type="button"
                onClick={onLoginClick}
                disabled={!!loading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-200/60 transition-all duration-300 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg disabled:opacity-60 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm lg:px-5"
              >
                Log In

                <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1 sm:text-xs" />
              </motion.button>

              {/* Demo Login */}
              <motion.button
                type="button"
                onClick={handleDemoLogin}
                disabled={!!loading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-2 text-xs font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:rounded-xl sm:px-3.5 sm:py-2.5 sm:text-sm lg:px-4"
              >
                {loading === "demo" ? (
                  <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-700 sm:h-4 sm:w-4" />
                ) : (
                  <FaUserSecret className="shrink-0 text-sm sm:text-base" />
                )}

                <span>
                  {loading === "demo" ? "Entering..." : "Demo Login"}
                </span>
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

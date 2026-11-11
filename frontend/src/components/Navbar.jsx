
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

      await api.post("/api/auth/logout", {}, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      setUser(null);

      toast.success("Logged out successfully!");

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);

      toast.error(
        error.response?.data?.message || "Unable to logout. Please try again."
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
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
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

        {/* Authentication Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {user ? (
            <>
              {/* Dashboard */}
              <motion.button
                type="button"
                onClick={() => navigate("/dashboard")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition hover:from-indigo-700 hover:to-violet-700 sm:px-5"
              >
                <HiOutlineSquares2X2 className="text-lg" />
                <span>Dashboard</span>
              </motion.button>

              {/* Logout */}
              <motion.button
                type="button"
                onClick={handleLogout}
                disabled={!!loading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 sm:px-4"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">
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
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition-all duration-300 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg sm:px-5"
              >
                Log In
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              {/* Demo Login */}
              <motion.button
                type="button"
                onClick={handleDemoLogin}
                disabled={!!loading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
              >
                {loading === "demo" ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-700" />
                ) : (
                  <FaUserSecret className="text-base" />
                )}

                <span className="hidden sm:inline">
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

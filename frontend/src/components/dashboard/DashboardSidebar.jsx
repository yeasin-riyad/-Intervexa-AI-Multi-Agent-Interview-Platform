
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineXMark,
  HiOutlineSquares2X2,
  HiOutlineCurrencyDollar,
  HiOutlineChevronRight,
} from "react-icons/hi2";

import { dashboardAgents, demoUser } from "../../data/dashboardData";

import UserProfile from "./UserProfile";
import ResumeUploadModal from "./ResumeUploadModal";

import {
  fetchResume,
  uploadResume,
} from "../../redux/resumeSlice";

const DashboardSidebar = ({
  user,
  isOpen,
  onClose,
  onCreateInterview,
  onLogout,
  onOpenResumeModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAnalyzing } = useSelector(
    (state) => state.resume
  );

 

  // Navigation items
  const navigation = [
    {
      label: "Dashboard",
      icon: HiOutlineSquares2X2,
      path: "/dashboard",
    },
    ...dashboardAgents.map((item) => ({
      ...item,
      path:
        item.path ||
        item.page ||
        `/${item.label.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  ];

  // Close mobile sidebar and navigate
  const navigateTo = (path) => {
    onClose?.();
    navigate(path);
  };

  // Resume navigation
  const handleResumeNavigation = async () => {
    try {
      await dispatch(fetchResume()).unwrap();

      navigateTo("/resume");

    } catch (error) {
      const status =
        error?.status ||
        error?.response?.status;

      // Resume does not exist
      if (status === 404) {
        onClose?.();
        onOpenResumeModal?.();
        return;
      }

      console.error("Failed to fetch resume:", error);

      alert(error?.message || "Unable to load resume.");
    }
  };

  // Upload and analyze resume
  const handleResumeAnalyze = async (file) => {
    try {
      await dispatch(uploadResume(file)).unwrap();

      navigate("/resume");

      onClose?.();

    } catch (error) {
      console.error("Resume analysis failed:", error);

      throw new Error(
        error?.message || "Resume analysis failed."
      );
    }
  };

  // Handle sidebar navigation
  const handleNavigation = (item) => {
    if (
      item.label === "Resume Scorer" ||
      item.path === "/resume"
    ) {
      handleResumeNavigation();
      return;
    }

    navigateTo(item.path);
  };

  // Active route detection
  const isActiveRoute = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  // Interview coin balance
  const coinBalance =
    user?.interviewCoins ??
    user?.interviewCoin ??
    demoUser.interviewCoins;

  // Sidebar UI
  const sidebarContent = (
    <div className="flex h-full min-h-0 flex-col bg-white">

      {/* Brand */}
      <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-gray-100 px-4">

        <button
          type="button"
          onClick={() => navigateTo("/dashboard")}
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-lg text-white shadow-md shadow-violet-500/20 transition-transform group-hover:scale-105">
            <HiOutlineSparkles />
          </div>

          <span className="text-[17px] font-extrabold tracking-tight text-gray-950">
            Intervexa<span className="text-violet-600">AI</span>
          </span>
        </button>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
        >
          <HiOutlineXMark className="text-xl" />
        </button>
      </div>

      {/* Create Interview */}
      <div className="shrink-0 px-3.5 pt-5">
        <button
          type="button"
          onClick={onCreateInterview}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-violet-500/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/20 active:translate-y-0"
        >
          <HiOutlinePlus className="text-base" />
          Create Interview
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3.5 pb-4 pt-7">

        <p className="mb-2.5 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
          Workspace
        </p>

        <div className="space-y-1">

          {navigation.map((item) => {
            const Icon = item.icon;

            const isResume =
              item.label === "Resume Scorer" ||
              item.path === "/resume";

            const isActive = isResume
              ? isActiveRoute("/resume")
              : isActiveRoute(item.path);

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigation(item)}
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-[10px] text-left text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
                }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-violet-600" />
                )}

                <Icon
                  className={`shrink-0 text-[18px] transition-colors ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-400 group-hover:text-gray-700"
                  }`}
                />

                <span className="flex-1 truncate">
                  {item.label}
                </span>

                {isActive && (
                  <HiOutlineChevronRight className="text-sm text-violet-400" />
                )}
              </button>
            );
          })}

        </div>
      </nav>

      {/* Interview Coins */}
      <div className="shrink-0 px-3.5 pb-3">

        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#25213B] via-[#19152D] to-[#100E1D] p-3.5 text-white">

          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-5 -top-8 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />

          <div className="relative flex items-center justify-between">

            <div className="flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/15">
                <HiOutlineCurrencyDollar className="text-base text-amber-300" />
              </div>

              <p className="text-[10px] font-bold tracking-[0.1em] text-white/60">
                INTERVIEW COINS
              </p>

            </div>

            <button
              type="button"
              onClick={onCreateInterview}
              aria-label="Get more interview coins"
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-lg transition hover:bg-white/20"
            >
              +
            </button>

          </div>

          <div className="relative mt-3 flex items-end justify-between">

            <div>
              <p className="text-[23px] font-bold leading-none tracking-tight">
                {coinBalance}
              </p>

              <p className="mt-1 text-[10px] text-white/45">
                Available balance
              </p>
            </div>

            <HiOutlineSparkles className="mb-0.5 text-xl text-amber-300/70" />

          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="shrink-0 border-t border-gray-100">
        <UserProfile
          user={user}
          onLogout={onLogout}
        />
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] border-r border-gray-100 bg-white lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close navigation backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 cursor-default bg-gray-950/40 backdrop-blur-[2px] lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-y-0 left-0 z-50 w-[min(270px,85vw)] overflow-hidden border-r border-gray-100 bg-white shadow-2xl lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </>
  );
};

export default DashboardSidebar;

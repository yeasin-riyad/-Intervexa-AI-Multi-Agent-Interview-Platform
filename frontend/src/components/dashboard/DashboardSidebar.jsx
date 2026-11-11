
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineXMark,
  HiOutlineSquares2X2,
  HiOutlineCurrencyDollar,
  HiOutlineChevronRight,
  HiOutlineExclamationTriangle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

import { dashboardAgents, demoUser } from "../../data/dashboardData";

import UserProfile from "./UserProfile";

import { fetchResume } from "../../redux/resumeSlice";
import toast from "react-hot-toast";

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

  // Logout modal states
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  // Navigation items
  const navigation = [
    {
      label: "Dashboard",
      icon: HiOutlineSquares2X2,
      path: "/dashboard",
    },

    ...dashboardAgents.map((item) => {
      let path =
        item.path ||
        item.page ||
        `/${item.label.toLowerCase().replace(/\s+/g, "-")}`;

      // Roadmap route according to App.jsx
      if (item.label.toLowerCase().includes("roadmap")) {
        path = "/roadmap";
      }

      return {
        ...item,
        path,
      };
    }),
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
    // Dashboard should only be active on exact match
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    // Other routes support nested pages
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

  // Open logout confirmation modal
  const handleLogoutRequest = () => {
    setLogoutError("");
    setIsLogoutModalOpen(true);
  };

  // Close logout confirmation modal
  const handleCancelLogout = () => {
    if (isLoggingOut) return;

    setIsLogoutModalOpen(false);
    setLogoutError("");
  };

  // Confirm logout

const handleConfirmLogout = async () => {
  if (isLoggingOut) return;

  try {
    setIsLoggingOut(true);
    setLogoutError("");

    if (typeof onLogout !== "function") {
      throw new Error("Logout function is not configured.");
    }

    // Call backend logout through DashboardLayout
    await onLogout();

    // Close sidebar and confirmation modal
    onClose?.();
    setIsLogoutModalOpen(false);

    // Show success toast
    toast.success("Logged out successfully! See you again.", {
      duration: 3000,
      position: "top-right",
    });

    // Navigate to login page
    navigate("/", { replace: true });

  } catch (error) {
    console.error("Logout failed:", error);

    const message =
      error?.message || "Something went wrong. Please try again.";

    setLogoutError(message);
    toast.error(message);

  } finally {
    setIsLoggingOut(false);
  }
};


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

            const isActive = isActiveRoute(item.path);

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
          onLogout={handleLogoutRequest}
        />
      </div>

    </div>
  );

  return (
    <>
      {/* Logout Confirmation Modal */}
<AnimatePresence>
  {isLogoutModalOpen && (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleCancelLogout}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[400px] rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl"
      >
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <HiOutlineArrowRightOnRectangle className="text-3xl" />
        </div>

        {/* Content */}
        <div className="mt-5 text-center">
          <h3
            id="logout-modal-title"
            className="text-xl font-bold text-slate-900"
          >
            Ready to leave?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Are you sure you want to log out of your IntervexaAI account?
            You'll need to sign in again to continue.
          </p>
        </div>

        {/* Error Message */}
        {logoutError && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-left text-xs text-red-600">
            <HiOutlineExclamationTriangle className="mt-0.5 shrink-0 text-base" />
            <span>{logoutError}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleCancelLogout}
            disabled={isLoggingOut}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmLogout}
            disabled={isLoggingOut}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingOut ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Logging out...
              </>
            ) : (
              <>
                <HiOutlineArrowRightOnRectangle className="text-base" />
                Yes, Log Out
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

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

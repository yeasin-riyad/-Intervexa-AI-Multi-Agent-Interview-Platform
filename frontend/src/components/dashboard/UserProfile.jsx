
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";

import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const navigate=useNavigate()

  // Open confirmation modal
  const handleLogoutRequest = () => {
    setLogoutError("");
    setIsModalOpen(true);
  };

  // Close confirmation modal
  const handleCancelLogout = () => {
    if (isLoggingOut) return;

    setIsModalOpen(false);
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

      // Execute logout function from parent
      await onLogout();

      // Close modal
      setIsModalOpen(false);

      // Success toast
      toast.success("Logged out successfully! See you again.", {
        duration: 3000,
        position: "top-right",
      });
      navigate("/");

    } catch (error) {
      console.error("Logout failed:", error);

      const message =
        error?.message || "Unable to logout. Please try again.";

      setLogoutError(message);
      toast.error(message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* User Profile */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
            {user?.initials ||
              user?.name
                ?.split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2) ||
              "U"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-gray-900">
              {user?.name || "Guest User"}
            </p>

            <p className="truncate text-[10px] text-gray-400">
              {user?.email || ""}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogoutRequest}
            title="Log out"
            aria-label="Log out"
            className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <HiOutlineArrowRightOnRectangle className="text-lg" />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
                  Are you sure you want to log out of your IntervexaAI
                  account? You'll need to sign in again to continue.
                </p>
              </div>

              {/* Error */}
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
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
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
    </>
  );
};

export default UserProfile;

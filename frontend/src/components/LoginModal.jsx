
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaXmark, FaShieldHalved } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { HiSparkles } from "react-icons/hi2";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleProvider }from "../../utils/firebase";
import api from "../../utils/axios";
import { setUserData } from "../redux/userSlice";



const LoginModal = ({ isOpen, onClose,setUser }) => {
  const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.user);
    console.log(userData,"UsaerDATA...")

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (token) => {
    const { data } = await api.post("/api/auth/login", { token });

    // Supports APIs returning either the user directly or { user, message }.
    dispatch(setUserData(data.user ?? data));
    setUser(data?.user)
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      await handleLogin(token);
      onClose();
    } catch (err) {
      console.error("Google login error:", err);

      if (err.code === "auth/popup-closed-by-user") {
        setError("The sign-in window was closed. Please try again.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Your browser blocked the popup. Please allow popups and try again.");
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to sign in. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="login-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0E1220] p-7 shadow-2xl shadow-violet-950/30 sm:p-9"
          >
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-violet-600/15 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-blue-600/10 blur-[80px]" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Close login modal"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaXmark />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Brand icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/20 to-blue-500/20 shadow-lg shadow-violet-500/10"
              >
                <HiSparkles className="text-4xl text-violet-300" />
              </motion.div>

              {/* Heading */}
              <div className="mb-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1.5 text-xs font-medium text-violet-300">
                  <HiSparkles />
                  Your AI interview journey starts here
                </div>

                <h2
                  id="login-title"
                  className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                >
                  Sign in to{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    IntervexaAI
                  </span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Prepare for your next big opportunity with personalized
                  AI-powered interviews and intelligent feedback.
                </p>
              </div>

              {/* Google login */}
              <button
                type="button"
                onClick={googleLogin}
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-5 py-3.5 text-sm font-semibold text-gray-900 transition duration-200 hover:bg-gray-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-violet-600" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    <FcGoogle className="text-xl" />
                    Continue with Google
                  </>
                )}
              </button>

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="mt-4 w-full rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-left text-xs leading-5 text-red-300"
                >
                  {error}
                </motion.p>
              )}

              {/* Security note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <FaShieldHalved className="text-emerald-400" />
                Secure authentication powered by Google and Firebase
              </div>

              <p className="mt-5 text-xs leading-5 text-gray-500">
                By continuing, you agree to our{" "}
                <a
                  href="/terms"
                  className="text-gray-300 underline decoration-white/20 underline-offset-4 transition hover:text-violet-300"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-gray-300 underline decoration-white/20 underline-offset-4 transition hover:text-violet-300"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;

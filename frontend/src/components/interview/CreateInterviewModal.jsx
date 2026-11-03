import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
    HiOutlineArrowLeft,
    HiOutlineArrowRight,
    HiOutlineBriefcase,
    HiOutlineCheckCircle,
    HiOutlineCloudArrowUp,
    HiOutlineDocumentText,
    HiOutlineExclamationCircle,
    HiOutlineSparkles,
    HiOutlineXMark,
} from "react-icons/hi2";

import { startInterviewApi } from "../../apis/interview.api.js";

const CreateInterviewModal = ({
    isOpen,
    onClose,
    user,
    resume,
    onOpenResumeModal,
    onInterviewStarted,
}) => {
    const [role, setRole] = useState("Backend Developer");
    const [type, setType] = useState("technical");
    const [useResume, setUseResume] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Check whether resume analysis data exists.
    const resumeReady = useMemo(() => {
        if (!resume || typeof resume !== "object") return false;

        return Object.keys(resume).length > 0;
    }, [resume]);

    // Automatically enable resume when valid resume data is available.
    useEffect(() => {
        if (resumeReady) {
            setUseResume(true);
        } else {
            setUseResume(false);
        }
    }, [resumeReady]);

    // Reset error when modal opens.
    useEffect(() => {
        if (isOpen) {
            setError("");
        }
    }, [isOpen]);

    const handleClose = () => {
        if (loading) return;

        setError("");
        onClose?.();
    };

    const handleUploadResume = () => {
        if (loading) return;

        onOpenResumeModal?.();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        setError("");

        const cleanedRole = role.trim();

        if (!cleanedRole) {
            setError("Please enter your target role.");
            return;
        }

        if (!["technical", "hr"].includes(type)) {
            setError("Please select a valid interview type.");
            return;
        }

        if (useResume && !resumeReady) {
            setError("Please upload and analyze your resume first.");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                role: cleanedRole,
                type,
                useResume,
                resume: useResume ? resume : {},
            };

            const result = await startInterviewApi(payload);

            if (!result?.success || !result?.interviewId) {
                throw new Error(
                    result?.message || "Unable to create interview."
                );
            }

            // Close modal only after successful API response.
            onClose?.();

            // Navigate using the result in the parent component.
            onInterviewStarted?.(result);

        } catch (err) {
            setError(
                err.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={(event) => {
                        if (
                            event.target === event.currentTarget &&
                            !loading
                        ) {
                            handleClose();
                        }
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ duration: 0.25 }}
                        className="relative my-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#101116] text-white shadow-2xl lg:grid-cols-[0.85fr_1.35fr]"
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            aria-label="Close modal"
                            className="absolute right-4 top-4 z-20 rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                        >
                            <HiOutlineXMark className="text-xl" />
                        </button>

                        {/* LEFT PANEL */}
                        <div className="hidden flex-col border-r border-white/[0.06] bg-[#0D0E13] p-8 lg:flex xl:p-10">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10"
                            >
                                <HiOutlineArrowLeft />
                                Back
                            </button>

                            <div>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl text-violet-400">
                                    <HiOutlineSparkles />
                                </div>

                                <h2 className="text-3xl font-bold leading-tight tracking-tight">
                                    Welcome back,
                                    <br />
                                    {user?.name || "there"}
                                </h2>

                                <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
                                    Practice realistic AI interviews,
                                    receive instant feedback, and improve
                                    before your next job interview.
                                </p>
                            </div>

                            <div className="mt-8 space-y-3">
                                {[
                                    "Personalized AI Questions",
                                    "Resume Based Interview",
                                    "Detailed Performance Report",
                                    "Real Interview Experience",
                                ].map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.035] p-4"
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-gray-950">
                                            <HiOutlineCheckCircle className="text-xl" />
                                        </div>

                                        <span className="text-sm font-medium text-gray-300">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT PANEL */}
                        <div className="p-5 sm:p-8 lg:p-10">
                            <div className="mb-7 pr-8">
                                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                    Start Interview
                                </h2>

                                <p className="mt-2 text-sm text-gray-400">
                                    Configure your interview preferences.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* Target Role */}
                                <div>
                                    <label
                                        htmlFor="targetRole"
                                        className="mb-2.5 block text-sm font-medium text-gray-300"
                                    >
                                        Target Role
                                    </label>

                                    <div className="relative">
                                        <HiOutlineBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-500" />

                                        <input
                                            id="targetRole"
                                            type="text"
                                            value={role}
                                            onChange={(event) =>
                                                setRole(event.target.value)
                                            }
                                            placeholder="e.g. Backend Developer"
                                            disabled={loading}
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-[#191A21] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                {/* Interview Type */}
                                <div>
                                    <label className="mb-2.5 block text-sm font-medium text-gray-300">
                                        Interview Type
                                    </label>

                                    <div className="grid grid-cols-2 rounded-xl border border-white/10 bg-[#191A21] p-1">
                                        {[
                                            {
                                                value: "technical",
                                                label: "Technical",
                                            },
                                            {
                                                value: "hr",
                                                label: "HR",
                                            },
                                        ].map((item) => (
                                            <button
                                                key={item.value}
                                                type="button"
                                                disabled={loading}
                                                onClick={() => {
                                                    setType(item.value);
                                                    setError("");
                                                }}
                                                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                                                    type === item.value
                                                        ? "bg-white text-gray-950 shadow-lg"
                                                        : "text-gray-400 hover:text-white"
                                                }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Resume Toggle */}
                                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#191A21] p-4">
                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            Use Resume
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-gray-400">
                                            AI will personalize questions
                                            using your resume.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={useResume}
                                        disabled={loading || !resumeReady}
                                        onClick={() =>
                                            setUseResume((previous) => !previous)
                                        }
                                        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                                            useResume
                                                ? "bg-violet-600"
                                                : "bg-gray-600"
                                        } disabled:cursor-not-allowed disabled:opacity-50`}
                                    >
                                        <span
                                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                                                useResume ? "left-6" : "left-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Resume Status */}
                                {useResume && resumeReady && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] p-4"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-xl text-white">
                                            <HiOutlineDocumentText />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-emerald-300">
                                                Resume Ready
                                            </h3>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Resume detected successfully.
                                            </p>
                                        </div>

                                        <HiOutlineCheckCircle className="text-xl text-emerald-400" />
                                    </motion.div>
                                )}

                                {/* Upload Resume */}
                                {(!resumeReady || useResume) && (
                                    <button
                                        type="button"
                                        onClick={handleUploadResume}
                                        disabled={loading}
                                        className="group flex min-h-[150px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#191A21] px-5 py-6 text-center transition hover:border-violet-500/60 hover:bg-violet-500/[0.04] disabled:opacity-50"
                                    >
                                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl text-gray-950 transition group-hover:scale-105">
                                            <HiOutlineCloudArrowUp />
                                        </div>

                                        <span className="text-sm font-semibold">
                                            {resumeReady
                                                ? "Upload New Resume"
                                                : "Upload Resume"}
                                        </span>

                                        <span className="mt-2 max-w-sm text-xs leading-5 text-gray-500">
                                            {resumeReady
                                                ? "Upload a new resume anytime to update your interview questions."
                                                : "Upload your resume to generate personalized interview questions."}
                                        </span>
                                    </button>
                                )}

                                {/* Error */}
                                {error && (
                                    <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                                        <HiOutlineExclamationCircle className="mt-0.5 shrink-0 text-lg" />
                                        <p>{error}</p>
                                    </div>
                                )}

                                {/* Start Interview */}
                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        !role.trim() ||
                                        (useResume && !resumeReady)
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-500 disabled:shadow-none"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Creating Interview...
                                        </>
                                    ) : (
                                        <>
                                            Start Interview
                                            <HiOutlineArrowRight className="text-lg" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateInterviewModal;

import { useState } from "react";
import {
  FiX,
  FiTarget,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";

const RoadmapFormModal = ({
  onClose,
  onSubmit,
  isGenerating,
  resumeAvailable,
}) => {
  const [role, setRole] = useState("");
  const [targetPackage, setTargetPackage] = useState("");
  const [useResume, setUseResume] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role.trim() || !targetPackage.trim()) return;

    onSubmit({
      role: role.trim(),
      targetPackage: targetPackage.trim(),
      useResume,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isGenerating) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-7">

        {/* Modal Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Generate Your Roadmap
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tell us your career goal to create a personalized learning path.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <FiX size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Target Role */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FiTarget className="text-indigo-600" />
              Target Job Role
            </label>

            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. MERN Stack Developer"
              required
              disabled={isGenerating}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>

          {/* Target Package */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FiDollarSign className="text-indigo-600" />
              Target Salary / Package
            </label>

            <input
              type="text"
              value={targetPackage}
              onChange={(e) => setTargetPackage(e.target.value)}
              placeholder="e.g. $80,000 per year"
              required
              disabled={isGenerating}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>

          {/* Resume Option */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={useResume}
                onChange={(e) => setUseResume(e.target.checked)}
                disabled={!resumeAvailable || isGenerating}
                className="mt-1 h-4 w-4 accent-indigo-600"
              />

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <FiFileText className="text-indigo-600" />
                  Personalize using my resume
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Analyze your existing skills and experience to create a personalized roadmap.
                </p>

                {!resumeAvailable && (
                  <p className="mt-2 text-xs text-amber-600">
                    Upload your resume first to use this option.
                  </p>
                )}
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isGenerating ||
              !role.trim() ||
              !targetPackage.trim()
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating Roadmap...
              </>
            ) : (
              "Generate My Roadmap"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RoadmapFormModal;
import { FiMap, FiPlus } from "react-icons/fi";

const EmptyRoadmap = ({ onGenerate }) => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center shadow-sm">

      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <FiMap size={30} />
      </div>

      <h3 className="text-xl font-bold text-slate-800">
        No Roadmaps Yet
      </h3>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        Start building your career with a personalized learning roadmap.
        Set your target role and salary, and let AI guide your journey.
      </p>

      <button
        onClick={onGenerate}
        className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
      >
        <FiPlus size={18} />
        Create Your First Roadmap
      </button>

    </div>
  );
};

export default EmptyRoadmap;
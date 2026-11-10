
import { FiPlus, FiMap } from "react-icons/fi";

const RoadmapHeader = ({ onGenerate }) => {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <FiMap size={21} />
          </div>

          <span className="text-sm font-medium text-indigo-400">
            Career Development
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-700  sm:text-3xl">
          My Roadmaps
        </h1>

        <p className="mt-2 text-sm text-slate-700">
          Build your personalized learning path and achieve your career goals.
        </p>
      </div>

      <button
        onClick={onGenerate}
        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        <FiPlus size={19} />
        Generate Roadmap
      </button>
    </div>
  );
};

export default RoadmapHeader;

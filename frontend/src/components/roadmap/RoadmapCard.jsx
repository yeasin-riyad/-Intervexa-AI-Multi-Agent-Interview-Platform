import {
  FiArrowUpRight,
  FiBookOpen,
  FiClock,
  FiLayers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RoadmapCard = ({ roadmap }) => {
  const navigate = useNavigate();

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-50 text-green-700";
      case "Intermediate":
        return "bg-yellow-50 text-yellow-700";
      case "Advanced":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5">

      {/* Card Header */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <FiBookOpen size={23} />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getLevelColor(
            roadmap.level
          )}`}
        >
          {roadmap.level}
        </span>
      </div>

      {/* Roadmap Title */}
      <h3 className="text-lg font-semibold text-slate-800">
        {roadmap.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
        Target Package: {roadmap.targetPackage}
      </p>

      {/* Roadmap Information */}
      <div className="my-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-2 flex items-center gap-2 text-slate-500">
            <FiClock size={15} />
            <span className="text-xs">Duration</span>
          </div>

          <p className="text-sm font-semibold text-slate-800">
            {roadmap.duration}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-2 flex items-center gap-2 text-slate-500">
            <FiLayers size={15} />
            <span className="text-xs">Modules</span>
          </div>

          <p className="text-sm font-semibold text-slate-800">
            {roadmap.modules?.length || 0} Modules
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          Created{" "}
          {roadmap.createdAt
            ? new Date(roadmap.createdAt).toLocaleDateString()
            : "Recently"}
        </span>

        <button
          onClick={() => navigate(`/roadmap/${roadmap._id}`)}
          className="flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          View Roadmap
          <FiArrowUpRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default RoadmapCard;
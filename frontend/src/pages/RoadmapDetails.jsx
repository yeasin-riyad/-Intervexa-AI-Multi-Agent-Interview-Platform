
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiBookOpen,
  FiClock,
  FiExternalLink,
  FiPlayCircle,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import {
  fetchRoadmapById,
  clearSelectedRoadmap,
} from "../redux/roadmapSlice";

const difficultyStyles = {
  Easy: "bg-green-50 text-green-700 border-green-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-red-50 text-red-700 border-red-200",
};



const RoadmapDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedRoadmap,
    isFetchingById,
    fetchByIdError,
  } = useSelector((state) => state.roadmap);

  useEffect(() => {
    dispatch(clearSelectedRoadmap());
    dispatch(fetchRoadmapById(id));

    return () => {
      dispatch(clearSelectedRoadmap());
    };
  }, [dispatch, id]);

  if (isFetchingById) {
    return (
      <div className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <div className="h-8 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-1/2 rounded bg-slate-100" />
            <div className="mt-8 flex gap-4">
              <div className="h-16 w-32 rounded-xl bg-slate-100" />
              <div className="h-16 w-32 rounded-xl bg-slate-100" />
              <div className="h-16 w-32 rounded-xl bg-slate-100" />
            </div>
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-44 rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (fetchByIdError || !selectedRoadmap) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8fafc] px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <FiBookOpen size={25} />
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            Roadmap Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {fetchByIdError ||
              "This roadmap may have been deleted or is no longer available."}
          </p>

          <button
            onClick={() => navigate("/roadmap")}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Roadmaps
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    targetPackage,
    duration,
    level,
    modules = [],
  } = selectedRoadmap;

  return (
    <div className="min-h-screen space-y-8 bg-[#f8fafc] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/roadmap")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <FiArrowLeft size={17} />
          Back to Roadmaps
        </button>

        {/* Roadmap Header */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-8 text-white sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                Career Roadmap
              </span>

              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                {level || "Not specified"}
              </span>
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              {title || "Your Learning Roadmap"}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100">
              Follow this structured learning path to build your skills and
              achieve your career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FiTarget size={21} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Target Package</p>
                <p className="mt-1 font-bold text-slate-800">
                  {targetPackage || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FiClock size={21} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Estimated Duration</p>
                <p className="mt-1 font-bold text-slate-800">
                  {duration || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FiTrendingUp size={21} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Learning Modules</p>
                <p className="mt-1 font-bold text-slate-800">
                  {modules.length} Modules
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Modules */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Your Learning Path
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Complete each module step by step to progress through your roadmap.
            </p>
          </div>

          {modules.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              No learning modules are available for this roadmap.
            </div>
          ) : (
            <div className="space-y-5">
              {modules.map((module, index) => (
                <article
                  key={module._id || index}
                  className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {/* Module Number */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Module Heading */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-800">
                          {module.title}
                        </h3>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                            difficultyStyles[module.difficulty] ||
                            "border-slate-200 bg-slate-50 text-slate-600"
                          }`}
                        >
                          {module.difficulty || "Not specified"}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {module.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <FiClock size={15} />
                        <span>{module.duration || "Duration not specified"}</span>
                      </div>

                      {/* Learning Resources */}
                      {(module.youtube?.url || module.article) && (
                        <div className="mt-5 border-t border-slate-100 pt-4">
                          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                            Learning Resources
                          </p>

                          <div className="flex flex-wrap gap-3">
                            {module.youtube?.url && (
                              <a
                                href={module.youtube.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                              >
                                <FiPlayCircle size={17} />
                                Watch Tutorial
                                <FiExternalLink size={13} />
                              </a>
                            )}

                            {module.article && (
                              <a
                                href={module.article}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                              >
                                <FiBookOpen size={17} />
                                Read Documentation
                                <FiExternalLink size={13} />
                              </a>
                            )}
                          </div>

                          {/* YouTube Information */}
                          {module.youtube?.thumbnail && (
                            <a
                              href={module.youtube.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 flex max-w-xl flex-col overflow-hidden rounded-xl border border-slate-200 transition hover:border-indigo-300 sm:flex-row"
                            >
                              <img
                                src={module.youtube.thumbnail}
                                alt={module.youtube.title || "YouTube tutorial"}
                                className="h-40 w-full object-cover sm:h-24 sm:w-40"
                                loading="lazy"
                              />

                              <div className="flex flex-1 flex-col justify-center p-3">
                                <p className="text-sm font-semibold text-slate-800">
                                  {module.youtube.title}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  {module.youtube.channel}
                                </p>
                              </div>
                            </a>
                          )}
                        </div>
                      )}

                      {!module.youtube?.url && !module.article && (
                        <p className="mt-4 text-xs text-slate-400">
                          Learning resources are not available for this module yet.
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default RoadmapDetails;

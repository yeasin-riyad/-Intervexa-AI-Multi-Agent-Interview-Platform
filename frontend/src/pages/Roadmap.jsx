import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";

import {
  generateRoadmap,
  fetchAllRoadmaps,
} from "../redux/roadmapSlice";

import RoadmapHeader from "../components/roadmap/RoadmapHeader";
import RoadmapCard from "../components/roadmap/RoadmapCard";
import RoadmapFormModal from "../components/roadmap/RoadmapFormModal";
import RoadmapSkeleton from "../components/roadmap/RoadmapSkeleton";
import EmptyRoadmap from "../components/roadmap/EmptyRoadmap";

const Roadmap = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    roadmaps,
    isGenerating,
    isFetchingAll,
    generateError,
    fetchAllError,
  } = useSelector((state) => state.roadmap);

  const resumeData = useSelector(
    (state) => state.resume?.resumeData
  );

  const resumeAvailable = Boolean(resumeData);

  useEffect(() => {
    dispatch(fetchAllRoadmaps());
  }, [dispatch]);

  const handleGenerateRoadmap = async (payload) => {
    try {
      await dispatch(
        generateRoadmap({
          ...payload,
          resume: payload.useResume ? resumeData : null,
        })
      ).unwrap();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Roadmap Generation Error:", error);
    }
  };

  return (
    <div className="min-h-screen space-y-8 bg-[#f8fafc] px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <RoadmapHeader
        onGenerate={() => setIsModalOpen(true)}
      />

      {/* Generate Error */}
      {generateError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {generateError}
        </div>
      )}

      {/* Roadmap Section */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Your Learning Paths
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {roadmaps.length} roadmap
              {roadmaps.length !== 1 ? "s" : ""} created
            </p>
          </div>

          <button
            onClick={() => dispatch(fetchAllRoadmaps())}
            disabled={isFetchingAll}
            title="Refresh roadmaps"
            className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
          >
            <FiRefreshCw
              size={17}
              className={isFetchingAll ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* Fetch Error */}
        {fetchAllError && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              {fetchAllError}
            </p>

            <button
              onClick={() => dispatch(fetchAllRoadmaps())}
              className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading / Roadmaps / Empty State */}
        {isFetchingAll ? (
          <RoadmapSkeleton />
        ) : roadmaps.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roadmaps.map((roadmap) => (
              <RoadmapCard
                key={roadmap._id}
                roadmap={roadmap}
              />
            ))}
          </div>
        ) : !fetchAllError ? (
          <EmptyRoadmap
            onGenerate={() => setIsModalOpen(true)}
          />
        ) : null}
      </section>

      {/* Generate Roadmap Modal */}
      {isModalOpen && (
        <RoadmapFormModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleGenerateRoadmap}
          isGenerating={isGenerating}
          resumeAvailable={resumeAvailable}
        />
      )}
    </div>
  );
};

export default Roadmap;
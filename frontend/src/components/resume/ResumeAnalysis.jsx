
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { useOutletContext } from "react-router-dom";
import {
  HiOutlineArrowPath,
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineBolt,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineCodeBracket,
  HiOutlineLightBulb,
  HiOutlineWrenchScrewdriver,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";


import ResumeScoreCard from "./ResumeScoreCard";
import ResumeDetails from "./ResumeDetails";
import ResumeSection from "./ResumeSection";
import { fetchResume } from "../../redux/resumeSlice";

const ResumeAnalysis = () => {
  const dispatch = useDispatch();
    const { onReupload } = useOutletContext();


  const {
    resumeData,
    isFetching,
    fetchError,
  } = useSelector((state) => state.resume);

  useEffect(() => {
    if (!resumeData) {
      dispatch(fetchResume());
    }
  }, [dispatch, resumeData]);

  // Loading
  if (isFetching && !resumeData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading your resume analysis...
          </p>
        </div>
      </div>
    );
  }

  // No resume available
  if (!resumeData) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50">
            <HiOutlineSparkles className="text-3xl text-purple-600" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Analyze Your Resume
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Upload your resume to get an AI-powered score,
            identify missing skills, and receive personalized
            recommendations.
          </p>

          {fetchError && (
            <p className="mt-3 text-xs text-gray-400">
              {fetchError}
            </p>
          )}

          <button
            onClick={onReupload}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            <HiOutlineSparkles size={19} />
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  const resume = resumeData;

  // Support both the corrected and existing backend field names.
  const recommendations =
    resume.recommendations || [];

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-6 pb-10">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Resume Analysis
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            {resume.name || "Resume Report"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            AI-powered resume evaluation and career insights.
          </p>
        </div>

        <button
          type="button"
          onClick={onReupload}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 sm:self-center"
        >
          <HiOutlineArrowPath size={17} />
          Re-upload Resume
        </button>
      </div>

      {/* Resume Score */}
      <ResumeScoreCard resume={resume} />

      {/* Summary */}
      {resume.summary && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <HiOutlineSparkles className="text-xl text-purple-600" />

            <h2 className="font-bold text-gray-900">
              AI Resume Summary
            </h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Candidate Details */}
      <ResumeDetails resume={resume} />

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ResumeSection
          title="Strengths"
          items={resume.strengths}
          icon={HiOutlineCheckCircle}
          color="green"
          emptyMessage="No strengths identified."
        />

        <ResumeSection
          title="Weaknesses"
          items={resume.weaknesses}
          icon={HiOutlineExclamationTriangle}
          color="yellow"
          emptyMessage="No weaknesses identified."
        />
      </div>

      {/* Missing Skills */}
      <ResumeSection
        title="Missing Skills"
        items={resume.missingSkills}
        icon={HiOutlineBolt}
        color="red"
        emptyMessage="No missing skills identified."
      />

      {/* Technical Skills */}
      <ResumeSection
        title="Technical Skills"
        items={resume.skills}
        icon={HiOutlineWrenchScrewdriver}
        color="blue"
        emptyMessage="No skills extracted."
      />

      {/* Education & Experience */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ResumeSection
          title="Education"
          items={resume.education}
          icon={HiOutlineAcademicCap}
          color="blue"
          emptyMessage="No education information found."
        />

        <ResumeSection
          title="Work Experience"
          items={resume.experience}
          icon={HiOutlineBriefcase}
          color="purple"
          emptyMessage="No experience information found."
        />
      </div>

      {/* Projects */}
      <ResumeSection
        title="Projects"
        items={resume.projects}
        icon={HiOutlineCodeBracket}
        color="blue"
        emptyMessage="No projects found."
      />

      {/* Recommendations */}
      <section className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <HiOutlineArrowTrendingUp className="text-xl text-purple-600" />

          <h2 className="font-bold text-gray-900">
            AI Recommendations
          </h2>
        </div>

        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-3 rounded-xl bg-purple-50/70 p-4"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm">
                  <HiOutlineLightBulb size={17} />
                </div>

                <p className="pt-1 text-sm leading-relaxed text-purple-900">
                  {recommendation}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No recommendations available.
          </p>
        )}
      </section>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5">
        <p className="text-xs text-gray-400">
          Powered by IntervexaAI Resume Intelligence
        </p>

        <button
          onClick={onReupload}
          className="flex items-center gap-2 text-sm font-semibold text-purple-600 transition hover:text-purple-800"
        >
          <HiOutlineArrowPath />
          Analyze Another Resume
        </button>
      </div>

    </div>
  );
};

export default ResumeAnalysis;

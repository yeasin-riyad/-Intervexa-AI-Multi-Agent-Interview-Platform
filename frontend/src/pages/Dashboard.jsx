import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import {
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineCalendarDays,
  HiOutlineTrophy,
  HiOutlineBolt,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronRight,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

import { getAllInterview } from "../apis/interview.api";

// Greeting helper
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// ছোট stat pill
const MiniStat = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-3 py-2.5">
    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
      <Icon className="text-base" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-900 tabular-nums">{value}</p>
    </div>
  </div>
);

// Quick action button
const QuickAction = ({ icon: Icon, title, description, onClick, accent }) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50"
  >
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}
    >
      <Icon className="text-lg" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{description}</p>
    </div>
    <HiOutlineChevronRight className="mt-1 shrink-0 text-gray-300 transition-colors group-hover:text-violet-500" />
  </button>
);

// তারিখ ফরম্যাট
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// এই সপ্তাহের কিনা
const isThisWeek = (dateStr) => {
  if (!dateStr) return false;
  const now = new Date();
  const date = new Date(dateStr);
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  return date >= weekAgo && date <= now;
};

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  // সব interview (আমরা aggregate stats বানাবো)
  const [allInterviews, setAllInterviews] = useState([]);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const firstName = user?.name?.split(" ")[0] || "User";

  // সব interview load (aggregate stats-এর জন্য বেশি limit)
  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        setLoadingRecent(true);
        const result = await getAllInterview({ limit: 100, sort: "-createdAt" });

        if (!cancelled && result?.success) {
          const list = result.interviews || [];
          setAllInterviews(list);
          setRecentInterviews(list.slice(0, 3));
        }
      } catch (err) {
        console.error("Interviews fetch error:", err);
      } finally {
        if (!cancelled) setLoadingRecent(false);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // Aggregate stats (রিয়েল ডেটা থেকে হিসাব)
  const stats = useMemo(() => {
    const total = allInterviews.length;
    const completed = allInterviews.filter(
      (i) => i.status === "completed",
    ).length;
    const inProgress = total - completed;

    // completed গুলোর মধ্যে সর্বোচ্চ overallScore
    const bestScore = allInterviews
      .filter((i) => i.status === "completed" && i.overallScore > 0)
      .reduce((max, i) => Math.max(max, i.overallScore), 0);

    // গড় score (completed শুধু)
    const completedWithScore = allInterviews.filter(
      (i) => i.status === "completed" && i.overallScore > 0,
    );
    const avgScore =
      completedWithScore.length > 0
        ? Math.round(
            completedWithScore.reduce((sum, i) => sum + i.overallScore, 0) /
              completedWithScore.length,
          )
        : 0;

    // এই সপ্তাহে কতগুলো
    const thisWeek = allInterviews.filter((i) => isThisWeek(i.createdAt)).length;

    // টাইপ breakdown
    const hrCount = allInterviews.filter((i) => i.type === "hr").length;
    const technicalCount = allInterviews.filter(
      (i) => i.type === "technical",
    ).length;

    return {
      total,
      completed,
      inProgress,
      bestScore,
      avgScore,
      thisWeek,
      hrCount,
      technicalCount,
    };
  }, [allInterviews]);

  // Interview card-এ ক্লিক
  const handleOpenInterview = (item) => {
    if (!item?._id) return;
    if (item.status === "completed") {
      // completed হলে report page-এ যাবে
      navigate(`/interview/${item._id}/report`);
    } else {
      // in-progress হলে interview page-এ
      navigate(`/interview/${item._id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* ============ HERO SECTION ============ */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-5 sm:p-7"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-indigo-300/30 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-600 backdrop-blur">
              <HiOutlineSparkles className="text-xs" />
              Your Workspace
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {getGreeting()}, {firstName}! 👋
            </h1>

            <p className="mt-2 max-w-xl text-sm text-gray-600">
              Here's your interview practice overview. Keep going — consistency
              is the key to landing your dream role.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => navigate("/resume")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition-all hover:border-violet-300 hover:text-violet-600"
            >
              <HiOutlineDocumentText className="text-sm" />
              Analyze Resume
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard", {
                  state: { openCreateInterview: true },
                })
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-violet-300 transition-all hover:bg-violet-700"
            >
              <HiOutlineBolt className="text-sm" />
              Start Interview
              <HiOutlineArrowRight className="text-sm" />
            </button>
          </div>
        </div>

        {/* Mini stat strip — রিয়েল ডেটা */}
        <div className="relative mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <MiniStat
            icon={HiOutlineChatBubbleLeftRight}
            label="Total Interviews"
            value={loadingRecent ? "…" : stats.total}
            color="bg-violet-100 text-violet-600"
          />
          <MiniStat
            icon={HiOutlineTrophy}
            label="Best Score"
            value={
              loadingRecent
                ? "…"
                : stats.bestScore > 0
                  ? `${stats.bestScore}%`
                  : "—"
            }
            color="bg-amber-100 text-amber-600"
          />
          <MiniStat
            icon={HiOutlineCalendarDays}
            label="This Week"
            value={loadingRecent ? "…" : stats.thisWeek}
            color="bg-emerald-100 text-emerald-600"
          />
          <MiniStat
            icon={HiOutlineCheckCircle}
            label="Completed"
            value={loadingRecent ? "…" : stats.completed}
            color="bg-sky-100 text-sky-600"
          />
        </div>
      </motion.section>

      {/* ============ QUICK ACTIONS ============ */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            icon={HiOutlineBolt}
            title="Start New Interview"
            description="Practice HR or technical round with AI"
            accent="bg-violet-100 text-violet-600"
            onClick={() =>
              navigate("/dashboard", {
                state: { openCreateInterview: true },
              })
            }
          />
          <QuickAction
            icon={HiOutlineDocumentText}
            title="Analyze Resume"
            description="Get AI feedback on your resume"
            accent="bg-emerald-100 text-emerald-600"
            onClick={() => navigate("/resume")}
          />
          <QuickAction
            icon={HiOutlineChatBubbleLeftRight}
            title="View Reports"
            description="Review past interview performance"
            accent="bg-amber-100 text-amber-600"
            onClick={() => {
              // শেষ completed interview-এর report খুলি, না থাকলে ড্যাশবোর্ডে
              const lastCompleted = allInterviews.find(
                (i) => i.status === "completed",
              );
              if (lastCompleted) {
                navigate(`/interview/${lastCompleted._id}/report`);
              }
            }}
          />
        </div>
      </section>

      {/* ============ PERFORMANCE SUMMARY (রিয়েল ডেটা) ============ */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Average Score */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Average Score
            </p>
            <HiOutlineTrophy className="text-lg text-amber-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 tabular-nums">
            {loadingRecent ? "…" : `${stats.avgScore}%`}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Based on {stats.completed} completed interview
            {stats.completed !== 1 ? "s" : ""}
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.avgScore}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full bg-amber-400"
            />
          </div>
        </div>

        {/* HR count */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              HR Interviews
            </p>
            <HiOutlineChatBubbleLeftRight className="text-lg text-violet-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 tabular-nums">
            {loadingRecent ? "…" : stats.hrCount}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Behavioral &amp; communication practice
          </p>
        </div>

        {/* Technical count */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Technical Interviews
            </p>
            <HiOutlineBolt className="text-lg text-emerald-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 tabular-nums">
            {loadingRecent ? "…" : stats.technicalCount}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Coding &amp; problem-solving practice
          </p>
        </div>
      </section>

      {/* ============ RECENT INTERVIEWS ============ */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Recent Interviews
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              Your last few practice sessions
            </p>
          </div>

          {allInterviews.length > 3 && (
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              View all
              <HiOutlineArrowRight className="text-sm" />
            </button>
          )}
        </div>

        {loadingRecent ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-gray-100 bg-gray-50"
              />
            ))}
          </div>
        ) : recentInterviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
              <HiOutlineBolt className="text-lg" />
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-900">
              No interviews yet
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Start your first AI interview to see it here.
            </p>
            <button
              type="button"
              onClick={() =>
                navigate("/dashboard", {
                  state: { openCreateInterview: true },
                })
              }
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-700"
            >
              <HiOutlineBolt className="text-sm" />
              Start Interview
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentInterviews.map((item) => {
              const isCompleted = item.status === "completed";
              const progress = item.totalQuestions
                ? Math.round(
                    (item.currentQuestion / item.totalQuestions) * 100,
                  )
                : 0;

              return (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => handleOpenInterview(item)}
                  className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50"
                >
                  {/* Top row */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-violet-100 text-violet-600"
                      }`}
                    >
                      {isCompleted ? (
                        <HiOutlineCheckCircle className="text-lg" />
                      ) : (
                        <HiOutlineChatBubbleLeftRight className="text-lg" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {item.role || "Interview"}
                      </p>
                      <p className="mt-0.5 text-xs capitalize text-gray-500">
                        {item.type} ·{" "}
                        <span
                          className={
                            isCompleted
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }
                        >
                          {item.status}
                        </span>
                      </p>
                    </div>

                    <HiOutlineChevronRight className="mt-1 shrink-0 text-gray-300 transition-colors group-hover:text-violet-500" />
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span>
                        {item.currentQuestion || 0}/{item.totalQuestions || 0}{" "}
                        questions
                      </span>
                      <span className="tabular-nums">{progress}%</span>
                    </div>
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${
                          isCompleted ? "bg-emerald-400" : "bg-violet-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between border-t border-gray-50 pt-2 text-[10px] text-gray-400">
                    <span>{formatDate(item.createdAt)}</span>
                    {isCompleted && item.overallScore > 0 && (
                      <span className="font-semibold text-emerald-600">
                        Score: {item.overallScore}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
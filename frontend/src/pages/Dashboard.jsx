
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineBars3 } from "react-icons/hi2";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import ResumeUploadModal from "../components/dashboard/ResumeUploadModal";
import ResumeAnalysis from "../components/resume/ResumeAnalysis";

import { uploadResume } from "../redux/resumeSlice";

const Dashboard = ({ user, setUser }) => {
  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const { isAnalyzing } = useSelector(
    (state) => state.resume
  );

  const handleResumeAnalyze = async (file) => {
    try {
      const result = await dispatch(
        uploadResume(file)
      ).unwrap();

      setIsResumeModalOpen(false);
      setActivePage("resume");

      return result;
    } catch (error) {
      console.error("Resume analysis failed:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    // Keep your existing logout implementation here.
  };

  const handleCreateInterview = () => {
    // Keep your existing create interview implementation here.
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateInterview={handleCreateInterview}
        onLogout={handleLogout}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main Content */}
      <main className="min-h-screen lg:ml-[250px]">

        {/* Mobile Header */}
        <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-gray-100 bg-white/90 px-4 backdrop-blur-md lg:hidden">

          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50"
          >
            <HiOutlineBars3 className="text-xl" />
          </button>

          <span className="text-base font-extrabold tracking-tight text-gray-950">
            Intervexa<span className="text-violet-600">AI</span>
          </span>
        </header>

        {/* Page Content */}
        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          {activePage === "dashboard" && (
            <div>
              <div className="mb-7">
                <p className="mb-1 text-xs font-medium text-violet-600">
                  YOUR WORKSPACE
                </p>

                <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  Welcome back, {user?.name || "User"}!
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your interviews and track your progress.
                </p>
              </div>

              {/* Your existing Dashboard components */}
              {/* Stats, interviews, recent activity etc. */}
            </div>
          )}

          {activePage === "resume" && (
            <ResumeAnalysis
              onReupload={() => setIsResumeModalOpen(true)}
            />
          )}

        </div>
      </main>

      {/* Global Resume Upload Modal */}
      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onAnalyze={handleResumeAnalyze}
        isAnalyzing={isAnalyzing}
      />

    </div>
  );
};

export default Dashboard;

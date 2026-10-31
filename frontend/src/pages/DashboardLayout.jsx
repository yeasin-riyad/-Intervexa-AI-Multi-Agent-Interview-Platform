
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import ResumeUploadModal from "../components/dashboard/ResumeUploadModal";

import { useDispatch, useSelector } from "react-redux";
import { uploadResume } from "../redux/resumeSlice";

const DashboardLayout = ({ user, setUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const { isAnalyzing } = useSelector(
    (state) => state.resume
  );

  const handleResumeAnalyze = async (file) => {
    try {
      await dispatch(uploadResume(file)).unwrap();

      setIsResumeModalOpen(false);

      return true;
    } catch (error) {
      console.error("Resume analysis failed:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    // Your existing logout implementation
  };

  const handleCreateInterview = () => {
    // Your existing create interview implementation
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      <DashboardSidebar
        user={user}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateInterview={handleCreateInterview}
        onLogout={handleLogout}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      <main className="min-h-screen lg:ml-[250px]">

        {/* Mobile Header */}
        <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-gray-100 bg-white/90 px-4 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700"
          >
            ☰
          </button>

          <span className="text-base font-extrabold text-gray-950">
            Intervexa<span className="text-violet-600">AI</span>
          </span>
        </header>

        <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet
            context={{
              onReupload: () => setIsResumeModalOpen(true),
            }}
          />
        </div>
      </main>

      {/* Shared Resume Upload Modal */}
      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onAnalyze={handleResumeAnalyze}
        isAnalyzing={isAnalyzing}
      />

    </div>
  );
};

export default DashboardLayout;

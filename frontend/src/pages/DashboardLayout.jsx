
import { useEffect, useState } from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import CreateInterviewModal from "../components/interview/CreateInterviewModal";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import ResumeUploadModal from "../components/dashboard/ResumeUploadModal";

import { uploadResume,fetchResume } from "../redux/resumeSlice";

const DashboardLayout = ({ user, setUser }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    const [isCreateInterviewOpen, setIsCreateInterviewOpen] =
        useState(false);

    const [returnToCreateInterview, setReturnToCreateInterview] =
        useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { isAnalyzing, resumeData } = useSelector(
        (state) => state.resume
    );


        useEffect(() => {
        dispatch(fetchResume());
    }, [dispatch,user]);
    // Open Create Interview Modal from landing page navigation.
    useEffect(() => {
        if (location.state?.openCreateInterview) {
            setIsCreateInterviewOpen(true);

            // Clear navigation state after opening the modal.
            navigate(
                `${location.pathname}${location.search}${location.hash}`,
                {
                    replace: true,
                    state: null,
                }
            );
        }
    }, [location.state, location.pathname, location.search, location.hash, navigate]);

    // Open resume upload from the sidebar.
    const handleOpenResume = () => {
        setReturnToCreateInterview(false);
        setIsResumeModalOpen(true);
    };

    // Open resume upload from Create Interview.
    const handleOpenResumeFromInterview = () => {
        setIsCreateInterviewOpen(false);
        setReturnToCreateInterview(true);
        setIsResumeModalOpen(true);
    };

    // Analyze and save resume.
    const handleResumeAnalyze = async (file) => {
        try {
            await dispatch(uploadResume(file)).unwrap();

            setIsResumeModalOpen(false);

            if (returnToCreateInterview) {
                setIsCreateInterviewOpen(true);
                setReturnToCreateInterview(false);
            }

            return true;
        } catch (error) {
            console.error("Resume analysis failed:", error);
            throw error;
        }
    };

    // Close resume modal.
    const handleCloseResumeModal = () => {
        setIsResumeModalOpen(false);
        setReturnToCreateInterview(false);
    };

    // Handle successful interview creation.
    const handleInterviewStarted = (result) => {
        setIsCreateInterviewOpen(false);

        navigate(`/interview/${result.interviewId}`);
    };

    const handleLogout = async () => {
        // Keep your existing logout implementation here.
    };

    return (
        <div className="min-h-screen bg-[#F8F9FC]">

            <DashboardSidebar
                user={user}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
                onCreateInterview={() => {
                    setIsCreateInterviewOpen(true);
                }}
                onOpenResumeModal={handleOpenResume}
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
                        Intervexa
                        <span className="text-violet-600">AI</span>
                    </span>
                </header>

                {/* Nested Dashboard Pages */}
                <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <Outlet
                        context={{
                            onReupload: handleOpenResume,
                        }}
                    />
                </div>
            </main>

            {/* Resume Upload Modal */}
            <ResumeUploadModal
                isOpen={isResumeModalOpen}
                onClose={handleCloseResumeModal}
                onAnalyze={handleResumeAnalyze}
                isAnalyzing={isAnalyzing}
            />

            {/* Create Interview Modal */}
            <CreateInterviewModal
                isOpen={isCreateInterviewOpen}
                onClose={() => setIsCreateInterviewOpen(false)}
                user={user}
                resume={resumeData}
                onOpenResumeModal={handleOpenResumeFromInterview}
                onInterviewStarted={handleInterviewStarted}
            />

        </div>
    );
};

export default DashboardLayout;

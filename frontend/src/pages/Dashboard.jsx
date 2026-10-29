import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import PerformanceSection from "../components/dashboard/PerformanceSection";

import {
  dashboardStats,
  interviewCategories,
  demoUser,
} from "../data/dashboardData";

const Dashboard = ({ user, setUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Static fallback data until the backend is connected.
  const dashboardUser = {
    ...demoUser,
    ...user,
    name: user?.name || demoUser.name,
    email: user?.email || demoUser.email,
    interviewCoins:
      user?.interviewCoins ?? demoUser.interviewCoins,
  };

  const handleLogout = () => {
    // Connect your backend logout API here.
    // This local action only clears the current frontend user state.
    setUser?.(null);
    navigate("/", { replace: true });
  };

  const handleCreateInterview = () => {
    // Add the interview creation route when it is ready.
    setIsSidebarOpen(false);
    navigate("/create-interview");
  };

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <DashboardSidebar
        user={dashboardUser}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateInterview={handleCreateInterview}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <main className="min-h-screen min-w-0 lg:ml-[270px]">
        <div className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
          <DashboardHeader
            user={dashboardUser}
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          <StatsGrid stats={dashboardStats} />

          <PerformanceSection interviews={interviewCategories} />

          <footer className="mt-10 border-t border-gray-100 py-5 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} IntervexaAI. Built for your next big opportunity.
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
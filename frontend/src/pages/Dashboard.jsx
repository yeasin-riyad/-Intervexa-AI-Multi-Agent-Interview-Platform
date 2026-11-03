
import StatsGrid from "../components/dashboard/StatsGrid";
import InterviewChartCard from "../components/dashboard/InterviewChartCard";
import PerformanceSection from "../components/dashboard/PerformanceSection";



const Dashboard = ({ user }) => {
  
  return (
    <div className="space-y-7">

      {/* Welcome Section */}
      <section>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-violet-600">
          YOUR WORKSPACE
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Welcome back, {user?.name?.split(" ")[0] || "User"}!
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your interviews, monitor your performance, and improve your skills.
        </p>
      </section>

      {/* Dashboard Statistics */}
      <StatsGrid user={user} />

      {/* Interview Analytics */}
      <InterviewChartCard />

      {/* Performance Overview */}
      <PerformanceSection />

    </div>
  );
};

export default Dashboard;

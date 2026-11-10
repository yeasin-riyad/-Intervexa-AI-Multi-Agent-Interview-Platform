import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./components/resume/ResumeAnalysis";
import ResumeBuilder from "./pages/ResumeBuilder";
// import InterviewStart from "./pages/InterviewStart";
import InterviewPage from "./pages/InterviewPage";
import InterviewReport from "./pages/InterviewReport";

import { getCurrentUser } from "../utils/getMe";
import Roadmap from "./pages/Roadmap";

// Protected Route
const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const LoadingScreen = () => (
    <div className="flex min-h-screen items-center justify-center bg-[#080B14] text-white">
        <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
            <p className="text-sm text-gray-400">
                Loading your account...
            </p>
        </div>
    </div>
);

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const data = await getCurrentUser();
            setUser(data?.user ?? null);
        } catch (error) {
            console.error("Failed to fetch current user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (loading) return <LoadingScreen />;

    return (
        <Routes>

            {/* Public Route */}
            <Route
                path="/"
                element={
                    <Home
                        user={user}
                        setUser={setUser}
                    />
                }
            />

            {/* Protected Dashboard Layout */}
            <Route
                element={
                    <ProtectedRoute user={user}>
                        <DashboardLayout
                            user={user}
                            setUser={setUser}
                        />
                    </ProtectedRoute>
                }
            >
                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Dashboard user={user} />}
                />

                {/* Resume */}
                <Route
                    path="/resume"
                    element={<ResumeAnalysis />}
                />

                <Route
                    path="/resume-builder"
                    element={<ResumeBuilder />}
                />

                <Route
                    path="/roadmap"
                    element={<Roadmap />}
                />
            </Route>

            {/* Protected Interview Routes (outside DashboardLayout) */}
            <Route
                path="/interview/:id"
                element={
                    <ProtectedRoute user={user}>
                        <InterviewPage user={user} />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/interview/:id/report"
                element={
                    <ProtectedRoute user={user}>
                        <InterviewReport user={user} />
                    </ProtectedRoute>
                }
            />

            {/* Not Found */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
};

export default App;
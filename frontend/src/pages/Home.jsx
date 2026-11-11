
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";

const Home = ({ user, setUser }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard", {
        state: { openCreateInterview: true },
      });
    } else {
      openLogin();
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      <Navbar
        user={user}
        setUser={setUser}
        onLoginClick={openLogin}
      />

      <HeroSection onGetStarted={handleGetStarted} />

      <FeaturesSection />
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setUser={setUser}
      />
    </main>
  );
};

export default Home;

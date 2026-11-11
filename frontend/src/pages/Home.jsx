import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = ({ setUser }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const navigate= useNavigate()

  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      <Navbar onLoginClick={openLogin} />

      <HeroSection
      onGetStarted={() => {
        {openLogin}
        navigate("/dashboard", {
            state: { openCreateInterview: true },
        });
    }}
       />

      <FeaturesSection />
      <Footer/>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setUser={setUser}
      />
    </main>
  );
};

export default Home;
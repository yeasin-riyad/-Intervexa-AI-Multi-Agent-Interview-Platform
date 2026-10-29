import { useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";

const Home = ({ setUser }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);

  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      <Navbar onLoginClick={openLogin} />

      <HeroSection onGetStarted={openLogin} />

      <FeaturesSection />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setUser={setUser}
      />
    </main>
  );
};

export default Home;
import { useState, useEffect, useRef } from "react";
import { portfolioData } from "./data/portfolioData";
import { ThemeProvider } from "./context/ThemeContext";
import { SoundProvider } from "./context/SoundContext";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

// Components
import { CustomCursor } from "./components/CustomCursor";
import { Loader } from "./components/Loader";
import { Background } from "./components/Background";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";
import { Experience } from "./components/Experience";
import { Marquee } from "./components/Marquee";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const toastTimer = useRef(null);

  // Lenis smooth scroll (synced with GSAP ScrollTrigger)
  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const handleShowToast = (msg) => {
    setToastMessage(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <ThemeProvider>
      <SoundProvider>
        <div className="app-root text-bone font-body antialiased bg-ink selection:bg-accent selection:text-ink min-h-screen">
          {loading && (
            <Loader
              brandName={portfolioData.profile.name}
              onComplete={() => setLoading(false)}
            />
          )}

          <div
            className="scroll-progress"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />

          <Background />
          <CustomCursor />

          <Navbar brandName={portfolioData.profile.name} />

          <main id="main" className="site-main">
            <Hero profile={portfolioData.profile} />
            <Manifesto manifesto={portfolioData.profile.manifesto} />
            <About profile={portfolioData.profile} />
            <Projects projects={portfolioData.projects} />
            <Services services={portfolioData.services} />
            <TechStack skills={portfolioData.skills} />
            <Experience experience={portfolioData.experience} />
            <Marquee />
            <Contact
              profile={portfolioData.profile}
              onShowToast={handleShowToast}
            />
          </main>

          <Footer brandName={portfolioData.profile.name} />

          <div
            className={`toast-popup ${toastMessage ? "is-visible" : ""}`}
            role="status"
          >
            {toastMessage}
          </div>
        </div>
      </SoundProvider>
    </ThemeProvider>
  );
}

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Components
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VirtualVignesh from './components/VirtualVignesh';
import ResumeModal from './components/ResumeModal';
import CursorTrail from './components/CursorTrail';
import Resume from './components/Resume';
import LoadingScreen from './components/LoadingScreen';
import Certifications from './components/Certifications';

// Data
import { personalInfo } from './data/portfolio';

gsap.registerPlugin(ScrollTrigger);

// Reset scroll position and refresh ScrollTrigger on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Kill all ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Reset scroll position
        window.scrollTo(0, 0);

        // Refresh ScrollTrigger after a short delay
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }, [pathname]);

    return null;
};


function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [showResume, setShowResume] = useState(false);
    const cursorGlowRef = useRef(null);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        // Cursor glow effect
        const handleMouseMove = (e) => {
            if (cursorGlowRef.current) {
                cursorGlowRef.current.style.left = e.clientX + 'px';
                cursorGlowRef.current.style.top = e.clientY + 'px';
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Hero Section Component - Inspired by uxdesignerstockholm.se
    const HeroSection = () => {
        const heroRef = useRef(null);

        useEffect(() => {
            const ctx = gsap.context(() => {
                // Sequential fade-in animation
                const tl = gsap.timeline({ delay: 0.3 });

                tl.fromTo('.hero-portrait',
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
                );
                tl.fromTo('.hero-intro',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                    '-=0.3'
                );
                tl.fromTo('.hero-headline',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
                    '-=0.4'
                );
                tl.fromTo('.hero-roles',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                    '-=0.3'
                );
                tl.fromTo('.hero-scroll-indicator',
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                    '-=0.2'
                );

                // Continuous scroll indicator bounce
                gsap.to('.scroll-arrow', {
                    y: 8,
                    duration: 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut'
                });
            }, heroRef);

            return () => ctx.revert();
        }, []);

        return (
            <section id="hero" className="hero-section hero-section-centered" ref={heroRef}>
                {/* Blue Glow Vignette */}
                <div className="hero-vignette"></div>
                <div className="hero-vignette-bottom"></div>

                <div className="hero-centered-content">
                    {/* Profile Portrait */}
                    <div className="hero-portrait">
                        <img
                            src="/assets/vignesh-profile.jpg"
                            alt={personalInfo.name}
                            className="hero-portrait-img"
                        />
                    </div>

                    {/* Main Copy */}
                    <div className="hero-text">
                        <p className="hero-intro">
                            I'm <span className="hero-name">{personalInfo.name.split(' ')[0]},</span>
                        </p>
                        <h1 className="hero-headline">
                            building intelligent systems that transform ideas into impact.
                        </h1>
                    </div>

                    {/* Role Tags */}
                    <div className="hero-roles">
                        <span>AI/ML Engineer</span>
                        <span className="role-divider">|</span>
                        <span>Agentic Systems Developer</span>
                        <span className="role-divider">|</span>
                        <span>Full Stack Developer</span>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hero-scroll-indicator">
                    <a href="#about" className="scroll-link" aria-label="Scroll to content">
                        <svg className="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </a>
                </div>
            </section>
        );
    };

    // Home Page with all sections
    const HomePage = () => (
        <main className="main-page-content">
            <HeroSection />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Achievements />
            <Contact />
        </main>
    );

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

            <Router>
                <ScrollToTop />
                <SmoothScroll>
                    <div className={`app ${isLoading ? 'app--loading' : 'app--ready'}`}>
                        <div className="cursor-glow" ref={cursorGlowRef}></div>
                        <CursorTrail />

                        <Navbar />

                        <div className={`main-content ${isLoading ? 'hidden' : 'visible'}`}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/work" element={<Projects />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/experience" element={<Experience />} />
                                <Route path="/achievements" element={<Achievements />} />
                                <Route path="/resume" element={<Resume />} />
                                <Route path="/certifications" element={<Certifications />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>

                            <Footer />
                        </div>

                        <VirtualVignesh onOpenResume={() => setShowResume(true)} />
                        <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
                    </div>
                </SmoothScroll>
            </Router>
        </>
    );
}

export default App;

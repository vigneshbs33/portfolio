'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

// Neural Network SVG Logo Component (no letters, pure tech symbol)
const NeuralLogo = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Connection lines */}
        <g filter="url(#glow)">
            <path className="neural-line" d="M50 20 L25 40" style={{ animationDelay: '0s' }} />
            <path className="neural-line" d="M50 20 L75 40" style={{ animationDelay: '0.2s' }} />
            <path className="neural-line" d="M25 40 L20 65" style={{ animationDelay: '0.4s' }} />
            <path className="neural-line" d="M25 40 L50 55" style={{ animationDelay: '0.6s' }} />
            <path className="neural-line" d="M75 40 L80 65" style={{ animationDelay: '0.8s' }} />
            <path className="neural-line" d="M75 40 L50 55" style={{ animationDelay: '1s' }} />
            <path className="neural-line" d="M20 65 L50 80" style={{ animationDelay: '1.2s' }} />
            <path className="neural-line" d="M50 55 L50 80" style={{ animationDelay: '1.4s' }} />
            <path className="neural-line" d="M80 65 L50 80" style={{ animationDelay: '1.6s' }} />
        </g>

        {/* Neural nodes */}
        <g filter="url(#glow)">
            <circle className="neural-node" cx="50" cy="20" r="6" fill="url(#nodeGradient)" />
            <circle className="neural-node" cx="25" cy="40" r="5" fill="url(#nodeGradient)" />
            <circle className="neural-node" cx="75" cy="40" r="5" fill="url(#nodeGradient)" />
            <circle className="neural-node" cx="20" cy="65" r="4" fill="url(#nodeGradient)" />
            <circle className="neural-node" cx="50" cy="55" r="5" fill="url(#nodeGradient)" />
            <circle className="neural-node" cx="80" cy="65" r="4" fill="url(#nodeGradient)" />
            <circle className="neural-node" cx="50" cy="80" r="6" fill="url(#nodeGradient)" />
        </g>
    </svg>
);

const LoadingScreen = ({ onComplete }) => {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const progressRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out the entire loading screen
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: onComplete
                });
            }
        });

        // Logo entrance animation
        tl.fromTo(logoRef.current,
            { scale: 0.3, opacity: 0, rotate: -20 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' }
        );

        // Logo pulse glow effect
        tl.to(logoRef.current, {
            boxShadow: '0 0 60px rgba(59, 130, 246, 0.8), 0 0 120px rgba(59, 130, 246, 0.4)',
            duration: 0.4,
            ease: 'power2.inOut'
        }, '-=0.2');

        tl.to(logoRef.current, {
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
        });

        // Text fade in
        tl.fromTo(textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
            '-=0.3'
        );

        // Progress bar animation
        tl.fromTo(progressRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: 'power1.inOut' },
            '-=0.3'
        );

        // Continuous subtle logo float animation
        gsap.to(logoRef.current, {
            y: -8,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div className="loading-screen" ref={containerRef}>
            {/* Animated background */}
            <div className="loading-bg">
                <div className="loading-grid"></div>
                <div className="loading-glow loading-glow-1"></div>
                <div className="loading-glow loading-glow-2"></div>
                <div className="loading-particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle" style={{
                            '--delay': `${Math.random() * 3}s`,
                            '--x': `${Math.random() * 100}%`,
                            '--duration': `${2 + Math.random() * 2}s`
                        }}></div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="loading-content">
                <div className="loading-logo" ref={logoRef}>
                    <NeuralLogo />
                </div>

                <div className="loading-text" ref={textRef}>
                    <span className="loading-name">Vignesh B S</span>
                    <span className="loading-tagline">AI/ML & Agentic Systems Developer</span>
                </div>

                <div className="loading-progress-container">
                    <div className="loading-progress" ref={progressRef}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;


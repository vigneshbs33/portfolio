'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { summary, education, experience, personalInfo } from '../data/portfolio';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.about-content',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'top 30%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            gsap.fromTo('.about-image-wrapper',
                { opacity: 0, x: -60 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate experience cards
            gsap.fromTo('.about-experience-card',
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.15,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-experience-list',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="about-section section" ref={sectionRef}>
            <div className="about-bg-glow"></div>
            <div className="container">
                <div className="about-grid">
                    <div className="about-image-wrapper">
                        <div className="about-image-container">
                            <div className="about-image-frame"></div>
                            <img
                                src={personalInfo.fullImage}
                                alt={personalInfo.name}
                                className="about-image"
                            />
                        </div>
                    </div>

                    <div className="about-content">
                        <span className="section-title">About Me</span>
                        <h2 className="about-heading">
                            Building <span className="gradient-text">Intelligent Systems</span> That Transform Ideas Into Impact
                        </h2>

                        {/* Role Tags */}
                        <div className="about-roles">
                            <span className="about-role">AI/ML Engineer</span>
                            <span className="about-role-divider">|</span>
                            <span className="about-role">Agentic Systems Developer</span>
                            <span className="about-role-divider">|</span>
                            <span className="about-role">Full Stack Developer</span>
                        </div>

                        <div className="about-text">
                            <p>{summary}</p>
                        </div>

                        {/* Featured Experience Cards */}
                        <div className="about-experience-list">
                            <h3 className="about-experience-title">Current Roles</h3>
                            {experience.slice(0, 2).map((exp) => (
                                <div key={exp.id} className="about-experience-card glass-card">
                                    <div className="exp-logo">
                                        {exp.logo ? (
                                            <img src={exp.logo} alt={exp.company} />
                                        ) : (
                                            <div className="exp-logo-placeholder">{exp.company.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div className="exp-content">
                                        <div className="exp-header">
                                            <span className="exp-role">{exp.role}</span>
                                            <span className="exp-type">{exp.type}</span>
                                        </div>
                                        <span className="exp-company">{exp.company}</span>
                                        <span className="exp-duration">{exp.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Education - small corner style */}
                        <div className="about-education-mini">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                            <span>{education.degree.split(' in ')[0]} • {education.institution.split(' (')[0]} • {education.cgpa}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;


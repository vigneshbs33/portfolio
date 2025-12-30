import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/portfolio';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate timeline line
            gsap.fromTo('.timeline-line-fill',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.experience-timeline',
                        start: 'top 70%',
                        end: 'bottom 50%',
                        scrub: 1
                    }
                }
            );

            // Animate each experience card
            gsap.utils.toArray('.experience-card').forEach((card, index) => {
                gsap.fromTo(card,
                    { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" className="experience-section section" ref={sectionRef}>
            <div className="experience-bg-glow"></div>
            <div className="container">
                <div className="section-heading">
                    <span className="section-title">Experience</span>
                    <h2>Where I've <span className="gradient-text">Worked</span></h2>
                </div>

                <div className="experience-timeline">
                    <div className="timeline-line">
                        <div className="timeline-line-fill"></div>
                    </div>

                    {experience.map((exp, index) => (
                        <div key={exp.id} className="experience-card glass-card">
                            <div className="experience-marker">
                                <div className="marker-dot"></div>
                            </div>

                            <div className="experience-header">
                                <div className="experience-logo">
                                    {exp.logo ? (
                                        <img src={exp.logo} alt={exp.company} />
                                    ) : (
                                        <div className="logo-placeholder">
                                            {exp.company.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="experience-meta">
                                    <span className="experience-company">{exp.company}</span>
                                    <span className="experience-type">{exp.type}</span>
                                </div>
                                <span className="experience-duration">{exp.duration}</span>
                            </div>

                            <h3 className="experience-role">{exp.role}</h3>
                            <p className="experience-description">{exp.description}</p>

                            <div className="experience-index">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

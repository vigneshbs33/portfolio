import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
    { key: 'programming', label: 'Programming', icon: '⌨️' },
    { key: 'aiml', label: 'AI & Machine Learning', icon: '🧠' },
    { key: 'frameworks', label: 'Frameworks & Tools', icon: '🛠️' },
    { key: 'cloud', label: 'Cloud & Deployment', icon: '☁️' }
];

const Skills = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.skill-category',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.skills-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Floating animation for skill tags
            gsap.utils.toArray('.skill-tag').forEach((tag, index) => {
                gsap.to(tag, {
                    y: -5,
                    duration: 2 + (index % 3) * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.1
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="skills-section section" ref={sectionRef}>
            <div className="skills-bg-pattern"></div>
            <div className="skills-bg-glow"></div>
            <div className="container">
                <div className="section-heading">
                    <span className="section-title">Skills</span>
                    <h2>Technical <span className="gradient-text">Expertise</span></h2>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((category) => (
                        <div key={category.key} className="skill-category glass-card">
                            <div className="category-header">
                                <span className="category-icon">{category.icon}</span>
                                <h3 className="category-label">{category.label}</h3>
                            </div>
                            <div className="skill-tags">
                                {skills[category.key].map((skill, index) => (
                                    <span key={index} className="skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="skills-highlight">
                    <div className="highlight-content">
                        <span className="highlight-label">Core Focus</span>
                        <h3 className="highlight-text">
                            Building <span className="gradient-text">Agentic AI Systems</span> &
                            <span className="gradient-text"> Intelligent Automation</span>
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;

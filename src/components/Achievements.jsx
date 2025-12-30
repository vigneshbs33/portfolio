import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { achievements } from '../data/portfolio';
import './Achievements.css';

const Achievements = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial state
            gsap.set('.achievements-header', { opacity: 0, y: 30 });
            gsap.set('.achievement-stat', { opacity: 0, scale: 0.8 });
            gsap.set('.achievement-card', { opacity: 0, y: 40 });

            // Create timeline for smooth sequential animation
            const tl = gsap.timeline({ delay: 0.2 });

            // Animate header
            tl.to('.achievements-header', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            });

            // Animate stats
            tl.to('.achievement-stat', {
                opacity: 1,
                scale: 1,
                stagger: 0.08,
                duration: 0.5,
                ease: 'back.out(1.5)'
            }, '-=0.3');

            // Animate all cards
            tl.to('.achievement-card', {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.2');

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const getPositionStyle = (position) => {
        if (position.includes('1st') || position.includes('Winner')) return 'gold';
        if (position.includes('2nd')) return 'silver';
        if (position.includes('3rd')) return 'bronze';
        return 'special';
    };

    const getTrophy = (position) => {
        if (position.includes('1st') || position.includes('Winner')) return '🏆';
        if (position.includes('2nd')) return '🥈';
        if (position.includes('3rd')) return '🥉';
        return '⭐';
    };

    const getGradientClass = (index) => {
        const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5', 'gradient-6'];
        return gradients[index % gradients.length];
    };

    // Calculate totals
    const totalPrize = achievements.reduce((acc, a) => {
        if (!a.prize) return acc;
        const num = a.prize.replace(/[^0-9.]/g, '');
        const mult = a.prize.includes('$') ? 83 : 1;
        return acc + (parseFloat(num) * mult / 1000);
    }, 0);

    const wins = achievements.filter(a =>
        a.position.includes('1st') || a.position.includes('Winner')
    ).length;

    return (
        <section id="achievements" className="achievements-section section" ref={sectionRef}>
            <div className="achievements-bg">
                <div className="achievements-glow achievements-glow-1"></div>
                <div className="achievements-glow achievements-glow-2"></div>
                <div className="achievements-pattern"></div>
            </div>

            <div className="container">
                <div className="achievements-header">
                    <span className="section-title">Recognition</span>
                    <h2 className="achievements-heading">
                        Award-Winning <span className="gradient-text">Innovation</span>
                    </h2>
                    <p className="achievements-subtitle">
                        Multiple national and international hackathon victories showcasing real-world impact
                    </p>
                </div>

                {/* Stats Row */}
                <div className="achievements-stats">
                    <div className="achievement-stat">
                        <span className="stat-icon">🏆</span>
                        <span className="stat-value">{wins}</span>
                        <span className="stat-label">First Place Wins</span>
                    </div>
                    <div className="achievement-stat">
                        <span className="stat-icon">🎯</span>
                        <span className="stat-value">8+</span>
                        <span className="stat-label">Total Awards</span>
                    </div>
                    <div className="achievement-stat stat-highlight">
                        <span className="stat-icon">💰</span>
                        <span className="stat-value">₹1L+</span>
                        <span className="stat-label">Prize Value</span>
                    </div>
                    <div className="achievement-stat">
                        <span className="stat-icon">🌍</span>
                        <span className="stat-value">2</span>
                        <span className="stat-label">International Wins</span>
                    </div>
                </div>

                {/* Uniform Grid of All Achievements */}
                <div className="achievements-masonry">
                    {achievements.map((achievement, index) => (
                        <div
                            key={achievement.id}
                            className={`achievement-card ${getPositionStyle(achievement.position)}`}
                        >
                            {/* Card Visual Header */}
                            <div className={`achievement-visual ${achievement.image ? '' : getGradientClass(index)}`}>
                                {achievement.image ? (
                                    <img
                                        src={achievement.image}
                                        alt={achievement.title}
                                        className="achievement-img"
                                    />
                                ) : (
                                    <div className="achievement-icon-wrapper">
                                        <span className="achievement-icon">{getTrophy(achievement.position)}</span>
                                    </div>
                                )}
                                <div className="achievement-visual-overlay"></div>

                                {/* Position Badge */}
                                <div className="achievement-position-badge">
                                    <span>{achievement.position}</span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="achievement-body">
                                <h3 className="achievement-name">{achievement.title}</h3>

                                {achievement.prize && (
                                    <div className="achievement-prize-tag">
                                        <span className="prize-icon">💰</span>
                                        <span className="prize-amount">{achievement.prize}</span>
                                    </div>
                                )}

                                <p className="achievement-desc">{achievement.description}</p>

                                <div className="achievement-footer">
                                    {achievement.link && (
                                        <a
                                            href={achievement.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="achievement-btn"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                            View Project
                                        </a>
                                    )}
                                    {achievement.certificate && (
                                        <a
                                            href={achievement.certificate}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="achievement-btn achievement-btn-cert"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                            Certificate
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;

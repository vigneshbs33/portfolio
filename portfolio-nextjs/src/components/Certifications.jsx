'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '../data/portfolio';
import './Certifications.css';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
    const sectionRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedCert, setSelectedCert] = useState(null);

    // Only show categories that exist in certifications (no Hackathon/Award - those are in Achievements)
    const categories = ['All', 'Workshop', 'Certification', 'Experience', 'Participation', 'Challenge'];

    const filteredCerts = activeCategory === 'All'
        ? certifications
        : certifications.filter(cert => cert.category === activeCategory);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.certifications-header',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo('.cert-filters',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Animate cards when filter changes
        gsap.fromTo('.cert-card',
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power3.out'
            }
        );
    }, [activeCategory]);

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Workshop':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                );
            case 'Certification':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                );
            case 'Experience':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                );
            case 'Participation':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="7" />
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                );
            case 'Challenge':
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                );
            default:
                return (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                    </svg>
                );
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Workshop': return 'cert-workshop';
            case 'Certification': return 'cert-certification';
            case 'Experience': return 'cert-experience';
            case 'Participation': return 'cert-participation';
            case 'Challenge': return 'cert-challenge';
            default: return 'cert-default';
        }
    };

    const isPDF = (path) => path?.toLowerCase().endsWith('.pdf');

    const openCertificate = (cert) => {
        setSelectedCert(cert);
    };

    return (
        <section id="certifications" className="certifications-section" ref={sectionRef}>
            <div className="certifications-container">
                <div className="certifications-header">
                    <span className="section-label">Credentials</span>
                    <h2 className="section-title">Certifications & Training</h2>
                    <p className="section-subtitle">
                        Workshops, professional certifications, experience letters, and event participations.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="cert-filters">
                    {categories.map(category => {
                        const count = category === 'All'
                            ? certifications.length
                            : certifications.filter(c => c.category === category).length;

                        // Hide categories with 0 items
                        if (count === 0 && category !== 'All') return null;

                        return (
                            <button
                                key={category}
                                className={`cert-filter-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                                {category !== 'All' && (
                                    <span className="filter-count">{count}</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Certificates Grid */}
                <div className="cert-grid">
                    {filteredCerts.map((cert) => (
                        <div
                            key={cert.id}
                            className={`cert-card ${getCategoryColor(cert.category)} ${cert.featured ? 'featured' : ''}`}
                            onClick={() => openCertificate(cert)}
                        >
                            <div className="cert-image-container">
                                {isPDF(cert.image) ? (
                                    <div className="cert-pdf-preview">
                                        <iframe
                                            src={`${cert.image}#toolbar=0&navpanes=0&scrollbar=0`}
                                            title={cert.title}
                                            loading="lazy"
                                        />
                                        <div className="pdf-overlay">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                            <span>PDF</span>
                                        </div>
                                    </div>
                                ) : (
                                    <img src={cert.image} alt={cert.title} loading="lazy" />
                                )}
                                <div className="cert-overlay">
                                    <span className="view-btn">
                                        {isPDF(cert.image) ? 'View PDF' : 'View Certificate'}
                                    </span>
                                </div>
                            </div>

                            <div className="cert-content">
                                <div className="cert-category-badge">
                                    {getCategoryIcon(cert.category)}
                                    <span>{cert.category}</span>
                                </div>
                                <h3 className="cert-title">{cert.title}</h3>
                                <div className="cert-meta">
                                    <span className="cert-issuer">{cert.issuer}</span>
                                    <span className="cert-date">{cert.date}</span>
                                </div>
                            </div>

                            {cert.featured && (
                                <div className="featured-badge">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="cert-stats">
                    <div className="stat-item">
                        <span className="stat-number">{certifications.filter(c => c.category === 'Workshop').length}</span>
                        <span className="stat-label">Workshops</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{certifications.length}</span>
                        <span className="stat-label">Total Certificates</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{certifications.filter(c => c.category === 'Experience').length}</span>
                        <span className="stat-label">Experience Letters</span>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedCert && (
                <div className="cert-lightbox" onClick={() => setSelectedCert(null)}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedCert(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {isPDF(selectedCert.image) ? (
                            <div className="lightbox-pdf">
                                <iframe
                                    src={selectedCert.image}
                                    title={selectedCert.title}
                                />
                            </div>
                        ) : (
                            <img src={selectedCert.image} alt={selectedCert.title} />
                        )}

                        <div className="lightbox-info">
                            <h3>{selectedCert.title}</h3>
                            <p>{selectedCert.issuer} • {selectedCert.date}</p>
                            {isPDF(selectedCert.image) && (
                                <a
                                    href={selectedCert.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="lightbox-download"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Open in New Tab
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certifications;



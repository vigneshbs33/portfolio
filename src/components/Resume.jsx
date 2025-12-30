import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { personalInfo } from '../data/portfolio';
import './Resume.css';

const Resume = () => {
    const pageRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1; // Update if resume has multiple pages

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.resume-header',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
            gsap.fromTo('.resume-viewer-container',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
            );
            gsap.fromTo('.resume-action-btn',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = personalInfo.resume;
        link.download = 'Vignesh_B_S_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <section id="resume" className="resume-page section" ref={pageRef}>
            <div className="resume-bg-glow"></div>

            <div className="container">
                {/* Header */}
                <div className="resume-header">
                    <div className="resume-header-content">
                        <span className="section-title">Resume</span>
                        <h1>My Professional <span className="gradient-text">Resume</span></h1>
                        <p className="resume-subtitle">
                            A summary of my skills, experience, and achievements
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="resume-actions">
                        <a
                            href={personalInfo.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn resume-action-btn"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15,3 21,3 21,9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Open in New Tab
                        </a>
                        <button className="btn btn-primary resume-action-btn" onClick={handleDownload}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7,10 12,15 17,10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Resume Viewer */}
                <div className="resume-viewer-container glass-card">
                    {/* Viewer Header */}
                    <div className="resume-viewer-header">
                        <div className="resume-viewer-info">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14,2 14,8 20,8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10,9 9,9 8,9" />
                            </svg>
                            <span>Vignesh_B_S_Resume.pdf</span>
                        </div>
                        <div className="resume-page-indicator">
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>
                    </div>

                    {/* PDF Viewer */}
                    <div className="resume-viewer-body">
                        {isLoading && (
                            <div className="resume-loading">
                                <div className="resume-loading-spinner"></div>
                                <span>Loading Resume...</span>
                            </div>
                        )}
                        <iframe
                            src={`${personalInfo.resume}#toolbar=0&navpanes=0&scrollbar=0`}
                            title="Resume"
                            className="resume-iframe"
                            onLoad={handleIframeLoad}
                        />
                    </div>

                    {/* Viewer Footer */}
                    <div className="resume-viewer-footer">
                        <div className="resume-viewer-controls">
                            <a
                                href={personalInfo.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resume-control-btn"
                                title="Fullscreen"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                </svg>
                            </a>
                            <button className="resume-control-btn" onClick={handleDownload} title="Download">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7,10 12,15 17,10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </button>
                        </div>
                        <div className="resume-viewer-hint">
                            <span>Scroll to view full resume • Click download for offline access</span>
                        </div>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="resume-quick-info">
                    <div className="resume-info-card glass-card">
                        <div className="resume-info-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <div className="resume-info-content">
                            <h4>Name</h4>
                            <p>{personalInfo.name}</p>
                        </div>
                    </div>
                    <div className="resume-info-card glass-card">
                        <div className="resume-info-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div className="resume-info-content">
                            <h4>Contact</h4>
                            <p>{personalInfo.email}</p>
                        </div>
                    </div>
                    <div className="resume-info-card glass-card">
                        <div className="resume-info-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                        </div>
                        <div className="resume-info-content">
                            <h4>Role</h4>
                            <p>{personalInfo.title}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;

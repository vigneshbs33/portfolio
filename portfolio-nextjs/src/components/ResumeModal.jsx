'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { personalInfo } from '../data/portfolio';
import './ResumeModal.css';

const ResumeModal = ({ isOpen, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
            gsap.fromTo('.resume-modal-overlay',
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            gsap.fromTo('.resume-modal-content',
                { opacity: 0, scale: 0.95, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.1 }
            );
        } else if (isAnimating) {
            gsap.to('.resume-modal-overlay', { opacity: 0, duration: 0.2 });
            gsap.to('.resume-modal-content', {
                opacity: 0,
                scale: 0.95,
                duration: 0.2,
                onComplete: () => {
                    setIsAnimating(false);
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }, [isOpen, isAnimating]);

    if (!isOpen && !isAnimating) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = personalInfo.resume;
        link.download = 'Vignesh_B_S_Resume.pdf';
        link.click();
    };

    return (
        <div className="resume-modal-overlay" onClick={onClose}>
            <div className="resume-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                <div className="resume-modal-header">
                    <h3>Resume</h3>
                    <button className="resume-close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="resume-modal-body">
                    <iframe
                        src={`${personalInfo.resume}#toolbar=0`}
                        title="Resume"
                        className="resume-iframe"
                    />
                </div>

                <div className="resume-modal-footer">
                    <a
                        href={personalInfo.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15,3 21,3 21,9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Open in New Tab
                    </a>
                    <button className="btn btn-primary" onClick={handleDownload}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7,10 12,15 17,10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;


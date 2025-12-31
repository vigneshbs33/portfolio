'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { personalInfo } from '../data/portfolio';
import './Navbar.css';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Work', href: '/work' },
        { name: 'About', href: '/about' },
        { name: 'Experience', href: '/experience' },
        { name: 'Achievements', href: '/achievements' },
        { name: 'Certifications', href: '/certifications' },
        { name: 'Resume', href: '/resume' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (navRef.current) {
            gsap.fromTo(navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
            );
        }
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';

            gsap.to('.mobile-drawer', {
                x: 0,
                duration: 0.4,
                ease: 'power3.out'
            });

            gsap.to('.mobile-backdrop', {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3
            });

            gsap.fromTo('.mobile-drawer__link',
                { x: 30, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: 'power3.out', delay: 0.2 }
            );
        } else {
            document.body.style.overflow = 'auto';

            gsap.to('.mobile-drawer', {
                x: '100%',
                duration: 0.35,
                ease: 'power3.in'
            });

            gsap.to('.mobile-backdrop', {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.3
            });
        }
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    const isActive = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <div className="navbar__inner">
                    {/* Logo */}
                    <Link href="/" className="navbar__logo" onClick={closeMenu}>
                        <div className="navbar__logo-icon">
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="navLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#60A5FA" />
                                        <stop offset="100%" stopColor="#1E40AF" />
                                    </linearGradient>
                                </defs>
                                <g stroke="url(#navLineGradient)" strokeWidth="3" fill="none">
                                    <path d="M50 15 L25 35" />
                                    <path d="M50 15 L75 35" />
                                    <path d="M25 35 L25 60" />
                                    <path d="M75 35 L75 60" />
                                    <path d="M25 35 L50 50" />
                                    <path d="M75 35 L50 50" />
                                    <path d="M25 60 L50 85" />
                                    <path d="M75 60 L50 85" />
                                    <path d="M50 50 L50 85" />
                                </g>
                                <g fill="#3B82F6">
                                    <circle cx="50" cy="15" r="6" />
                                    <circle cx="25" cy="35" r="5" />
                                    <circle cx="75" cy="35" r="5" />
                                    <circle cx="25" cy="60" r="4" />
                                    <circle cx="75" cy="60" r="4" />
                                    <circle cx="50" cy="50" r="5" />
                                    <circle cx="50" cy="85" r="6" />
                                </g>
                            </svg>
                        </div>
                        <span className="navbar__logo-text">Vignesh B S</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar__nav">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`navbar__link ${isActive(link.href) ? 'navbar__link--active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="navbar__right">
                        <Link href="/contact" className="navbar__cta" onClick={closeMenu}>
                            <svg className="navbar__cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <span>Let&apos;s Talk</span>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className={`navbar__burger ${menuOpen ? 'navbar__burger--active' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Backdrop */}
            <div className="mobile-backdrop" onClick={closeMenu}></div>

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`}>
                <div className="mobile-drawer__header">
                    <span className="mobile-drawer__title">Menu</span>
                    <button className="mobile-drawer__close" onClick={closeMenu}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mobile-drawer__nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`mobile-drawer__link ${isActive(link.href) ? 'mobile-drawer__link--active' : ''}`}
                            onClick={closeMenu}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="mobile-drawer__footer">
                    <Link href="/contact" className="mobile-drawer__cta" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>Let&apos;s Talk</span>
                    </Link>

                    <div className="mobile-drawer__social">
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a href={`mailto:${personalInfo.email}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

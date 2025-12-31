'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './MagneticButton.css';

const MagneticButton = ({
    children,
    className = '',
    as: Component = 'button',
    strength = 0.5,
    acceleration = true,
    ...props
}) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const velocityRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        // Smooth animation loop with acceleration
        const animate = () => {
            // Apply spring physics for smooth acceleration
            const springStrength = 0.15;
            const friction = 0.85;

            velocityRef.current.x += (targetRef.current.x - velocityRef.current.x) * springStrength;
            velocityRef.current.y += (targetRef.current.y - velocityRef.current.y) * springStrength;

            if (acceleration) {
                velocityRef.current.x *= friction;
                velocityRef.current.y *= friction;
            }

            gsap.set(button, {
                x: velocityRef.current.x,
                y: velocityRef.current.y,
            });

            if (textRef.current) {
                gsap.set(textRef.current, {
                    x: velocityRef.current.x * 0.4,
                    y: velocityRef.current.y * 0.4,
                });
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const x = e.clientX - centerX;
            const y = e.clientY - centerY;

            // Calculate distance for magnetic strength falloff
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);
            const magneticPull = Math.max(0, 1 - distance / maxDistance);

            targetRef.current.x = x * strength * magneticPull;
            targetRef.current.y = y * strength * magneticPull;
        };

        const handleMouseEnter = () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            targetRef.current.x = 0;
            targetRef.current.y = 0;

            gsap.to(button, {
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.4)'
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationRef.current);
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength, acceleration]);

    return (
        <Component
            ref={buttonRef}
            className={`magnetic-button ${className}`}
            {...props}
        >
            <span ref={textRef} className="magnetic-button-content">
                {children}
            </span>
        </Component>
    );
};

export default MagneticButton;


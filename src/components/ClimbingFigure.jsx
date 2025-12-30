import { useEffect, useRef, useState } from 'react';

const ClimbingFigure = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(0);
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const limbPhase = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;

            setScrollProgress(Math.min(1, Math.max(0, progress)));
            setScrollDirection(scrollTop > lastScrollY.current ? 1 : -1);
            setIsScrolling(true);
            lastScrollY.current = scrollTop;

            // Clear timeout and set new one
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout.current);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const ropeStartY = 50;
        const ropeEndY = window.innerHeight - 100;
        const ropeHeight = ropeEndY - ropeStartY;

        canvas.width = 80;
        canvas.height = window.innerHeight;

        const draw3DFigure = (x, y, isAtBottom, isClimbing, direction) => {
            ctx.save();
            ctx.translate(x, y);

            // Animate limbs when climbing
            if (isClimbing) {
                limbPhase.current += direction * 0.25;
            }

            const legAngle = isAtBottom ? 0 : Math.sin(limbPhase.current) * 0.4;
            const armAngle = isAtBottom ? 0 : Math.sin(limbPhase.current + Math.PI) * 0.3;

            // 3D shadow/depth effect
            ctx.shadowColor = 'rgba(139, 92, 246, 0.5)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;

            // Body gradient for 3D effect
            const bodyGradient = ctx.createLinearGradient(-10, -30, 10, 30);
            bodyGradient.addColorStop(0, 'rgba(200, 180, 255, 1)');
            bodyGradient.addColorStop(0.5, 'rgba(139, 92, 246, 1)');
            bodyGradient.addColorStop(1, 'rgba(100, 60, 200, 1)');

            // Head (3D sphere effect)
            const headGradient = ctx.createRadialGradient(-3, -28, 2, 0, -25, 10);
            headGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            headGradient.addColorStop(0.5, 'rgba(220, 200, 255, 1)');
            headGradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');

            ctx.beginPath();
            ctx.arc(0, -25, 10, 0, Math.PI * 2);
            ctx.fillStyle = headGradient;
            ctx.fill();

            // Face details
            ctx.fillStyle = '#333';
            ctx.beginPath();
            ctx.arc(-3, -27, 1.5, 0, Math.PI * 2); // Left eye
            ctx.arc(3, -27, 1.5, 0, Math.PI * 2);  // Right eye
            ctx.fill();

            // Smile
            ctx.beginPath();
            ctx.arc(0, -23, 4, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Body (3D cylinder effect)
            ctx.fillStyle = bodyGradient;
            ctx.beginPath();
            ctx.roundRect(-6, -15, 12, 25, 4);
            ctx.fill();

            // Arms
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.strokeStyle = bodyGradient;

            if (isAtBottom) {
                // Arms at sides when standing
                ctx.beginPath();
                ctx.moveTo(-6, -10);
                ctx.lineTo(-12, 5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(6, -10);
                ctx.lineTo(12, 5);
                ctx.stroke();
            } else {
                // Arms climbing the rope
                ctx.beginPath();
                ctx.moveTo(-6, -10);
                ctx.quadraticCurveTo(-15 + armAngle * 10, -15, -8, -30 + armAngle * 15);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(6, -10);
                ctx.quadraticCurveTo(15 - armAngle * 10, 0, 8, 15 - armAngle * 15);
                ctx.stroke();
            }

            // Legs (3D with gradient)
            if (isAtBottom) {
                // Standing pose
                ctx.beginPath();
                ctx.moveTo(-3, 10);
                ctx.lineTo(-6, 35);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(3, 10);
                ctx.lineTo(6, 35);
                ctx.stroke();

                // Feet
                ctx.beginPath();
                ctx.ellipse(-6, 38, 6, 3, 0, 0, Math.PI * 2);
                ctx.ellipse(6, 38, 6, 3, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(80, 50, 150, 1)';
                ctx.fill();
            } else {
                // Climbing legs
                ctx.beginPath();
                ctx.moveTo(-3, 10);
                ctx.quadraticCurveTo(-8 + legAngle * 15, 20, -5 + legAngle * 10, 30);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(3, 10);
                ctx.quadraticCurveTo(8 - legAngle * 15, 20, 5 - legAngle * 10, 30);
                ctx.stroke();
            }

            ctx.restore();
        };

        const drawFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate figure position
            const isAtBottom = scrollProgress > 0.95;
            const figureY = isAtBottom
                ? ropeEndY
                : ropeStartY + scrollProgress * ropeHeight;

            // Draw rope (only up to figure when not at bottom)
            const ropeX = 40;

            // Rope shadow
            ctx.strokeStyle = 'rgba(80, 50, 150, 0.3)';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(ropeX + 2, ropeStartY);
            ctx.lineTo(ropeX + 2, isAtBottom ? ropeEndY - 40 : figureY - 30);
            ctx.stroke();

            // Main rope
            const ropeGradient = ctx.createLinearGradient(ropeX - 3, 0, ropeX + 3, 0);
            ropeGradient.addColorStop(0, 'rgba(180, 160, 220, 1)');
            ropeGradient.addColorStop(0.5, 'rgba(139, 92, 246, 1)');
            ropeGradient.addColorStop(1, 'rgba(100, 70, 180, 1)');

            ctx.strokeStyle = ropeGradient;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(ropeX, ropeStartY);
            ctx.lineTo(ropeX, isAtBottom ? ropeEndY - 40 : figureY - 30);
            ctx.stroke();

            // Rope knots
            const knotCount = 8;
            for (let i = 0; i <= knotCount; i++) {
                const knotY = ropeStartY + (ropeHeight / knotCount) * i;
                if (knotY < (isAtBottom ? ropeEndY - 40 : figureY - 30)) {
                    ctx.beginPath();
                    ctx.arc(ropeX, knotY, 5, 0, Math.PI * 2);
                    const knotGradient = ctx.createRadialGradient(ropeX - 1, knotY - 1, 1, ropeX, knotY, 5);
                    knotGradient.addColorStop(0, 'rgba(200, 180, 255, 1)');
                    knotGradient.addColorStop(1, 'rgba(100, 70, 180, 1)');
                    ctx.fillStyle = knotGradient;
                    ctx.fill();
                }
            }

            // Top anchor
            ctx.beginPath();
            ctx.arc(ropeX, ropeStartY - 5, 8, 0, Math.PI * 2);
            const anchorGradient = ctx.createRadialGradient(ropeX - 2, ropeStartY - 7, 2, ropeX, ropeStartY - 5, 8);
            anchorGradient.addColorStop(0, 'rgba(255, 220, 100, 1)');
            anchorGradient.addColorStop(1, 'rgba(200, 150, 50, 1)');
            ctx.fillStyle = anchorGradient;
            ctx.fill();

            // Ground platform when at bottom
            if (isAtBottom) {
                ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
                ctx.beginPath();
                ctx.ellipse(ropeX, ropeEndY + 38, 25, 8, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw the 3D stick figure
            draw3DFigure(ropeX, figureY, isAtBottom, isScrolling, scrollDirection);

            // Scroll percentage
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(139, 92, 246, 0.9)';
            ctx.fillText(`${Math.round(scrollProgress * 100)}%`, ropeX, ropeEndY + 60);

            animationRef.current = requestAnimationFrame(drawFrame);
        };

        drawFrame();

        const handleResize = () => {
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, [scrollProgress, isScrolling, scrollDirection]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                right: '10px',
                top: 0,
                width: '80px',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 1000,
            }}
        />
    );
};

export default ClimbingFigure;

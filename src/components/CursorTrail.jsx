import { useEffect, useRef } from 'react';

const CursorTrail = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -100, y: -100 });
    const animationId = useRef(null);
    const gridPoints = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const gridSize = 50;
        const influenceRadius = 120;
        const maxDisplacement = 25;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initGrid();
        };

        const initGrid = () => {
            gridPoints.current = [];
            const cols = Math.ceil(canvas.width / gridSize) + 1;
            const rows = Math.ceil(canvas.height / gridSize) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    gridPoints.current.push({
                        baseX: i * gridSize,
                        baseY: j * gridSize,
                        x: i * gridSize,
                        y: j * gridSize,
                        vx: 0,
                        vy: 0
                    });
                }
            }
        };

        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update grid points
            gridPoints.current.forEach(point => {
                const dx = mouse.current.x - point.baseX;
                const dy = mouse.current.y - point.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < influenceRadius) {
                    const force = (1 - distance / influenceRadius) * maxDisplacement;
                    const angle = Math.atan2(dy, dx);

                    // Push points away from cursor (bend effect)
                    const targetX = point.baseX - Math.cos(angle) * force;
                    const targetY = point.baseY - Math.sin(angle) * force;

                    // Spring physics
                    point.vx += (targetX - point.x) * 0.2;
                    point.vy += (targetY - point.y) * 0.2;
                } else {
                    // Return to base position
                    point.vx += (point.baseX - point.x) * 0.1;
                    point.vy += (point.baseY - point.y) * 0.1;
                }

                // Apply velocity with damping
                point.vx *= 0.85;
                point.vy *= 0.85;
                point.x += point.vx;
                point.y += point.vy;
            });

            // Draw grid lines
            const cols = Math.ceil(canvas.width / gridSize) + 1;
            const rows = Math.ceil(canvas.height / gridSize) + 1;

            // Draw horizontal line segments - only near cursor
            for (let j = 0; j < rows; j++) {
                for (let i = 0; i < cols - 1; i++) {
                    const point1 = gridPoints.current[i * rows + j];
                    const point2 = gridPoints.current[(i + 1) * rows + j];

                    if (point1 && point2) {
                        // Calculate distance of line segment from cursor
                        const midX = (point1.x + point2.x) / 2;
                        const midY = (point1.y + point2.y) / 2;
                        const dx = mouse.current.x - midX;
                        const dy = mouse.current.y - midY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // Only draw if within visibility radius
                        const visibilityRadius = influenceRadius * 2;
                        if (dist < visibilityRadius) {
                            const alpha = (1 - dist / visibilityRadius) * 0.5;

                            ctx.beginPath();
                            ctx.moveTo(point1.x, point1.y);
                            ctx.lineTo(point2.x, point2.y);
                            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw vertical line segments - only near cursor
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows - 1; j++) {
                    const point1 = gridPoints.current[i * rows + j];
                    const point2 = gridPoints.current[i * rows + (j + 1)];

                    if (point1 && point2) {
                        // Calculate distance of line segment from cursor
                        const midX = (point1.x + point2.x) / 2;
                        const midY = (point1.y + point2.y) / 2;
                        const dx = mouse.current.x - midX;
                        const dy = mouse.current.y - midY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // Only draw if within visibility radius
                        const visibilityRadius = influenceRadius * 2;
                        if (dist < visibilityRadius) {
                            const alpha = (1 - dist / visibilityRadius) * 0.5;

                            ctx.beginPath();
                            ctx.moveTo(point1.x, point1.y);
                            ctx.lineTo(point2.x, point2.y);
                            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw intersection dots near cursor
            gridPoints.current.forEach(point => {
                const dx = mouse.current.x - point.x;
                const dy = mouse.current.y - point.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < influenceRadius * 1.2) {
                    const alpha = (1 - dist / (influenceRadius * 1.2)) * 0.8;
                    const radius = 2 + (1 - dist / (influenceRadius * 1.2)) * 3;

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
                    ctx.fill();
                }
            });

            // Draw a subtle glow at cursor position
            const cursorGlow = ctx.createRadialGradient(
                mouse.current.x, mouse.current.y, 0,
                mouse.current.x, mouse.current.y, 80
            );
            cursorGlow.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
            cursorGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = cursorGlow;
            ctx.fillRect(
                mouse.current.x - 80, mouse.current.y - 80,
                160, 160
            );

            animationId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
            }}
        />
    );
};

export default CursorTrail;

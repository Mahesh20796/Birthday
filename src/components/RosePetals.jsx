import React, { useEffect, useRef } from 'react';

const RosePetals = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();

        const petals = [];
        const petalCount = 70; // Slightly more petals
        const colors = [
            '#ff4d6d', // Deep pink
            '#ff758c', // Soft pink
            '#ff85a1', // Lighter pink
            '#fb6f92', // Hot pink
            '#ffb3c1'  // Pale pink
        ];

        class Petal {
            constructor() {
                this.reset();
                // Randomize initial position so they aren't all at the top at start
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -20 - Math.random() * 100;
                this.size = Math.random() * 8 + 6;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 0.8 + 0.5; // Slower, more graceful fall
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                this.opacity = Math.random() * 0.4 + 0.4;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.swing = Math.random() * 2 + 1; // Lateral swing frequency
                this.swingSpeed = Math.random() * 0.02 + 0.01;
                this.swingOffset = Math.random() * Math.PI * 2;
                this.flip = 0;
                this.flipSpeed = Math.random() * 0.03 + 0.01;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                // Simulate 3D flip
                ctx.scale(Math.cos(this.flip), 1);
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;

                // Create a better petal shape
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size, this.size, 0, this.size * 1.5);
                ctx.bezierCurveTo(this.size, this.size, this.size, -this.size / 2, 0, 0);
                ctx.fill();

                // Inner detail line
                ctx.beginPath();
                ctx.moveTo(0, 2);
                ctx.lineTo(0, this.size);
                ctx.strokeStyle = 'rgba(0,0,0,0.05)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            }

            update() {
                this.y += this.speedY;
                // Graceful lateral drift
                this.x += this.speedX + Math.sin(this.y * this.swingSpeed + this.swingOffset) * this.swing;
                this.rotation += this.rotationSpeed;
                this.flip += this.flipSpeed;

                // Sophisticated mouse interaction
                const dx = this.x - mouse.current.x;
                const dy = this.y - mouse.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const radius = 200;

                if (distance < radius) {
                    const force = (radius - distance) / radius;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 5;
                    this.y += Math.sin(angle) * force * 2; // Less vertical push to keep movement natural
                    this.rotationSpeed += (dx > 0 ? 0.01 : -0.01) * force;
                }

                if (this.y > canvas.height + 20) {
                    this.reset();
                }
                if (this.x < -50) this.x = canvas.width + 50;
                if (this.x > canvas.width + 50) this.x = -50;
            }
        }

        for (let i = 0; i < petalCount; i++) {
            petals.push(new Petal());
        }

        const animate = () => {
            // Very subtle fade trail
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            petals.forEach(petal => {
                petal.update();
                petal.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1, // Stay above background but below content
                pointerEvents: 'none',
                opacity: 0.8
            }}
        />
    );
};

export default RosePetals;

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ScratchCard = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const setCanvasSize = () => {
            canvas.width = containerRef.current.offsetWidth;
            canvas.height = containerRef.current.offsetHeight;

            // Initial grey glass coating
            ctx.fillStyle = '#bdc3c7';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add some texture/pattern to the coating
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            for (let i = 0; i < 100; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'destination-out';
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const scratch = (x, y) => {
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
            checkReveal();
        };

        const handleMouseMove = (e) => {
            if (isComplete) return;
            const rect = canvas.getBoundingClientRect();
            if (e.buttons === 1) {
                scratch(e.clientX - rect.left, e.clientY - rect.top);
            }
        };

        const handleTouchMove = (e) => {
            if (isComplete) return;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            scratch(touch.clientX - rect.left, touch.clientY - rect.top);
            e.preventDefault();
        };

        const checkReveal = () => {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let clearPixels = 0;
            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) clearPixels++;
            }
            const percent = (clearPixels / (pixels.length / 4)) * 100;
            if (percent > 60 && !isComplete) {
                setIsComplete(true);
                setIsRevealed(true);
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff758c', '#ff7eb3', '#fa709a']
                });
            }
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, [isComplete]);

    return (
        <section id="surprise" className="section-padding" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '3rem' }} className="gradient-text">
                Scratch to Reveal Your Surprise 🎁
            </h2>

            <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto', height: '300px' }} ref={containerRef}>
                {/* The revealed content beneath */}
                <div className="glass-card" style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 1
                }}>
                    <h3 style={{ fontSize: '2rem', color: '#ff758c', marginBottom: '1rem' }} className="cursive">💝 Gift Coupon 💝</h3>
                    <p style={{ fontSize: '1.2rem', color: '#2d3436', fontWeight: '600', lineHeight: '1.5' }}>
                        Good for one romantic dinner <br /> + movie night with <br /> unlimited hugs.
                    </p>
                    {isRevealed && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ position: 'absolute', fontSize: '4rem', zIndex: 5 }}
                        >
                            ✨
                        </motion.div>
                    )}
                </div>

                {/* The scratchable canvas */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        cursor: 'crosshair',
                        zIndex: 2,
                        borderRadius: '20px',
                        touchAction: 'none',
                        display: isComplete ? 'none' : 'block'
                    }}
                />
            </div>

            <p style={{ marginTop: '1.5rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                {isComplete ? "Enjoy your gift, my love! ❤️" : "Use your mouse or finger to scratch"}
            </p>
        </section>
    );
};

export default ScratchCard;

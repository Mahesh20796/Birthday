import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';

const treats = [
    { text: "Foot Massage 💆‍♀️", color: "#ff2d55" },
    { text: "Dinner Date 🍷", color: "#ff758c" },
    { text: "No Chores 🧹", color: "#ff4d6d" },
    { text: "Shopping 🛍️", color: "#ff85a1" },
    { text: "Many Kisses 💋", color: "#fb6f92" },
    { text: "Movie Night 🍿", color: "#ffb3c1" }
];

const TreatsWheel = () => {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const rotation = useMotionValue(0);
    const lastTick = useRef(0);

    // Haptic feedback listener
    useEffect(() => {
        const unsubscribe = rotation.on("change", (latest) => {
            const currentTick = Math.floor(latest / 60);
            if (currentTick !== lastTick.current) {
                lastTick.current = currentTick;
                if ("vibrate" in navigator) {
                    navigator.vibrate(10); // Subtle "tock" haptic
                }
            }
        });
        return () => unsubscribe();
    }, [rotation]);

    const spinWheel = () => {
        if (spinning) return;
        setSpinning(true);
        setResult(null);

        const spins = 5 + Math.floor(Math.random() * 5);
        const extra = Math.floor(Math.random() * 360);
        const total = spins * 360 + extra;

        const currentRotation = rotation.get();
        const targetRotation = currentRotation + total;

        // Reset tick tracking for the new spin
        lastTick.current = Math.floor(currentRotation / 60);

        setSpinning(true);
    };

    return (
        <section className="section-padding" style={{ padding: '6rem 1rem', textAlign: 'center', overflow: 'hidden' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <h2 className="cursive" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', color: '#ff2d55', marginBottom: '1rem' }}>
                        Wheel of Treats 🎡
                    </h2>
                    <p style={{ color: '#ff758c', marginBottom: '3rem', fontSize: '1.2rem', padding: '0 1rem' }}>
                        Something special for my Queen...
                    </p>
                </motion.div>

                <div style={{ position: 'relative', display: 'inline-block', padding: '10px', maxWidth: '100%', boxSizing: 'border-box' }}>
                    {/* The Needle */}
                    <div style={{
                        position: 'absolute',
                        top: '-5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 100,
                        width: '0',
                        height: '0',
                        borderLeft: 'clamp(10px, 4vw, 20px) solid transparent',
                        borderRight: 'clamp(10px, 4vw, 20px) solid transparent',
                        borderTop: 'clamp(25px, 8vw, 40px) solid #ff2d55',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                    }} />

                    {/* The Wheel Container - Fully Responsive */}
                    <div style={{
                        width: 'min(460px, 90vw)',
                        height: 'min(460px, 90vw)',
                        position: 'relative',
                        margin: '0 auto'
                    }}>
                        <motion.div
                            animate={spinning ? {
                                rotate: rotation.get() + (5 + Math.floor(Math.random() * 5)) * 360 + Math.floor(Math.random() * 360)
                            } : {}}
                            onAnimationComplete={() => {
                                setSpinning(false);
                                const finalRotation = rotation.get();
                                const actualDegrees = finalRotation % 360;
                                const index = Math.floor(((360 - actualDegrees % 360) / 60) % 6);
                                setResult(treats[index]);

                                confetti({
                                    particleCount: 150,
                                    spread: 70,
                                    origin: { y: 0.6 },
                                    colors: ['#ff2d55', '#ff758c', '#ffffff']
                                });
                            }}
                            transition={{ duration: 5, ease: [0.15, 0, 0.1, 1] }}
                            style={{
                                width: '100%',
                                height: '100%',
                                rotate: rotation,
                                borderRadius: '50%',
                                border: 'clamp(6px, 2vw, 12px) solid white',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 15px 40px rgba(255, 45, 85, 0.25)',
                                background: '#fff'
                            }}
                            onClick={spinWheel}
                        >
                            {/* THE COLOR SLICES */}
                            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                                {treats.map((treat, i) => {
                                    const angle = 60;
                                    const startAngle = i * angle;
                                    const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
                                    const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
                                    const x2 = 50 + 50 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                                    const y2 = 50 + 50 * Math.sin(((startAngle + angle) * Math.PI) / 180);

                                    return (
                                        <path
                                            key={i}
                                            d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                                            fill={treat.color}
                                            stroke="rgba(255,255,255,0.15)"
                                            strokeWidth="0.2"
                                        />
                                    );
                                })}
                            </svg>

                            {/* THE TEXT LABELS */}
                            {treats.map((treat, i) => {
                                const angle = i * 60 + 30; // Midpoint of slice
                                return (
                                    <div key={`label-${i}`} style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        width: '45%',
                                        height: '0',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                                        transformOrigin: '50% 50%',
                                        zIndex: 10,
                                        pointerEvents: 'none'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            right: '-25%',
                                            top: '-10px',
                                            width: '100px',
                                            textAlign: 'center',
                                            transform: 'rotate(90deg)',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: 'clamp(0.7rem, 2.5vw, 1rem)',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {treat.text.split(' ')[0]}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Center Cap */}
                            <div style={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 'clamp(40px, 15vw, 80px)',
                                height: 'clamp(40px, 15vw, 80px)',
                                background: 'white',
                                borderRadius: '50%',
                                border: 'clamp(2px, 0.8vw, 4px) solid #ff2d55',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                zIndex: 20,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}>
                                <span style={{ fontSize: 'clamp(1rem, 5vw, 2rem)' }}>❤️</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', padding: '0 1rem' }}>
                    <button
                        onClick={spinWheel}
                        disabled={spinning}
                        style={{
                            padding: '1.2rem clamp(2rem, 10vw, 4rem)',
                            fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
                            background: spinning ? '#eee' : 'linear-gradient(45deg, #ff2d55, #ff758c)',
                            color: spinning ? '#aaa' : 'white',
                            border: 'none',
                            borderRadius: '100px',
                            fontWeight: 'bold',
                            cursor: spinning ? 'not-allowed' : 'pointer',
                            boxShadow: '0 10px 25px rgba(255, 45, 85, 0.3)',
                            transition: 'all 0.3s',
                            width: 'min(100%, 400px)'
                        }}
                    >
                        {spinning ? "Good Luck..." : "SPIN NOW!"}
                    </button>
                </div>

                <AnimatePresence>
                    {result && !spinning && (
                        <motion.div
                            initial={{ scale: 0, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                marginTop: '3rem',
                                padding: '2rem 1rem',
                                background: 'white',
                                borderRadius: '30px',
                                border: '3px solid #ff2d55',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                                margin: '3rem 1rem 0'
                            }}
                        >
                            <h3 className="cursive" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', color: '#ff2d55', marginBottom: '1rem' }}>
                                {result.text}
                            </h3>
                            <p style={{ color: '#ff758c', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                Always for you, Rutva! ❤️
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TreatsWheel;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const MakeAWish = () => {
    const [status, setStatus] = useState('unblown'); // unblown, blowing, blown

    const handleWish = () => {
        if (status === 'unblown') {
            setStatus('blowing');

            // Trigger confetti for the "blown" effect
            setTimeout(() => {
                setStatus('blown');
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff758c', '#ff7eb3', '#fce4ec']
                });
            }, 600);
        }
    };

    return (
        <section className="section-padding" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div className="glass-card" style={{
                display: 'inline-block',
                padding: '3rem',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '30px',
                position: 'relative'
            }}>
                <h2 className="cursive gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                    Make a Wish, My Love... ✨
                </h2>

                <div style={{ position: 'relative', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimatePresence mode="wait">
                        {status === 'unblown' && (
                            <motion.div
                                key="candle"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5 }}
                                onClick={handleWish}
                                style={{ cursor: 'pointer', fontSize: '6rem', position: 'relative' }}
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        filter: ['drop-shadow(0 0 10px #ffcc33)', 'drop-shadow(0 0 20px #ffcc33)', 'drop-shadow(0 0 10px #ffcc33)']
                                    }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                >
                                    🕯️
                                </motion.div>
                                <p style={{ fontSize: '1rem', color: '#ff758c', marginTop: '1rem' }}>Click to blow</p>
                            </motion.div>
                        )}

                        {status === 'blowing' && (
                            <motion.div
                                key="blowing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ fontSize: '6rem' }}
                            >
                                💨
                            </motion.div>
                        )}

                        {status === 'blown' && (
                            <motion.div
                                key="revealed"
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: 'spring', damping: 12 }}
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎂</div>
                                <motion.p
                                    className="cursive"
                                    style={{ fontSize: '2rem', color: '#ff758c', maxWidth: '400px' }}
                                >
                                    "I hope all your wishes come true, my love."
                                </motion.p>
                                <button
                                    onClick={() => setStatus('unblown')}
                                    style={{ marginTop: '1.5rem', background: 'none', border: '1px solid #ff758c', color: '#ff758c', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}
                                >
                                    Wish Again?
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default MakeAWish;

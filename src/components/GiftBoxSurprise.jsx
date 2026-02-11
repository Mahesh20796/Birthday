import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const GiftBoxSurprise = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        // Burst of hearts and confetti
        const end = Date.now() + 3 * 1000;
        const colors = ['#ff2d55', '#ff758c', '#ffb3c1'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    return (
        <section style={{
            padding: '8rem 1rem',
            textAlign: 'center',
            background: 'linear-gradient(to bottom, #ffffff, #fff5f7)',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '4rem' }}
            >
                <h2 className="cursive" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: '#ff2d55' }}>
                    A Special Delivery for You 🎁
                </h2>
                <p style={{ color: '#ff758c', fontSize: '1.2rem', marginTop: '1rem' }}>
                    Click the box to reveal your birthday surprise
                </p>
            </motion.div>

            <div style={{ position: 'relative', cursor: isOpen ? 'default' : 'pointer' }} onClick={handleOpen}>
                <AnimatePresence>
                    {!isOpen ? (
                        <motion.div
                            key="closed-box"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: [0, -5, 5, -5, 5, 0] }}
                            transition={{
                                scale: { type: 'spring', damping: 12 },
                                rotate: { repeat: Infinity, duration: 2, repeatDelay: 1 }
                            }}
                            whileHover={{ scale: 1.05 }}
                            style={{ fontSize: '10rem', userSelect: 'none' }}
                        >
                            🎁
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open-box"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ position: 'relative' }}
                        >
                            {/* Floating Hearts from Box */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 0, opacity: 1, x: 0 }}
                                    animate={{
                                        y: -200 - Math.random() * 100,
                                        x: (Math.random() - 0.5) * 200,
                                        opacity: 0,
                                        scale: 1.5
                                    }}
                                    transition={{ duration: 2, delay: i * 0.2 }}
                                    style={{ position: 'absolute', top: '20%', left: '40%', fontSize: '2rem' }}
                                >
                                    ❤️
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="glass-card"
                                style={{
                                    padding: '3rem',
                                    background: 'white',
                                    borderRadius: '30px',
                                    border: '2px solid #ffdae2',
                                    boxShadow: '0 20px 50px rgba(255, 117, 140, 0.2)',
                                    maxWidth: '500px'
                                }}
                            >
                                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>✨</span>
                                <h3 className="cursive" style={{ fontSize: '2.5rem', color: '#ff2d55', marginBottom: '1.5rem' }}>
                                    My Forever Gift
                                </h3>
                                <p style={{ color: '#ff758c', fontSize: '1.2rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                                    "Out of all the gifts life has given me, being your husband is the one I treasure most. You are my happiness, my home, and my everything. Happy Birthday, Rutva!"
                                </p>
                                <div style={{
                                    marginTop: '2rem',
                                    padding: '1rem',
                                    background: '#fff5f7',
                                    borderRadius: '15px',
                                    border: '1px dashed #ff2d55',
                                    color: '#ff2d55',
                                    fontWeight: 'bold'
                                }}>
                                    Ticket ID: #MY-QUEEN-FOREVER
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default GiftBoxSurprise;

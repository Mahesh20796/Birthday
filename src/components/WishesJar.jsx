import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const wishes = [
    "May every dream you hold come true.",
    "Today the world celebrates YOU.",
    "You deserve endless happiness.",
    "Your presence is a gift to the world.",
    "May your year be as beautiful as your soul.",
    "May your laughter never fade.",
    "You are loved more than words can say."
];

const WishesJar = () => {
    const [currentWish, setCurrentWish] = useState(null);

    const openWish = () => {
        const randomIndex = Math.floor(Math.random() * wishes.length);
        setCurrentWish(wishes[randomIndex]);
    };

    return (
        <section className="section-padding" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h2 className="cursive gradient-text" style={{ fontSize: '3rem', marginBottom: '2rem' }}>
                Birthday Wishes Jar 🎁
            </h2>

            <div style={{ position: 'relative', display: 'inline-block' }}>
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }}
                    style={{ fontSize: '6rem', cursor: 'pointer', filter: 'drop-shadow(0 10px 15px rgba(255, 117, 140, 0.3))' }}
                    onClick={openWish}
                >
                    🫙
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={openWish}
                    className="gradient-btn"
                    style={{
                        marginTop: '2rem',
                        padding: '1rem 2.5rem',
                        fontSize: '1.2rem',
                        background: 'linear-gradient(45deg, #ff758c, #ff7eb3)',
                        border: 'none',
                        borderRadius: '50px',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(255, 117, 140, 0.4)'
                    }}
                >
                    Open a Wish
                </motion.button>
            </div>

            <AnimatePresence>
                {currentWish && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(5px)'
                        }}
                        onClick={() => setCurrentWish(null)}
                    >
                        <motion.div
                            className="glass-card"
                            style={{
                                padding: '3rem',
                                background: 'white',
                                borderRadius: '30px',
                                maxWidth: '400px',
                                textAlign: 'center',
                                border: '2px solid #ff758c',
                                position: 'relative'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span style={{ fontSize: '3rem' }}>✨</span>
                            <p style={{ fontSize: '1.5rem', margin: '1.5rem 0', color: '#ff758c' }} className="cursive">
                                {currentWish}
                            </p>
                            <button
                                onClick={() => setCurrentWish(null)}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '20px',
                                    border: 'none',
                                    background: '#f0f0f0',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default WishesJar;

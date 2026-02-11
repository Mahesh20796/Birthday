import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

const LoveLock = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    const promise = "For our second year, and every year after, I promise to hold your hand through every storm, celebrate your every joy, and keep our home filled with the same love that started it all on day one.";

    return (
        <section className="section-padding" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div className="glass-card" style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '4rem 2rem',
                background: 'rgba(26, 11, 46, 0.6)',
                border: '1px solid #ff2d55',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <h2 className="cursive" style={{ fontSize: '3rem', color: '#ff2d55', marginBottom: '3rem' }}>
                    The Eternal Love Lock
                </h2>

                <div style={{ position: 'relative', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimatePresence mode="wait">
                        {!isUnlocked ? (
                            <motion.div
                                key="locked"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.2, opacity: 0 }}
                                onClick={() => setIsUnlocked(true)}
                                style={{ cursor: 'pointer', textAlign: 'center' }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ color: '#ffd700', marginBottom: '2rem' }}
                                >
                                    <Lock size={100} />
                                </motion.div>
                                <p style={{ color: '#b8a1cf', fontSize: '1.2rem' }}>Click to unlock my promise for Year 2</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="unlocked"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{ padding: '0 1rem' }}
                            >
                                <motion.div
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{ color: '#ffd700', marginBottom: '2rem' }}
                                >
                                    <Unlock size={80} />
                                </motion.div>
                                <p className="cursive" style={{
                                    fontSize: '1.8rem',
                                    color: 'white',
                                    lineHeight: '1.6',
                                    textShadow: '0 0 10px rgba(255, 45, 85, 0.3)'
                                }}>
                                    "{promise}"
                                </p>
                                <motion.button
                                    onClick={() => setIsUnlocked(false)}
                                    style={{
                                        marginTop: '2rem',
                                        background: 'none',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: '#b8a1cf',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Relock
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default LoveLock;

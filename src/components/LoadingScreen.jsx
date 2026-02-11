import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinish, 1000);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);
        return () => clearInterval(timer);
    }, [onFinish]);

    return (
        <motion.div
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#fff',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ position: 'relative', marginBottom: '3rem' }}>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        fontSize: 'clamp(3rem, 10vw, 5rem)',
                        fontWeight: '300',
                        color: '#ff2d55',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontFamily: "'Great Vibes', cursive"
                    }}
                >
                    M <span style={{ fontSize: '0.8em' }}>❤️</span> R
                </motion.div>

                {/* Heartbeat pulse effect */}
                <motion.div
                    animate={{
                        scale: [1, 2],
                        opacity: [0.3, 0]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100px',
                        height: '100px',
                        background: 'rgba(255, 45, 85, 0.1)',
                        borderRadius: '50%',
                        x: '-50%',
                        y: '-50%',
                        zIndex: -1
                    }}
                />
            </div>

            <div style={{ width: '200px', height: '2px', background: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    style={{ height: '100%', background: '#ff2d55' }}
                />
            </div>

            <p style={{
                marginTop: '1.5rem',
                color: '#ff758c',
                fontSize: '0.9rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: '600',
                opacity: 0.6
            }}>
                Preparing your surprises...
            </p>
        </motion.div>
    );
};

export default LoadingScreen;

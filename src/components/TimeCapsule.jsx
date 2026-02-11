import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TimeCapsule = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="section-padding" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div className="glass-card" style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '4rem 2rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '30px'
            }}>
                <h2 className="cursive gradient-text" style={{ fontSize: '3rem', marginBottom: '2rem' }}>
                    A Digital Time Capsule 💌
                </h2>

                <div style={{ position: 'relative', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimatePresence mode="wait">
                        {!isOpen ? (
                            <motion.div
                                key="envelope"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2, y: -50 }}
                                onClick={() => setIsOpen(true)}
                                style={{ cursor: 'pointer', textAlign: 'center' }}
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 2, -2, 0]
                                    }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    style={{ fontSize: '8rem' }}
                                >
                                    📩
                                </motion.div>
                                <p style={{ color: '#ff758c', fontWeight: '600', marginTop: '1rem' }}>Click to open my secret message</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="video"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ width: '100%' }}
                            >
                                {/* Video Placeholder - You can replace the src with your actual video or YouTube link */}
                                <div style={{
                                    aspectRatio: '16/9',
                                    background: '#000',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    position: 'relative'
                                }}>
                                    <video
                                        width="100%"
                                        height="100%"
                                        controls
                                        autoPlay
                                        style={{ display: 'block' }}
                                    >
                                        <source src="https://assets.mixkit.co/videos/preview/mixkit-holding-a-sparkler-at-a-celebration-40523-large.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        marginTop: '2rem',
                                        background: 'none',
                                        border: '1px solid #ff758c',
                                        color: '#ff758c',
                                        padding: '0.6rem 1.5rem',
                                        borderRadius: '25px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Close Capsule
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default TimeCapsule;

import React from 'react';
import { motion } from 'framer-motion';

const LoveMessage = () => {
    const message = `To my dearest wife,

Happy Birthday to the woman who makes my world beautiful. 
Every moment with you is a gift I cherish. 
Your laughter is my favorite song, and your happiness is my greatest mission.
Today, I celebrate the day you were born, because that day changed my life forever.

May your day be filled with all the love and joy you give to everyone else.

Forever yours,
Mahesh`;

    const sentenceVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="love-message" className="section-padding" style={{
            minHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card"
                style={{
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    maxWidth: '800px',
                    width: '100%',
                    lineHeight: '1.8',
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '2px solid rgba(255, 117, 140, 0.3)'
                }}
            >
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }} className="gradient-text cursive">For My Queen...</h2>

                <motion.div
                    variants={sentenceVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ fontSize: '1.4rem', whiteSpace: 'pre-line', color: '#444' }}
                >
                    {message.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default LoveMessage;

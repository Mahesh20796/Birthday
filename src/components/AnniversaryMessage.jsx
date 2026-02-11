import React from 'react';
import { motion } from 'framer-motion';

const AnniversaryMessage = () => {
    const message = `To my beloved wife,

Today marks our very first year as husband and wife. 
365 days of laughter, growth, and building our beautiful life together.
This first year has been the most wonderful journey of my life.
Every morning waking up next to you is a blessing I never take for granted.

Thank you for being my partner, my best friend, and my soulmate.
Here's to the first of many, many more anniversaries.
Our love is just beginning, and I'm so excited for everything the future holds for us.

I love you more today than I did 365 days ago.

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
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="anniversary-message" className="section-padding" style={{
            minHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4rem 2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="glass-card"
                style={{
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    maxWidth: '850px',
                    width: '100%',
                    lineHeight: '2',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 45, 85, 0.3)',
                    color: '#f0f0f0',
                    boxShadow: '0 0 50px rgba(255, 45, 85, 0.1)'
                }}
            >
                <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem', color: '#ff2d55' }} className="cursive">To My Soulmate...</h2>

                <motion.div
                    variants={sentenceVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ fontSize: '1.3rem', whiteSpace: 'pre-line', color: '#e0e0e0', letterSpacing: '0.5px' }}
                >
                    {message.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 5, duration: 2 }}
                    style={{ marginTop: '3rem', fontSize: '2rem' }}
                >
                    ❤️
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AnniversaryMessage;

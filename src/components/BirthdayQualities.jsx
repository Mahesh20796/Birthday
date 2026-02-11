import React from 'react';
import { motion } from 'framer-motion';

const qualities = [
    { title: "💗 Your Smile", text: "Your smile lights up my darkest days." },
    { title: "💗 Your Kind Heart", text: "Your kindness makes this world softer." },
    { title: "💗 Your Strength", text: "Your resilience and strength inspire me every day." },
    { title: "💗 Your Beauty", text: "You are beautiful inside and out, in every single way." }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const BirthdayQualities = () => {
    return (
        <section className="section-padding" style={{ padding: '4rem 2rem' }}>
            <h2 className="cursive gradient-text" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
                Why You’re So Special 💖
            </h2>
            <motion.div
                className="qualities-grid"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}
            >
                {qualities.map((q, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        className="glass-card"
                        style={{
                            padding: '2rem',
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            boxShadow: '0 8px 32px 0 rgba(255, 117, 140, 0.2)'
                        }}
                    >
                        <h3 style={{ fontSize: '1.8rem', color: '#ff758c', marginBottom: '1rem' }} className="cursive">{q.title}</h3>
                        <p style={{ fontSize: '1.1rem', color: '#444' }}>{q.text}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default BirthdayQualities;

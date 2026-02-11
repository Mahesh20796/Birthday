import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: "Days of Laughter", value: "365", icon: "☀️" },
    { label: "Hours of Happiness", value: "8,760", icon: "✨" },
    { label: "Minutes of Being Yours", value: "525,600", icon: "⏳" },
    { label: "Beautiful Life Together", value: "1", icon: "💍" }
];

const AnniversaryNumbers = () => {
    return (
        <section className="section-padding" style={{ padding: '6rem 2rem' }}>
            <h2 className="cursive" style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '4rem', color: '#ff2d55' }}>
                Our First Year in Numbers
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        style={{
                            textAlign: 'center',
                            padding: '2rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{stat.icon}</div>
                        <motion.div
                            initial={{ scale: 0.5 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 100, delay: index * 0.2 + 0.5 }}
                            style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}
                        >
                            {stat.value}
                        </motion.div>
                        <div style={{ color: '#b8a1cf', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AnniversaryNumbers;

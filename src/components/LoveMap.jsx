import React from 'react';
import { motion } from 'framer-motion';

const locations = [
    { name: "Where We Met", x: "20%", y: "40%", date: "Day 1" },
    { name: "Our First Date", x: "40%", y: "60%", date: "Feb 16" },
    { name: "Our First Home", x: "65%", y: "30%", date: "July 2024" },
    { name: "Everywhere Else", x: "85%", y: "55%", date: "Forever" }
];

const LoveMap = () => {
    return (
        <section className="section-padding" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <h2 className="cursive gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>
                Our Journey Map 🗺️
            </h2>

            <div className="glass-card" style={{
                maxWidth: '900px',
                margin: '0 auto',
                height: '500px',
                background: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '30px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 117, 140, 0.2)'
            }}>
                {/* Background Grid/Design */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(#ff758c 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.1
                }} />

                {/* Animated Connection Paths */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <motion.path
                        d="M 180 200 Q 300 350 360 300 T 585 150 T 765 275"
                        fill="none"
                        stroke="#ff758c"
                        strokeWidth="2"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                    />
                </svg>

                {locations.map((loc, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.8 }}
                        style={{
                            position: 'absolute',
                            left: loc.x,
                            top: loc.y,
                            zIndex: 2
                        }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{ fontSize: '2.5rem', cursor: 'pointer' }}
                        >
                            ❤️
                        </motion.div>
                        <div style={{
                            background: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '15px',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                            marginTop: '0.5rem',
                            width: 'max-content'
                        }}>
                            <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#ff758c' }}>{loc.name}</p>
                            <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>{loc.date}</p>
                        </div>
                    </motion.div>
                ))}

                {/* Floating Decorative Icons */}
                <motion.div
                    animate={{ x: [-10, 10, -10], y: [-10, 10, -10], rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10 }}
                    style={{ position: 'absolute', left: '10%', top: '10%', fontSize: '2rem', opacity: 0.2 }}
                >
                    ✈️
                </motion.div>
                <motion.div
                    animate={{ x: [10, -10, 10], y: [10, -10, 10], rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 12 }}
                    style={{ position: 'absolute', right: '15%', bottom: '20%', fontSize: '2rem', opacity: 0.2 }}
                >
                    🚗
                </motion.div>
            </div>
        </section>
    );
};

export default LoveMap;

import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ activeTab }) => {
    const isAnniversary = activeTab === 'anniversary';

    return (
        <footer style={{
            padding: '6rem 2rem',
            textAlign: 'center',
            background: isAnniversary ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(15px)',
            borderTop: isAnniversary ? '1px solid rgba(255, 45, 85, 0.3)' : '1px solid rgba(255, 117, 140, 0.2)',
            marginTop: '4rem',
            position: 'relative',
            zIndex: 10,
            transition: 'all 1s ease'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ display: 'inline-block' }}
                    >
                        {isAnniversary ? '♾️' : '❤️'}
                    </motion.span>
                </div>

                <h2 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                    marginBottom: '1rem',
                    color: isAnniversary ? '#ff2d55' : '#ff758c',
                    textShadow: isAnniversary ? '0 0 15px rgba(255, 45, 85, 0.4)' : 'none'
                }} className="cursive">
                    {isAnniversary ? 'To Eternity & Beyond' : 'Forever & Always'}
                </h2>

                <div style={{ margin: '2rem 0' }}>
                    <p className="cursive" style={{
                        fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                        color: isAnniversary ? '#b8a1cf' : '#636e72',
                        opacity: 0.8
                    }}>
                        {isAnniversary ? 'Mahesh ❤️ Rutva' : 'Always yours, Mahesh'}
                    </p>
                </div>

                <div style={{
                    width: '100px',
                    height: '1px',
                    background: isAnniversary ? 'linear-gradient(to right, transparent, #ff2d55, transparent)' : 'linear-gradient(to right, transparent, #ff758c, transparent)',
                    margin: '2rem auto'
                }} />

                <p style={{
                    color: isAnniversary ? '#b8a1cf' : '#636e72',
                    fontSize: '1rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}>
                    Made with infinite love for my Queen
                </p>

                <div style={{ marginTop: '3rem', opacity: 0.3, fontSize: '0.8rem', color: isAnniversary ? 'white' : 'black' }}>
                    © {new Date().getFullYear()} OUR BEAUTIFUL STORY
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;

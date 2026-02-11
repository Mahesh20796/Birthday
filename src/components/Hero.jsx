import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Heart } from 'lucide-react';
const Hero = () => {
    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            padding: '2rem 0'
        }}>


            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="glass-card"
                style={{
                    padding: '3rem',
                    maxWidth: '90%',
                    width: '600px'
                }}
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ marginBottom: '1rem' }}
                >
                    <Heart size={48} fill="#ff758c" color="#ff758c" />
                </motion.div>

                <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem' }} className="gradient-text">
                    {window.location.pathname.includes('anniversary') ? 'Together Forever ❤️' : 'Happy Birthday My Love ❤️'}
                </h1>

                <p style={{ fontSize: '1.2rem', color: '#636e72', marginBottom: '2rem' }}>
                    Every heartbeat whispers your name
                </p>

                <Link to="love-message" smooth={true} duration={1000}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(255, 117, 140, 0.4)',
                            fontWeight: '600'
                        }}
                    >
                        Start Our Story
                    </motion.button>
                </Link>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    color: '#ff758c'
                }}
            >
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Scroll to explore</p>
            </motion.div>
        </section>
    );
};

export default Hero;

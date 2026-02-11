import React, { useEffect } from 'react';
import AnniversaryMessage from './AnniversaryMessage';
import AnniversaryNumbers from './AnniversaryNumbers';
import LoveLock from './LoveLock';
import CheersToast from './CheersToast';
import Stars from './Stars';
import AnniversaryMoments from './AnniversaryMoments';
import { motion } from 'framer-motion';

const Anniversary = () => {
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                background: 'linear-gradient(to bottom, #0a0510, #1a0b2e, #0a0a0a)', // Cosmic Dark Gradient
                minHeight: '100vh',
                color: 'white',
                position: 'relative',
                overflowX: 'hidden'
            }}
        >
            <Stars />

            {/* Hero Section */}
            <div style={{ textAlign: 'center', padding: '6rem 0', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotateY: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    style={{ fontSize: '7rem', marginBottom: '2rem' }}
                >
                    💍
                </motion.div>
                <h1 className="cursive" style={{ fontSize: '6rem', color: '#ff2d55', textShadow: '0 0 30px rgba(255, 45, 85, 0.6)' }}>
                    Our 1st Anniversary
                </h1>
                <p style={{ color: '#b8a1cf', fontSize: '1.6rem', letterSpacing: '6px', textTransform: 'uppercase', marginTop: '1.5rem', fontWeight: '300' }}>
                    A Journey Written in the Stars
                </p>
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    style={{ marginTop: '5rem', opacity: 0.4, color: '#b8a1cf' }}
                >
                    Scroll into our world ✨
                </motion.div>
            </div>

            <div className="content-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 5 }}>
                <AnniversaryMessage />
                <AnniversaryNumbers />
                <CheersToast />
                <LoveLock />
                <AnniversaryMoments />
            </div>
        </motion.div>
    );
};

export default Anniversary;

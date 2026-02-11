import React, { useEffect } from 'react';
import LoveMessage from './LoveMessage';
import Gallery from './Gallery';
import ScratchCard from './ScratchCard';
import BirthdayQualities from './BirthdayQualities';
import WishesJar from './WishesJar';
import Balloons from './Balloons';
import StickyNotes from './StickyNotes';
import MakeAWish from './MakeAWish';
import GiftBoxSurprise from './GiftBoxSurprise';
import TreatsWheel from './TreatsWheel';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Birthday = () => {
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'light');

        // Confetti explosion on load
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                background: '#fff5f7', // Soft Rose background
                minHeight: '100vh',
                overflowX: 'hidden',
                position: 'relative'
            }}
        >
            <Balloons />
            <StickyNotes />

            {/* Hero Section */}
            <div style={{ textAlign: 'center', padding: '6rem 0', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <motion.div
                    animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ fontSize: '7rem', marginBottom: '1.5rem' }}
                >
                    🎂
                </motion.div>
                <h1 className="cursive gradient-text" style={{ fontSize: '6rem' }}>Happy Birthday My Queen ❤️</h1>
                <p style={{ color: '#ff758c', fontSize: '1.6rem', fontWeight: '500', marginTop: '1rem' }}>Today the world celebrates YOU</p>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ marginTop: '5rem', opacity: 0.7, color: '#ff758c' }}
                >
                    Scroll for your surprises ✨
                </motion.div>
            </div>

            <div className="content-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 5 }}>
                <LoveMessage />
                <GiftBoxSurprise />
                <MakeAWish />
                <TreatsWheel />
                <BirthdayQualities />
                <WishesJar />
                <Gallery />
                <ScratchCard />
            </div>
        </motion.div>
    );
};

export default Birthday;

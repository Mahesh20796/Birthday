import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';

const LockScreen = ({ targetDate, title, message }) => {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let target = new Date(now.getFullYear(), targetDate.month - 1, targetDate.day);
            if (target < now) {
                // Only roll to next year if it's already past the day in the current year
                // But for Feb 12, if today is Feb 11, we stay in this year.
            }
            const difference = target - now;
            if (difference <= 0) return null;

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());
        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--bg-gradient)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 2000,
            textAlign: 'center',
            padding: '1rem'
        }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card"
                style={{ padding: '3rem', maxWidth: '600px' }}
            >
                <Lock size={48} color="var(--primary-pink)" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }} className="gradient-text cursive">{title}</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem' }}>{message}</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
                        <div key={label}>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: 'var(--primary-pink)',
                                background: 'rgba(255,255,255,0.2)',
                                padding: '0.5rem',
                                borderRadius: '10px'
                            }}>
                                {Object.values(timeLeft)[i].toString().padStart(2, '0')}
                            </div>
                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{ marginTop: '2rem' }}
            >
                <Heart fill="var(--primary-pink)" stroke="none" size={32} />
            </motion.div>
        </div>
    );
};

export default LockScreen;

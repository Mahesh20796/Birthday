import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownUnit = ({ label, value }) => (
    <div style={{ textAlign: 'center', margin: '0 0.5rem' }}>
        <motion.div
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card"
            style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--primary-pink)',
                background: 'rgba(255, 255, 255, 0.2)',
                marginBottom: '0.3rem'
            }}
        >
            {value.toString().padStart(2, '0')}
        </motion.div>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: '600' }}>
            {label}
        </span>
    </div>
);

const Timer = ({ title, targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const target = new Date(2026, targetDate.month - 1, targetDate.day, targetDate.hour || 0, targetDate.minute || 0, 0);

            const difference = target - now;

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

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-main)', fontFamily: 'Great Vibes' }}>{title}</h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CountdownUnit label="Days" value={timeLeft.days} />
                <CountdownUnit label="Hrs" value={timeLeft.hours} />
                <CountdownUnit label="Min" value={timeLeft.minutes} />
                <CountdownUnit label="Sec" value={timeLeft.seconds} />
            </div>
        </div>
    );
};

const Countdown = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{
                padding: '1.5rem',
                textAlign: 'center',
                margin: '2rem auto',
                maxWidth: '500px'
            }}
        >
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }} className="gradient-text cursive">
                Countdown to Our Special Days 💕
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Timer title="🎂 Your Birthday (Feb 12, 12:00 AM)" targetDate={{ month: 2, day: 12, hour: 0, minute: 0 }} />
                <Timer title="💍 Our Anniversary (Feb 16, 12:00 AM)" targetDate={{ month: 2, day: 16, hour: 0, minute: 0 }} />
            </div>
        </motion.div>
    );
};

export default Countdown;

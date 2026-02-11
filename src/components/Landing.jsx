import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cake, Heart, Lock } from 'lucide-react';
import FloatingHearts from './FloatingHearts';

const ExperienceCard = ({ title, icon: Icon, targetDate, path, label }) => {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const update = () => {
            const now = new Date();

            // TESTING MODE: Set target to 5 seconds after the very first load
            if (!window.sessionTarget) {
                window.sessionTarget = new Date(now.getTime() + 5000);
            }
            const target = window.sessionTarget;
            const diff = target - now;

            if (diff <= 0) {
                setIsReady(true);
            } else {
                setIsReady(false);
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60)
                });
            }
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            whileHover={isReady ? { y: -10, scale: 1.02 } : {}}
            className="glass-card"
            style={{
                padding: '2rem',
                width: '320px',
                cursor: isReady ? 'pointer' : 'not-allowed',
                opacity: isReady ? 1 : 0.9,
                position: 'relative',
                border: isReady ? '1px solid var(--primary-pink)' : '1px solid rgba(255,255,255,0.1)'
            }}
            onClick={() => isReady && navigate(path)}
        >
            {!isReady && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--primary-pink)' }}>
                    <Lock size={18} />
                </div>
            )}

            <Icon size={48} color="var(--primary-pink)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} className="cursive">{title}</h3>

            {isReady ? (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        fontWeight: '600',
                        width: '100%',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(255, 117, 140, 0.3)'
                    }}
                >
                    Enter {label} World
                </motion.button>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Unlocks in:</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <div className="countdown-mini">{timeLeft.days}d</div>
                        <div className="countdown-mini">{timeLeft.hours}h</div>
                        <div className="countdown-mini">{timeLeft.minutes}m</div>
                        <div className="countdown-mini">{timeLeft.seconds}s</div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const Landing = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--bg-gradient)',
            padding: '2rem',
            position: 'relative'
        }}>
            <FloatingHearts />
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ fontSize: '4.5rem', marginBottom: '3rem', textAlign: 'center' }}
                className="gradient-text cursive"
            >
                Our Special Surprises
            </motion.h1>

            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <ExperienceCard
                    title="Birthday Celebration"
                    label="Birthday"
                    icon={Cake}
                    path="/birthday"
                    targetDate={{ month: 2, day: 12 }}
                />
                <ExperienceCard
                    title="Wedding Anniversary"
                    label="Anniversary"
                    icon={Heart}
                    path="/anniversary"
                    targetDate={{ month: 2, day: 16 }}
                />
            </div>

            <style>{`
        .countdown-mini {
          background: rgba(255, 117, 140, 0.1);
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
          font-weight: 700;
          color: var(--primary-pink);
          font-size: 0.9rem;
          min-width: 45px;
        }
      `}</style>
        </div>
    );
};

export default Landing;

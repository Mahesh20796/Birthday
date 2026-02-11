import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Heart, Lock, Sparkles } from 'lucide-react';
import FloatingHearts from './FloatingHearts';

const ExperienceCard = ({ title, icon: Icon, targetDate, path, label, delay }) => {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const target = new Date(2026, targetDate.month - 1, targetDate.day, targetDate.hour || 0, targetDate.minute || 0, 0);
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
    }, [targetDate]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8, type: 'spring' }}
            whileHover={isReady ? { y: -15, scale: 1.05 } : {}}
            style={{
                padding: '2.5rem',
                width: '340px',
                cursor: isReady ? 'pointer' : 'not-allowed',
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                border: isReady ? '2px solid #ffcbd7' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: isReady ? '0 25px 50px -12px rgba(255, 117, 140, 0.25)' : 'none',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onClick={() => isReady && navigate(path)}
        >
            {/* Ambient Glow */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: isReady
                    ? `radial-gradient(circle at center, ${label === 'Birthday' ? 'rgba(255,117,140,0.1)' : 'rgba(188,19,254,0.1)'}, transparent)`
                    : 'transparent',
                pointerEvents: 'none'
            }} />

            {!isReady && (
                <div style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    padding: '0.4rem',
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '50%',
                    color: 'var(--primary-pink)'
                }}>
                    <Lock size={16} />
                </div>
            )}

            <motion.div
                animate={isReady ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{ marginBottom: '1.5rem', display: 'inline-block' }}
            >
                <Icon size={56} color={isReady ? 'var(--primary-pink)' : '#bdc3c7'} />
            </motion.div>

            <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: isReady ? 'var(--text-main)' : '#95a5a6' }} className="cursive">
                {title}
            </h3>

            {isReady ? (
                <div style={{ position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: 'var(--primary-pink)', fontSize: '0.9rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}
                    >
                        Click to Enter World
                    </motion.div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', position: 'relative' }}>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '0.8rem', textTransform: 'uppercase', fontWeight: '700' }}>
                        Opening Soon
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem' }}>
                        {[
                            { val: timeLeft.days, unit: 'D' },
                            { val: timeLeft.hours, unit: 'H' },
                            { val: timeLeft.minutes, unit: 'M' },
                            { val: timeLeft.seconds, unit: 'S' }
                        ].map((t, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <div style={{
                                    background: 'rgba(255, 117, 140, 0.08)',
                                    padding: '0.5rem 0.7rem',
                                    borderRadius: '12px',
                                    fontWeight: '800',
                                    color: 'var(--primary-pink)',
                                    fontSize: '1rem',
                                    minWidth: '45px'
                                }}>
                                    {t.val}
                                </div>
                                <span style={{ fontSize: '0.6rem', color: '#b2bec3', fontWeight: 'bold' }}>{t.unit}</span>
                            </div>
                        ))}
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
            background: 'linear-gradient(-45deg, #fff5f7, #fffbf2, #f3e5f5, #fff5f7)',
            backgroundSize: '400% 400%',
            animation: 'meshGradient 18s ease infinite',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <FloatingHearts />

            {/* Ambient Sparkles */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            scale: [0.8, 1.2, 0.8],
                            y: [0, -80]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        style={{
                            position: 'absolute',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            color: '#ffcad4'
                        }}
                    >
                        <Sparkles size={14} fill="white" />
                    </motion.div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <h1
                        style={{
                            fontSize: 'clamp(3.5rem, 12vw, 6.5rem)',
                            marginBottom: '0.8rem',
                            filter: 'drop-shadow(0 10px 20px rgba(255, 77, 109, 0.2))'
                        }}
                        className="gradient-text cursive"
                    >
                        For My Beautiful Rutva
                    </h1>
                    <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1rem',
                        color: '#576574',
                        letterSpacing: '8px',
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        opacity: 0.8
                    }}>
                        Your World of Surprises Awaits
                    </p>
                </motion.div>
            </div>

            <div style={{
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10
            }}>
                <ExperienceCard
                    title="Birthday Celebration"
                    label="Birthday"
                    icon={Cake}
                    path="/birthday"
                    targetDate={{ month: 2, day: 12, hour: 0, minute: 0 }}
                    delay={0.3}
                />
                <ExperienceCard
                    title="Wedding Anniversary"
                    label="Anniversary"
                    icon={Heart}
                    path="/anniversary"
                    targetDate={{ month: 2, day: 16, hour: 0, minute: 0 }}
                    delay={0.5}
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.5 }}
                style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.85rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#ff4d6d',
                    fontWeight: '600'
                }}
            >
                Made with infinite love by Mahesh
            </motion.div>

            <style>{`
                @keyframes meshGradient {
                    0% { background-position: 0% 50% }
                    50% { background-position: 100% 50% }
                    100% { background-position: 0% 50% }
                }
            `}</style>
        </div>
    );
};

export default Landing;

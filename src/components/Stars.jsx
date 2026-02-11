import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShootingStar = ({ id, top, left, delay }) => {
    return (
        <motion.div
            key={id}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
                x: [0, 400],
                y: [0, 200],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0]
            }}
            transition={{
                duration: 1.5,
                delay: delay,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: Math.random() * 15 + 10
            }}
            style={{
                position: 'absolute',
                top,
                left,
                width: '150px',
                height: '2px',
                background: 'linear-gradient(to right, white, transparent)',
                transform: 'rotate(25deg)',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

const Stars = () => {
    const [stars, setStars] = useState([]);
    const [shootingStars, setShootingStars] = useState([]);

    useEffect(() => {
        // Static background stars with varying depths
        const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 1,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.3,
            duration: 2 + Math.random() * 4,
            delay: Math.random() * 5,
            zIndex: Math.random() > 0.8 ? 1 : 0 // Some stars in front of others
        }));
        setStars(generatedStars);

        // Rare shooting stars
        const generatedShootingStars = Array.from({ length: 4 }).map((_, i) => ({
            id: `ss-${i}`,
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 40}%`,
            delay: i * 5 + Math.random() * 5
        }));
        setShootingStars(generatedShootingStars);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            {/* Twinkling Background Stars */}
            {stars.map(star => (
                <motion.div
                    key={star.id}
                    animate={{
                        opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: star.duration,
                        delay: star.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        background: 'white',
                        borderRadius: '50%',
                        boxShadow: `0 0 ${star.size * 2}px white`,
                        zIndex: star.zIndex
                    }}
                />
            ))}

            {/* Shooting Stars */}
            <AnimatePresence>
                {shootingStars.map(ss => (
                    <ShootingStar key={ss.id} {...ss} />
                ))}
            </AnimatePresence>

            {/* Ambient Nebula Glow */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(188, 19, 254, 0.05) 0%, transparent 70%)',
                filter: 'blur(100px)',
                zIndex: -1
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '50%',
                height: '50%',
                background: 'radial-gradient(circle, rgba(255, 45, 85, 0.05) 0%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: -1
            }} />
        </div>
    );
};

export default Stars;

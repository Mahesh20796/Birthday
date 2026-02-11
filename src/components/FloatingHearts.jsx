import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 30 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100 + 100, // Start below screen
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 20,
        opacity: Math.random() * 0.1 + 0.05
    }));

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            {hearts.map(heart => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, rotate: 0 }}
                    animate={{
                        y: '-20vh',
                        x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`, `${heart.x}vw`],
                        opacity: [0, heart.opacity, heart.opacity, 0],
                        rotate: [0, 45, -45, 0]
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        color: '#ff758c',
                        fontSize: `${heart.size}px`,
                        userSelect: 'none'
                    }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;

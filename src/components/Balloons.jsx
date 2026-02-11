import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const balloonColors = ['#FFD1DC', '#B2E2F2', '#C1E1C1', '#FFB7CE', '#E0BBE4'];

const Balloon = ({ color, delay, x, size, zIndex, speedMulti }) => {
    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 5000], [0, -1000 * speedMulti]);

    return (
        <motion.div
            initial={{ y: '110vh', x: x }}
            animate={{
                y: '-40vh',
                x: [x, x + (Math.random() * 50 - 25), x]
            }}
            transition={{
                y: { duration: 25 + Math.random() * 15, repeat: Infinity, ease: "linear", delay: delay },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
                position: 'fixed', // Fixed for float effect across whole scroll
                zIndex: zIndex,
                pointerEvents: 'none',
                y: yParallax
            }}
        >
            <div style={{
                width: size,
                height: size * 1.2,
                backgroundColor: color,
                borderRadius: '50%',
                position: 'relative',
                opacity: zIndex > 10 ? 0.8 : 0.4, // Higher items are more opaque
                boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.1), 0 10px 20px ${color}44`,
                filter: zIndex < 10 ? 'blur(2px)' : 'none' // Background items are blurry
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '10px',
                    height: '10px',
                    backgroundColor: color,
                    clipPath: 'polygon(50% 100%, 0 0, 100% 0)'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: '50%',
                    width: '1px',
                    height: '60px',
                    backgroundColor: 'rgba(0,0,0,0.1)'
                }} />
            </div>
        </motion.div>
    );
};

const Cloud = ({ x, y, size, delay, zIndex, speedMulti }) => {
    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 5000], [0, -600 * speedMulti]);

    return (
        <motion.div
            initial={{ x: '-20vw' }}
            animate={{ x: '110vw' }}
            transition={{ duration: 40 + Math.random() * 20, repeat: Infinity, ease: "linear", delay: delay }}
            style={{
                position: 'fixed',
                top: y,
                zIndex: zIndex,
                fontSize: size,
                opacity: 0.3,
                pointerEvents: 'none',
                y: yParallax
            }}
        >
            ☁️
        </motion.div>
    );
};

const Balloons = () => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const newBalloons = Array.from({ length: 20 }).map((_, i) => ({
            type: 'balloon',
            id: `b-${i}`,
            color: balloonColors[i % balloonColors.length],
            delay: i * 1.5,
            x: `${Math.random() * 90}%`,
            size: 30 + Math.random() * 50,
            zIndex: Math.random() > 0.7 ? 100 : 1, // Some in front (100), most in back (1)
            speedMulti: 0.5 + Math.random() * 1.5
        }));

        const newClouds = Array.from({ length: 8 }).map((_, i) => ({
            type: 'cloud',
            id: `c-${i}`,
            y: `${Math.random() * 100}vh`,
            size: `${3 + Math.random() * 5}rem`,
            delay: i * 5,
            zIndex: i % 2 === 0 ? 90 : 0,
            speedMulti: 0.3 + Math.random() * 0.7
        }));

        setElements([...newBalloons, ...newClouds]);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {elements.map(el => (
                el.type === 'balloon' ? <Balloon key={el.id} {...el} /> : <Cloud key={el.id} {...el} />
            ))}
        </div>
    );
};

export default Balloons;

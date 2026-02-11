import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Gem, Home, Sparkles, Infinity as InfinityIcon } from 'lucide-react';

/**
 * TimelineItem Component
 * Renders a single milestone in the romantic journey.
 * Alternates side (left/right) based on index.
 */
const TimelineItem = ({ title, date, description, icon: Icon, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '4rem',
                position: 'relative'
            }}
        >
            <div style={{
                width: '45%',
                textAlign: isEven ? 'right' : 'left',
                padding: '0 2rem'
            }}>
                {!isEven && <div style={{ minHeight: '1px' }}></div>}
                {isEven && (
                    <div className="glass-card" style={{ padding: '1.5rem', display: 'inline-block', width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ff2d55' }}>{title}</h3>
                        <p style={{ fontWeight: '600', color: '#b8a1cf', marginBottom: '0.5rem' }}>{date}</p>
                        <p>{description}</p>
                    </div>
                )}
            </div>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                        '0 0 15px rgba(255, 45, 85, 0.5)',
                        '0 0 25px rgba(255, 45, 85, 0.8)',
                        '0 0 15px rgba(255, 45, 85, 0.5)'
                    ]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                }}
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(to right, #ff2d55, #ff758c)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    zIndex: 2,
                    cursor: 'pointer'
                }}
            >
                <Icon size={24} />
            </motion.div>

            <div style={{
                width: '45%',
                textAlign: isEven ? 'left' : 'right',
                padding: '0 2rem'
            }}>
                {isEven && <div style={{ minHeight: '1px' }}></div>}
                {!isEven && (
                    <div className="glass-card" style={{ padding: '1.5rem', display: 'inline-block', width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ff2d55' }}>{title}</h3>
                        <p style={{ fontWeight: '600', color: '#b8a1cf', marginBottom: '0.5rem' }}>{date}</p>
                        <p>{description}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

/**
 * Main Timeline Component
 * Displays the romantic milestones in a vertical progress path.
 */
const Timeline = () => {
    // Array of romantic milestones
    const events = [
        {
            title: "First Meeting",
            date: "The Spark",
            description: "The moment our paths crossed and changed everything forever.",
            icon: Heart
        },
        {
            title: "Wedding Day",
            date: "16 Feb",
            description: "Hand in hand, we stepped into our forever together.",
            icon: Gem
        },
        {
            title: "First Home",
            date: "Our Sanctuary",
            description: "Building our world, one brick and one memory at a time.",
            icon: Home
        },
        {
            title: "Today",
            date: "The Present",
            description: "Every day with you is a new chapter of a beautiful story.",
            icon: Sparkles
        },
        {
            title: "Forever",
            date: "∞",
            description: "To a lifetime of more milestones and endless love.",
            icon: InfinityIcon
        }
    ];

    return (
        <section id="timeline" className="section-padding" style={{ position: 'relative', padding: '6rem 2rem' }}>
            <h2 style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '4rem', color: 'white' }} className="cursive">
                Our Beautiful Journey
            </h2>

            <div style={{
                position: 'absolute',
                left: '50%',
                top: '15rem',
                bottom: '5rem',
                width: '2px',
                background: 'linear-gradient(to bottom, transparent, #ff2d55, #ff758c, transparent)',
                transform: 'translateX(-50%)',
                zIndex: 1
            }}></div>

            <div style={{ position: 'relative' }}>
                {events.map((event, index) => (
                    <TimelineItem key={index} {...event} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Timeline;

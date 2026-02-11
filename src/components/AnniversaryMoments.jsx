import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star } from 'lucide-react';

// Import Wedding Images
import wed1 from '../images/Wedding/image_1.jpeg';
import wed2 from '../images/Wedding/image_2.jpeg';
import wed3 from '../images/Wedding/image_3.jpeg';
import wed4 from '../images/Wedding/image_4.jpeg';
import wed5 from '../images/Wedding/image_5.jpeg';
import wed6 from '../images/Wedding/image_6.jpeg';

const moments = [
    {
        url: wed1,
        caption: "Our First Date",
        date: "Feb 14, 2025",
        description: "The night the stars aligned and my world changed forever."
    },
    {
        url: wed2,
        caption: "Sunset Walks",
        date: "April 20, 2025",
        description: "Hand in hand, watching the sky turn into a painting."
    },
    {
        url: wed3,
        caption: "The Proposal",
        date: "Aug 15, 2025",
        description: "Under the moonlight, you said YES to our forever."
    },
    {
        url: wed4,
        caption: "Summer Vibes",
        date: "July 12, 2025",
        description: "Sun-kissed memories and endless laughter."
    },
    {
        url: wed5,
        caption: "Cozy Evenings",
        date: "Nov 05, 2025",
        description: "Warmth, hot cocoa, and your beautiful smile."
    },
    {
        url: wed6,
        caption: "Winter Wonderland",
        date: "Dec 25, 2025",
        description: "The best gift I ever received was you."
    }
];

const AnniversaryMoments = () => {
    const [selectedMoment, setSelectedMoment] = useState(null);
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    return (
        <section id="anniversary-moments" style={{ padding: '6rem 1rem', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="cursive" style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)', color: '#ff2d55', marginBottom: '1rem', textShadow: '0 0 20px rgba(255, 45, 85, 0.4)' }}>
                        Moments Written in Stars
                    </h2>
                    <p style={{ color: '#b8a1cf', fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', letterSpacing: '4px', textTransform: 'uppercase' }}>
                        Our Journey Across the Universe
                    </p>
                </motion.div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '30px',
                padding: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {moments.map((moment, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -3 : 3 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={!isMobile ? {
                            scale: 1.05,
                            rotate: 0,
                            y: -15,
                            zIndex: 10
                        } : {}}
                        onClick={() => setSelectedMoment(moment)}
                        style={{
                            cursor: 'pointer',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '1.2rem',
                            borderRadius: '8px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                            position: 'relative',
                            transition: 'all 0.5s ease'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            aspectRatio: '1/1',
                            overflow: 'hidden',
                            borderRadius: '4px',
                            marginBottom: '1rem',
                            background: '#000',
                            position: 'relative'
                        }}>
                            <img
                                src={moment.url}
                                alt={moment.caption}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'sepia(0.2) contrast(1.1)'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'radial-gradient(circle at center, transparent, rgba(26, 11, 46, 0.3))',
                                pointerEvents: 'none'
                            }} />
                        </div>
                        {/* Decorative Star */}
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                            style={{ position: 'absolute', top: '10px', right: '10px' }}
                        >
                            <Star size={14} fill="#ffcc00" color="#ffcc00" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedMoment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMoment(null)}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(5, 2, 8, 0.96)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2000,
                            padding: isMobile ? '1rem' : '2rem',
                            backdropFilter: 'blur(12px)'
                        }}
                    >
                        <button
                            onClick={() => setSelectedMoment(null)}
                            style={{
                                position: 'absolute',
                                top: '1.5rem', right: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.15)',
                                border: 'none',
                                color: 'white',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                cursor: 'pointer', zIndex: 2001,
                                backdropFilter: 'blur(5px)'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.7, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.7, y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '1000px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: isMobile ? '1.5rem' : '3rem',
                                padding: isMobile ? '1.5rem' : '2.5rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '25px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 0 80px rgba(255, 45, 85, 0.2)'
                            }}
                        >
                            <div style={{ flex: '1 1 50%', position: 'relative' }}>
                                <img
                                    src={selectedMoment.url}
                                    alt={selectedMoment.caption}
                                    style={{
                                        width: '100%',
                                        borderRadius: '15px',
                                        boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                                        display: 'block'
                                    }}
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    style={{ position: 'absolute', bottom: '-15px', right: '-15px', background: '#ff2d55', padding: '12px', borderRadius: '50%', boxShadow: '0 8px 15px rgba(255,45,85,0.4)' }}
                                >
                                    <Heart fill="white" color="white" size={20} />
                                </motion.div>
                            </div>

                            <div style={{ flex: '1 1 50%', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ width: '40px', height: '3px', background: '#ff2d55', marginBottom: '1.5rem' }} />
                                <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', lineHeight: '1.6', color: '#b8a1cf', fontStyle: 'italic' }}>
                                    "{selectedMoment.description}"
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        opacity: [0.15, 0.6, 0.15],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, delay: i * 0.4 }}
                    style={{
                        position: 'absolute',
                        top: `${Math.random() * 90 + 5}%`,
                        left: `${Math.random() * 90 + 5}%`,
                        color: 'rgba(255, 255, 255, 0.1)',
                        zIndex: 0
                    }}
                >
                    <Star size={Math.random() * 8 + 4} fill="white" />
                </motion.div>
            ))}
        </section>
    );
};

export default AnniversaryMoments;

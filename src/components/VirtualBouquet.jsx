import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const flowerData = [
    { id: 1, name: "Rose", emoji: "🌹", compliment: "Elegant & Timeless" },
    { id: 2, name: "Lotus", emoji: "🪷", compliment: "Pure & Peaceful" },
    { id: 3, name: "Sunflower", emoji: "🌻", compliment: "Bright & Cheerful" },
    { id: 4, name: "Daisy", emoji: "🌼", compliment: "Sweet & Simple" },
    { id: 5, name: "Tulip", emoji: "🌷", compliment: "Perfect Love" },
    { id: 6, name: "Hibiscus", emoji: "🌺", compliment: "Exotic & Delicate" }
];

const VirtualBouquet = () => {
    const [pickedFlowers, setPickedFlowers] = useState([]);

    const pickFlower = (flower) => {
        if (pickedFlowers.length >= 10) return;
        const uId = Date.now();
        // Classic Dome Positioning
        const index = pickedFlowers.length;
        const x = (index % 3 - 1) * 60 + (Math.random() * 20 - 10);
        const y = -120 - (Math.floor(index / 3) * 50) + (Math.random() * 20 - 10);

        setPickedFlowers(prev => [...prev, { ...flower, uId, x, y, rotate: Math.random() * 20 - 10 }]);
    };

    const resetBouquet = () => setPickedFlowers([]);

    return (
        <section style={{
            padding: '4rem 1rem',
            textAlign: 'center',
            background: '#fff',
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 className="cursive" style={{ fontSize: '3rem', color: '#ff758c', marginBottom: '0.5rem' }}>
                    Flowers for My Queen 🌹
                </h2>
                <p style={{ color: '#ffb3c1', fontSize: '1rem' }}>Click a flower to add it to your bunch</p>
            </div>

            {/* Selection Grid */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '3rem',
                flexWrap: 'wrap'
            }}>
                {flowerData.map((f) => (
                    <motion.div
                        key={f.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => pickFlower(f)}
                        style={{
                            fontSize: '2.5rem',
                            cursor: 'pointer',
                            background: '#fff',
                            border: '1px solid #feeef1',
                            padding: '0.5rem',
                            borderRadius: '15px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                        }}
                    >
                        {f.emoji}
                    </motion.div>
                ))}
            </div>

            {/* The Classic Bouquet */}
            <div style={{
                position: 'relative',
                width: '300px',
                height: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}>
                {/* Simple Paper Wrap */}
                <AnimatePresence>
                    {pickedFlowers.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '180px',
                                height: '300px',
                                background: '#ffdae2',
                                clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)',
                                zIndex: 1,
                                opacity: 0.7
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Stems */}
                <div style={{ position: 'absolute', bottom: '0', zIndex: 2 }}>
                    <svg width="200" height="150" viewBox="0 0 100 100">
                        {pickedFlowers.map((f) => (
                            <line
                                key={`stem-${f.uId}`}
                                x1="50" y1="100"
                                x2={50 + (f.x / 2)} y2={100 + (f.y / 2) + 50}
                                stroke="#5a8c54"
                                strokeWidth="2"
                            />
                        ))}
                    </svg>
                </div>

                {/* Flowers */}
                <div style={{ position: 'absolute', bottom: '0', left: '50%', zIndex: 3 }}>
                    <AnimatePresence>
                        {pickedFlowers.map((f) => (
                            <motion.div
                                key={f.uId}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1, x: f.x - 35, y: f.y }}
                                style={{
                                    position: 'absolute',
                                    fontSize: '4.5rem',
                                    width: '70px',
                                    height: '70px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    rotate: f.rotate
                                }}
                            >
                                {f.emoji}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Bow */}
                <AnimatePresence>
                    {pickedFlowers.length > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                                position: 'absolute',
                                bottom: '30px',
                                fontSize: '4.5rem',
                                zIndex: 10
                            }}
                        >
                            🎀
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {pickedFlowers.length > 0 && (
                <button
                    onClick={resetBouquet}
                    style={{
                        marginTop: '3rem',
                        background: 'none',
                        border: '1px solid #ff758c',
                        color: '#ff758c',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    Reset Bouquet
                </button>
            )}
        </section>
    );
};

export default VirtualBouquet;

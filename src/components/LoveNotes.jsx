import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoveNotes = () => {
    const [currentNote, setCurrentNote] = useState(null);

    const notes = [
        "You are my forever. ❤️",
        "I fall in love with you every day. ✨",
        "My world begins and ends with you. 🌍",
        "You are my miracle. 💫",
        "Every moment with you is a treasure. 💎",
        "You're the best thing that ever happened to me. 🌹",
        "I'm so lucky to call you my wife. 💍",
        "Your smile is my favorite sight. 😊"
    ];

    const showRandomNote = () => {
        const randomIndex = Math.floor(Math.random() * notes.length);
        setCurrentNote(notes[randomIndex]);
        // Auto-hide note after 3 seconds
        setTimeout(() => setCurrentNote(null), 3000);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
            <AnimatePresence>
                {currentNote && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="glass-card"
                        style={{
                            position: 'absolute',
                            bottom: '5rem',
                            right: 0,
                            padding: '1rem 2rem',
                            width: '250px',
                            textAlign: 'center',
                            background: 'white',
                            color: '#ff758c',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            pointerEvents: 'none'
                        }}
                    >
                        {currentNote}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={showRandomNote}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 8px 25px rgba(255, 117, 140, 0.5)',
                    color: 'white'
                }}
            >
                <Heart fill="currentColor" size={32} />
            </motion.button>
        </div>
    );
};

export default LoveNotes;

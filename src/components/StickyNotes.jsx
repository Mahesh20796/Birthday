import React from 'react';
import { motion } from 'framer-motion';

const notes = [
    { text: "P.S. You look beautiful today! ✨", color: '#fff9c4', rotation: -5, x: '10%', y: '20%' },
    { text: "I've hidden a real gift for you in the cupboard! 🎁", color: '#f8bbd0', rotation: 3, x: '80%', y: '45%' },
    { text: "Reminder: You are my favorite person. ❤️", color: '#e1f5fe', rotation: -2, x: '15%', y: '70%' }
];

const StickyNotes = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
            {notes.map((note, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: note.rotation + (index % 2 === 0 ? 5 : -5) }}
                    style={{
                        position: 'absolute',
                        left: note.x,
                        top: note.y,
                        width: '200px',
                        padding: '1.5rem',
                        background: note.color,
                        boxShadow: '5px 5px 15px rgba(0,0,0,0.1)',
                        transform: `rotate(${note.rotation}deg)`,
                        borderRadius: '2px',
                        pointerEvents: 'auto',
                        cursor: 'grab'
                    }}
                >
                    {/* Tape piece effect */}
                    <div style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '25px',
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(2px)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }} />

                    <p className="cursive" style={{
                        fontSize: '1.2rem',
                        color: '#444',
                        lineHeight: '1.4',
                        textAlign: 'center'
                    }}>
                        {note.text}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};

export default StickyNotes;

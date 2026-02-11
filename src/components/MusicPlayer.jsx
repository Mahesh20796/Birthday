import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ activeTab }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const birthdayAudio = useRef(null);
    const anniversaryAudio = useRef(null);
    const [volume, setVolume] = useState({ bday: 0, anniv: 0 });

    const bdayUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; // Celebratory
    const annivUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Romantic

    useEffect(() => {
        if (!isPlaying) return;

        const fadeTime = 2000; // 2 seconds fade
        const interval = 50; // Update every 50ms
        const step = 1 / (fadeTime / interval);

        const fade = setInterval(() => {
            setVolume(prev => {
                let newBday = prev.bday;
                let newAnniv = prev.anniv;

                if (activeTab === 'birthday') {
                    newBday = Math.min(1, newBday + step);
                    newAnniv = Math.max(0, newAnniv - step);
                } else {
                    newBday = Math.max(0, newBday - step);
                    newAnniv = Math.min(1, newAnniv + step);
                }

                if (birthdayAudio.current) birthdayAudio.current.volume = newBday;
                if (anniversaryAudio.current) anniversaryAudio.current.volume = newAnniv;

                if ((activeTab === 'birthday' && newBday === 1 && newAnniv === 0) ||
                    (activeTab === 'anniversary' && newBday === 0 && newAnniv === 1)) {
                    clearInterval(fade);
                }

                return { bday: newBday, anniv: newAnniv };
            });
        }, interval);

        return () => clearInterval(fade);
    }, [activeTab, isPlaying]);

    const toggleMusic = () => {
        if (isPlaying) {
            birthdayAudio.current.pause();
            anniversaryAudio.current.pause();
        } else {
            birthdayAudio.current.play().catch(() => { });
            anniversaryAudio.current.play().catch(() => { });

            // Set initial volumes based on active tab
            const bVol = activeTab === 'birthday' ? 1 : 0;
            const aVol = activeTab === 'anniversary' ? 1 : 0;
            setVolume({ bday: bVol, anniv: aVol });
            birthdayAudio.current.volume = bVol;
            anniversaryAudio.current.volume = aVol;
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <audio ref={birthdayAudio} src={bdayUrl} loop />
            <audio ref={anniversaryAudio} src={annivUrl} loop />

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: activeTab === 'birthday' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 11, 46, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: activeTab === 'birthday' ? '1px solid rgba(255, 117, 140, 0.3)' : '1px solid rgba(255, 45, 85, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    color: activeTab === 'birthday' ? '#ff758c' : '#ff2d55',
                    transition: 'all 0.5s ease'
                }}
            >
                {isPlaying ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    >
                        <Music size={24} />
                    </motion.div>
                ) : (
                    <Music2 size={24} style={{ opacity: 0.5 }} />
                )}
            </motion.button>

            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{
                            background: activeTab === 'birthday' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)',
                            padding: '0.5rem 1.2rem',
                            borderRadius: '20px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            pointerEvents: 'none'
                        }}
                    >
                        <p style={{
                            fontSize: '0.75rem',
                            color: activeTab === 'birthday' ? '#ff758c' : '#b8a1cf',
                            margin: 0,
                            fontWeight: '700',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            {activeTab === 'birthday' ? "Celebratory Melody" : "Romantic Ambience"}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MusicPlayer;

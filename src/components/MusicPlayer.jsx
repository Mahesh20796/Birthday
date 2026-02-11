import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Music2 } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Using a royalty-free romantic piano track from a CDN
    const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Autoplay blocked, wait for user interaction"));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 100 }}>
            <audio ref={audioRef} src={musicUrl} loop />

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 117, 140, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    color: '#ff758c'
                }}
            >
                {isPlaying ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                        <Music size={24} />
                    </motion.div>
                ) : (
                    <Music2 size={24} opacity={0.5} />
                )}
            </motion.button>

            <p style={{
                position: 'absolute',
                left: '60px',
                bottom: '15px',
                fontSize: '0.8rem',
                color: '#ff758c',
                whiteSpace: 'nowrap',
                fontWeight: '600',
                pointerEvents: 'none',
                opacity: isPlaying ? 1 : 0.5
            }}>
                {isPlaying ? "Playing Romantic Melody" : "Music Off"}
            </p>
        </div>
    );
};

export default MusicPlayer;

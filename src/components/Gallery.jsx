import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Import Birthday Images
import bday1 from '../images/Birthday/image_1.jpeg';
import bday2 from '../images/Birthday/Imag_2.jpeg';
import bday3 from '../images/Birthday/image_3.jpeg';
import bday4 from '../images/Birthday/image_4.jpeg';
import bday5 from '../images/Birthday/image_5.jpeg';
import bday6 from '../images/Birthday/image_6.jpeg';
import bday7 from '../images/Birthday/image_7.jpeg';
import bday8 from '../images/Birthday/WhatsApp Image 2026-02-11 at 3.55.24 PM.jpeg';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { url: bday1, caption: "Your beautiful smile lights up my world." },
        { url: bday2, caption: "Every moment with you is a treasure." },
        { url: bday3, caption: "The most beautiful queen in the universe." },
        { url: bday4, caption: "Our journey together is my favorite story." },
        { url: bday5, caption: "Captured memories, timeless love." },
        { url: bday6, caption: "To many more birthdays together." },
        { url: bday7, caption: "My forever and always." },
        { url: bday8, caption: "The day the world became brighter." }
    ];

    return (
        <section id="gallery" className="section-padding">
            <h2 style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '4rem' }} className="gradient-text">
                Our Happy Moments
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                padding: '20px'
            }}>
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(img)}
                        style={{
                            cursor: 'pointer',
                            overflow: 'hidden',
                            borderRadius: '20px',
                            height: '300px',
                            position: 'relative',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <img
                            src={img.url}
                            alt={img.caption}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(255, 117, 140, 0.4)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'white',
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                textAlign: 'center',
                                padding: '1rem'
                            }}
                        >
                            {img.caption}
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="glass-card"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                                padding: '1rem',
                                position: 'relative',
                                background: 'white'
                            }}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    right: '-15px',
                                    background: '#ff758c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                                }}
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.caption}
                                style={{
                                    width: '100%',
                                    maxHeight: '70vh',
                                    objectFit: 'contain',
                                    borderRadius: '10px'
                                }}
                            />
                            <p style={{
                                textAlign: 'center',
                                marginTop: '1rem',
                                fontSize: '1.5rem',
                                fontFamily: 'Great Vibes',
                                color: '#ff758c'
                            }}>
                                {selectedImage.caption}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;

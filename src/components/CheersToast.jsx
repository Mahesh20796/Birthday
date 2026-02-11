import React from 'react';
import { motion } from 'framer-motion';

const CheersToast = () => {
    return (
        <section className="section-padding" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', fontSize: '6rem' }}>
                    <motion.div
                        initial={{ rotate: -20, x: -20 }}
                        whileInView={{ rotate: 10, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                        🥂
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    style={{
                        position: 'absolute',
                        top: '-30%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '2rem'
                    }}
                >
                    ✨
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                    style={{ marginTop: '3rem' }}
                >
                    <h2 className="cursive" style={{ fontSize: '3rem', color: '#ff2d55' }}>To Our Forever...</h2>
                    <p style={{ fontSize: '1.4rem', color: '#b8a1cf', marginTop: '1rem' }}>
                        "To us, and the many years to come."
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CheersToast;

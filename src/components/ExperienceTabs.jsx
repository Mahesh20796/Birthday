import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Birthday from './Birthday';
import Anniversary from './Anniversary';
import MusicPlayer from './MusicPlayer';
import RosePetals from './RosePetals';
import Footer from './Footer';

const ExperienceTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(location.pathname === '/anniversary' ? 'anniversary' : 'birthday');
    const [shakeLocked, setShakeLocked] = useState(null);

    // Target Dates
    const targetDates = {
        birthday: new Date(2026, 1, 12, 0, 0, 0),
        anniversary: new Date(2026, 1, 16, 0, 0, 0)
    };

    const isLocked = (tab) => {
        return new Date() < targetDates[tab];
    };

    useEffect(() => {
        const currentTab = location.pathname === '/anniversary' ? 'anniversary' : 'birthday';
        // Redirect back if user lands on a locked URL
        if (isLocked(currentTab)) {
            navigate('/birthday');
            setActiveTab('birthday');
        } else {
            setActiveTab(currentTab);
        }
    }, [location.pathname]);

    const handleTabChange = (tab) => {
        if (isLocked(tab)) {
            setShakeLocked(tab);
            setTimeout(() => setShakeLocked(null), 500);
            return;
        }
        setActiveTab(tab);
        navigate(`/${tab}`);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0
        })
    };

    const direction = activeTab === 'anniversary' ? 1 : -1;

    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            background: activeTab === 'birthday' ? '#fff5f7' : '#0a0a0a',
            transition: 'background 1s ease'
        }}>
            <RosePetals />

            {/* Sticky Tab Bar */}
            <nav style={{
                position: 'fixed',
                top: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                display: 'flex',
                background: activeTab === 'birthday' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(15px)',
                padding: '0.3rem',
                borderRadius: '50px',
                border: activeTab === 'birthday' ? '1px solid rgba(255, 117, 140, 0.3)' : '1px solid rgba(255, 45, 85, 0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                transition: 'all 0.5s ease',
                width: 'max-content',
                maxWidth: '90vw'
            }}>
                <motion.button
                    animate={shakeLocked === 'birthday' ? { x: [-10, 10, -10, 10, 0] } : {}}
                    onClick={() => handleTabChange('birthday')}
                    style={{
                        padding: '0.8rem clamp(1rem, 4vw, 2.5rem)',
                        borderRadius: '50px',
                        border: 'none',
                        background: activeTab === 'birthday' ? 'linear-gradient(45deg, #ff758c, #ff7eb3)' : 'transparent',
                        color: activeTab === 'birthday' ? 'white' : (activeTab === 'birthday' ? '#b8a1cf' : '#ff758c'),
                        fontWeight: '700',
                        cursor: isLocked('birthday') ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: 'clamp(0.85rem, 3.5vw, 1rem)',
                        whiteSpace: 'nowrap',
                        opacity: isLocked('birthday') ? 0.6 : 1
                    }}
                >
                    <span>{isLocked('birthday') ? '🔒' : '🎂'}</span> Birthday
                </motion.button>
                <motion.button
                    animate={shakeLocked === 'anniversary' ? { x: [-10, 10, -10, 10, 0] } : {}}
                    onClick={() => handleTabChange('anniversary')}
                    style={{
                        padding: '0.8rem clamp(1rem, 4vw, 2.5rem)',
                        borderRadius: '50px',
                        border: 'none',
                        background: activeTab === 'anniversary' ? 'linear-gradient(45deg, #ff2d55, #bc13fe)' : 'transparent',
                        color: activeTab === 'anniversary' ? 'white' : (activeTab === 'birthday' ? '#ff758c' : '#b8a1cf'),
                        fontWeight: '700',
                        cursor: isLocked('anniversary') ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: 'clamp(0.85rem, 3.5vw, 1rem)',
                        whiteSpace: 'nowrap',
                        opacity: isLocked('anniversary') ? 0.6 : 1
                    }}
                >
                    <span>{isLocked('anniversary') ? '🔒' : '💍'}</span> Anniversary
                </motion.button>
            </nav>

            {/* Content Area with Swipe Animations */}
            <div style={{ overflowX: 'hidden', position: 'relative', width: '100%' }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={activeTab}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                        }}
                        style={{ width: '100%' }}
                    >
                        {activeTab === 'birthday' ? <Birthday /> : <Anniversary />}
                    </motion.div>
                </AnimatePresence>
            </div>

            <MusicPlayer activeTab={activeTab} />
            <Footer activeTab={activeTab} />
        </div>
    );
};

export default ExperienceTabs;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Birthday from './components/Birthday';
import Anniversary from './components/Anniversary';
import CountdownGate from './components/CountdownGate';
import LoveNotes from './components/LoveNotes';
import ExperienceTabs from './components/ExperienceTabs';

import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <Router>
      <div className="app-container">
        <AnimatePresence>
          {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/birthday" element={<ExperienceTabs />} />
            <Route path="/anniversary" element={<ExperienceTabs />} />
          </Routes>
        )}
        <LoveNotes />
      </div>
    </Router>
  );
}

export default App;

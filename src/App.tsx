/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Intro from './components/Intro';
import Hero from './components/Hero';
import AudioVisualizer from './components/AudioVisualizer';
import LoveLetter from './components/LoveLetter';
import VideoStory from './components/VideoStory';
import Gallery from './components/Gallery';
import Reasons from './components/Reasons';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import SecretSection from './components/SecretSection';
import Finale from './components/Finale';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (hasEntered) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'auto';
      
      // Delay refresh to ensure DOM is fully rendered and animations are settled
      setTimeout(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 500);
    } else {
      document.body.style.overflowY = 'hidden';
    }
  }, [hasEntered]);

  return (
    <main className="bg-black min-h-screen selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* Progress Bar */}
      {hasEntered && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-luxury-gold origin-left z-[110] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          style={{ scaleX }}
        />
      )}

      {/* Entry Intro */}
      {!hasEntered && <Intro onEnter={() => setHasEntered(true)} />}

      {/* Main Content */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id="smooth-wrapper"
          >
            <AudioVisualizer shouldStart={hasEntered} />
            <div id="smooth-content">
              <Hero />
              <LoveLetter />
              <Stats />
              <VideoStory />
              <Reasons />
              <Gallery />
              <Timeline />
              <SecretSection />
              <Finale />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Global Styles for Luxury Feel */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.5));
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #D4AF37 transparent;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 10px;
        }
        html {
          scroll-behavior: auto !important;
        }
      `}</style>
    </main>
  );
}

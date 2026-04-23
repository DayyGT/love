/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Crown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IntroProps {
  onEnter: () => void;
}

export default function Intro({ onEnter }: IntroProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    // Allow a bit of time for exit animation before notifying parent
    setTimeout(onEnter, 1500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-luxury-black overflow-hidden"
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-luxury-gold/5 via-transparent to-transparent" />
             {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0], y: [-20, -120] }}
                  transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
                  className="absolute w-px h-px bg-luxury-gold"
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                />
             ))}
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="mb-12"
            >
              <span className="text-luxury-gold/60 font-medium tracking-[0.6em] uppercase text-[10px] mb-4 block">
                Undangan Pribadi
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-tight">
                Hanya Untuk<br />Seseorang Yang<br />Sangat Berarti
              </h1>
              <p className="mt-6 text-luxury-gray font-light tracking-[0.2em] text-xs uppercase opacity-40">
                I love u sayang
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              onClick={handleEnter}
              className="group relative mt-8"
            >
              <div className="absolute inset-0 bg-luxury-gold/20 blur-xl group-hover:bg-luxury-gold/40 transition-all rounded-full" />
              <div className="relative px-16 py-6 bg-transparent border border-luxury-gold/30 hover:border-luxury-gold rounded-full text-white tracking-[0.4em] uppercase text-xs font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-4">
      KLIK    <Crown className="w-4 h-4 text-luxury-gold" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

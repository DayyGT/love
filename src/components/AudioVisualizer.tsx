/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT } from '../constants';

interface MusicPlayerProps {
  shouldStart: boolean;
}

export default function MusicPlayer({ shouldStart }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (shouldStart && audioRef.current) {
      audioRef.current.play().catch(() => console.log("Auto-play prevented by browser policy."));
      setIsPlaying(true);
      
      // Smooth fade in
      audioRef.current.volume = 0;
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = vol;
        } else {
          clearInterval(interval);
        }
      }, 200);
    }
  }, [shouldStart]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-12 right-12 z-[120]">
      <audio 
        ref={audioRef} 
        src={CONTENT.musicUrl} 
        loop
      />
      
      <div className="flex items-center gap-6">
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-luxury-black/40 backdrop-blur-xl border border-luxury-gold/20 rounded-full py-3 px-6 flex items-center gap-4 gold-glow shadow-2xl"
            >
              <div className="flex items-end gap-1 h-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: isPlaying ? [4, 16, 4] : 4 }}
                    transition={{ 
                      duration: 0.6, 
                      repeat: Infinity, 
                      delay: i * 0.15 
                    }}
                    className="w-1 bg-luxury-gold rounded-full"
                  />
                ))}
              </div>
              <span className="text-[9px] text-luxury-gold tracking-[0.4em] uppercase font-bold">LAGU KESUKAANMU</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4">
          <button
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center bg-luxury-black/60 hover:bg-luxury-gold/10 backdrop-blur-3xl border border-luxury-gold/30 rounded-full text-luxury-gold transition-all duration-500 hover:scale-110"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-luxury-gold" /> : <Play className="w-5 h-5 fill-luxury-gold" />}
          </button>
          
          <button
            onClick={toggleMute}
            className="w-14 h-14 flex items-center justify-center bg-luxury-black/60 hover:bg-luxury-gold/10 backdrop-blur-3xl border border-luxury-gold/30 rounded-full text-luxury-gold transition-all duration-500 hover:scale-110"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

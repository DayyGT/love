/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CONTENT } from '../constants';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Finale() {
  const handleHug = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#E6B7A9', '#FFFFFF'],
      shapes: ['circle']
    });
    alert("Pelukan virtual terkirim! ❤️");
  };

  return (
    <footer className="relative bg-luxury-black pt-40 pb-20 px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="inline-block p-1 rounded-full bg-gradient-to-br from-luxury-gold to-transparent mb-12"
          >
            <div className="bg-luxury-black px-12 py-4 rounded-full flex items-center gap-3">
               <Heart className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
               <span className="text-luxury-gold font-medium tracking-[0.5em] text-[10px] uppercase">Koneksi Abadi</span>
            </div>
          </motion.div>
          
          <h2 className="text-7xl md:text-[10rem] font-serif font-bold text-white mb-12 tracking-tighter leading-none italic opacity-90">
            {CONTENT.final.title}
          </h2>
          
          <p className="text-luxury-gray text-2xl font-light max-w-3xl mx-auto mb-20 leading-relaxed italic opacity-60">
            {CONTENT.final.message}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <button 
              onClick={handleHug}
              className="group relative px-16 py-6 overflow-hidden rounded-full transition-all active:scale-95"
            >
              <div className="absolute inset-0 bg-white group-hover:scale-105 transition-transform" />
              <span className="relative text-luxury-black font-bold uppercase tracking-[0.4em] text-xs">Peluk Aku</span>
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group px-16 py-6 rounded-full border border-white/10 text-white font-bold uppercase tracking-[0.4em] text-xs hover:bg-white/5 transition-all active:scale-95"
            >
              Tetaplah Selamanya
            </button>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 text-white/20 font-light tracking-[0.5em] text-[9px] uppercase">
          <p>Dibuat untuk seseorang yang paling langka dan berharga ❤️</p>
          <div className="flex items-center gap-12">
            <p>Sejak: {CONTENT.stats.startDate}</p>
            <p>© 2026 Koleksi Pribadi</p>
          </div>
        </div>
      </div>

      {/* Final Cinematic Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-luxury-gold/5 blur-[200px] rounded-[50%] pointer-events-none" />
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState } from 'react';
import { CONTENT } from '../constants';
import { ShieldCheck, ShieldAlert, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SecretSection() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#E6B7A9', '#FFFFFF']
    });
  };

  return (
    <section className="bg-luxury-black py-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-luxury-gray/40 font-medium tracking-[0.6em] uppercase text-[9px] mb-8 block"
        >
          Akses Eksklusif
        </motion.span>
        
        <div className="relative">
          <motion.div
            initial={false}
            animate={{ 
              scale: isRevealed ? 1 : 0.98,
            }}
            className={`
              relative p-12 md:p-32 rounded-[20px] overflow-hidden border transition-all duration-1000 cursor-pointer
              ${isRevealed 
                ? 'bg-luxury-gold/5 border-luxury-gold/40 shadow-[0_0_80px_rgba(212,175,55,0.1)]' 
                : 'bg-white/[0.01] border-white/5 hover:border-luxury-gold/20'}
            `}
            onClick={!isRevealed ? handleReveal : undefined}
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />
            
            <div className="relative z-10 flex flex-col items-center gap-12">
              <div className="relative">
                 <motion.div 
                    animate={isRevealed ? { rotate: [0, 10, -10, 0] } : {}}
                    className={`w-24 h-24 rounded-full border flex items-center justify-center transition-all duration-700
                    ${isRevealed ? 'border-luxury-gold bg-luxury-gold/10' : 'border-white/10 bg-white/5'}
                  `}>
                    {isRevealed ? (
                      <ShieldCheck className="w-10 h-10 text-luxury-gold animate-pulse" />
                    ) : (
                      <ShieldAlert className="w-10 h-10 text-white/20" />
                    )}
                  </motion.div>
                  {isRevealed && (
                    <div className="absolute inset-0 bg-luxury-gold/20 blur-2xl rounded-full" />
                  )}
              </div>

              <div className="space-y-6">
                 <h3 className={`text-4xl md:text-6xl font-serif tracking-tight transition-all duration-1000 ${isRevealed ? 'text-white' : 'text-white/10'}`}>
                  {isRevealed ? CONTENT.vault.revealed : CONTENT.vault.initial}
                </h3>
                {isRevealed && (
                   <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="text-luxury-gold font-light tracking-[0.4em] uppercase text-[10px]"
                   >
                    Terautentikasi & Terverifikasi • Selalu
                   </motion.p>
                )}
              </div>

              {!isRevealed && (
                <div className="flex items-center gap-3 text-luxury-gold/30 font-medium tracking-[0.5em] text-[8px] uppercase">
                  <Sparkles className="w-3 h-3" /> Klik Untuk Autentikasi <Sparkles className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* Sweep Light Effect */}
            {!isRevealed && (
              <motion.div 
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
              />
            )}
          </motion.div>
          
          {isRevealed && (
             <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 12 }}
              transition={{ type: 'spring', damping: 12, delay: 0.5 }}
              className="absolute -top-10 -right-10 bg-luxury-gold p-6 rounded-2xl shadow-2xl z-20"
            >
              <Heart className="w-8 h-8 text-luxury-black fill-luxury-black" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

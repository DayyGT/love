/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CONTENT } from '../constants';
import { Quote } from 'lucide-react';

export default function LoveLetter() {
  return (
    <section 
      id="letter"
      className="relative min-h-screen flex items-center justify-center py-32 bg-luxury-black overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          <div className="absolute -inset-4 border border-luxury-gold/20 rounded-[20px] transform -rotate-3 pointer-events-none" />
          <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden border border-luxury-gold/10 shadow-2xl group">
            <img 
              src="assets/images/10.jpg"
              alt="Memory"
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-10 left-10 text-white/50 text-[9px] uppercase tracking-[0.5em]">Koleksi Bingkai No. 01.</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 space-y-12"
        >
          <div className="space-y-4">
            <Quote className="w-12 h-12 text-luxury-gold/30 mb-8" />
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              {CONTENT.letter.title}
            </h2>
            <div className="h-px w-24 bg-luxury-gold/40" />
          </div>
          
          <div className="space-y-8">
            <p className="text-luxury-gray text-xl md:text-2xl font-light leading-[1.8] italic opacity-90">
              {CONTENT.letter.content}
            </p>
          </div>

          <div className="pt-10 border-t border-white/10">
            <p className="text-luxury-gold font-serif text-3xl italic tracking-wide">
              {CONTENT.letter.signature}
            </p>
            <p className="text-white/20 text-[10px] uppercase tracking-[0.6em] mt-4">Sangat Pribadi & Rahasia</p>
          </div>
        </motion.div>
      </div>

      {/* Background Parallax text */}
      <div className="absolute top-1/2 left-0 w-full whitespace-nowrap overflow-hidden pointer-events-none opacity-[0.02]">
        <span className="text-[20rem] font-serif font-bold text-white uppercase italic tracking-tighter block leading-none select-none">
          Eternal Love • Timeless • Pure • Forever
        </span>
      </div>
    </section>
  );
}

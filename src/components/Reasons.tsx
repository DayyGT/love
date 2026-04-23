/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CONTENT } from '../constants';
import { Sparkles, Diamond, Heart, Eye, Music, Star } from 'lucide-react';

export default function Reasons() {
  const icons = [Diamond, Heart, Music, Heart, Eye, Star];

  return (
    <section className="bg-luxury-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-luxury-gold font-medium tracking-[0.6em] uppercase text-[10px] block"
            >

              Kualitas Penting
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tight leading-none italic">
              Mengapa Kamu  <span className="text-luxury-gold">Begitu Langka</span>
            </h2>
          </div>
          <div className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-light border-l border-white/10 pl-8 max-w-[200px]">
            Keistimewaan keberadaanmu
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CONTENT.reasons.map((reason, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-12 bg-white/[0.02] border border-white/5 rounded-[20px] transition-all duration-700 hover:bg-white/[0.05] hover:border-luxury-gold/20"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-5 h-5 text-luxury-gold/40 animate-pulse" />
                </div>

                <div className="w-16 h-16 bg-luxury-gold/5 rounded-xl flex items-center justify-center mb-10 border border-luxury-gold/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
                  <Icon className="w-6 h-6 text-luxury-gold" />
                </div>

                <h3 className="text-2xl font-serif text-white mb-6 group-hover:text-luxury-gold transition-colors duration-700">
                  {reason.title}
                </h3>
                <p className="text-luxury-gray font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                  {reason.description}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-luxury-gold/20 via-transparent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

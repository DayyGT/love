/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CONTENT } from '../constants';

export default function Timeline() {
  return (
    <section id="timeline" className="bg-luxury-black py-40 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-32 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-luxury-gold font-medium tracking-[0.6em] uppercase text-[10px] mb-4 block"
          >
            Perjalanan
          </motion.span>
          <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tight italic">Perjalanan Indah Kita</h2>
        </div>

        <div className="relative">
          {/* Vertical Gold Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-luxury-gold/40 to-transparent -translate-x-1/2" />

          <div className="space-y-32">
            {CONTENT.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Gold Glow Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-luxury-gold shadow-[0_0_20px_#D4AF37] z-10" />

                {/* Content Card */}
                <div className={`w-[42%] group`}>
                  <div className="space-y-4">
                    <span className="text-luxury-gold/50 font-bold tracking-[0.3em] text-[9px] uppercase">
                      {item.date}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide group-hover:text-luxury-gold transition-colors duration-700">
                      {item.title}
                    </h3>
                    <p className="text-luxury-gray font-light leading-relaxed opacity-60">
                      {item.description}
                    </p>
                    <div className="h-px w-0 group-hover:w-full bg-luxury-gold/20 transition-all duration-1000" />
                  </div>
                </div>

                <div className="w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

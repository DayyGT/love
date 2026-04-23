/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { CONTENT } from '../constants';

export default function Gallery() {
  const images = CONTENT.gallery;

  return (
    <section id="gallery" className="bg-luxury-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-luxury-gold font-medium tracking-[0.6em] uppercase text-[10px] block"
            >
              Arsip Kenangan
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tight leading-none">
              Koleksi Memori
            </h2>
          </div>
          <div className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-light border-l border-white/10 pl-8">
            Momen Terpilih<br />Dalam Seumur Hidup
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i % 3 * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-[10px] bg-luxury-black border border-white/5 shadow-2xl transition-all duration-700 hover:border-luxury-gold/30
                ${i % 4 === 0 ? 'md:col-span-8 aspect-[16/9]' : i % 4 === 1 ? 'md:col-span-4 aspect-[3/4]' : i % 4 === 2 ? 'md:col-span-4 aspect-[4/5]' : 'md:col-span-8 aspect-[16/9]'}
              `}
            >
              <img 
                src={src} 
                alt={`Memory ${i}`}
                className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-luxury-gold" />
                </div>
              </div>

              <div className="absolute bottom-10 left-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="text-luxury-gold text-[9px] tracking-[0.4em] uppercase block mb-1">Momen No. {i + 1}</span>
                <p className="text-white font-serif text-2xl italic tracking-wide">Esensi Berharga</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

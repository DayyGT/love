/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { CONTENT } from '../constants';
import { Heart, Timer, Camera, Infinity } from 'lucide-react';

export default function Stats() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const start = new Date(CONTENT.stats.startDate);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    setDays(diff);
  }, []);

  const stats = [
    { label: "Hari Bersama", value: days, icon: Heart },
    { label: "Memori Berbagi", value: CONTENT.stats.memories, icon: Camera },
    { label: "Senyum Tercipta", value: CONTENT.stats.laughs, icon: Timer },
    { label: "Masa Depan Abadi", value: CONTENT.stats.future, icon: Infinity }
  ];

  return (
    <section className="bg-luxury-black py-40 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-luxury-gold/5 border border-luxury-gold/10 flex items-center justify-center mb-10 transition-all duration-700 group-hover:border-luxury-gold group-hover:bg-luxury-gold/10">
                <stat.icon className="w-8 h-8 text-luxury-gold" />
              </div>
              <div className="space-y-4">
                <h3 className="text-6xl md:text-7xl font-serif font-bold text-white tracking-tighter transition-all duration-700 group-hover:text-luxury-gold/80">
                  {stat.value}
                </h3>
                <p className="text-luxury-gray font-medium tracking-[0.5em] uppercase text-[9px] opacity-40 group-hover:opacity-100 transition-opacity">
                   {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

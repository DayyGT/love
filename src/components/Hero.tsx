/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../constants';
import { Sparkles, ChevronRight, Play } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-title-word", {
        y: 100,
        opacity: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.8
      });
      
      gsap.to(".gold-ray", {
        rotate: 360,
        repeat: -1,
        duration: 40,
        ease: "none"
      });
    }, containerRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center bg-luxury-black overflow-hidden pt-20"
      id="hero"
    >
      {/* Cinematic Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_var(--tw-gradient-stops))] from-luxury-gold/20 via-transparent to-transparent opacity-60" />
        <div className="gold-ray absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[conic-gradient(from_0deg,_transparent_0%,_#D4AF37_0.2%,_transparent_2%)] opacity-10" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 backdrop-blur-md mb-12 shadow-inner"
        >
          <Sparkles className="w-3 h-3 text-luxury-gold" />
          <span className="text-luxury-gold font-medium tracking-[0.5em] uppercase text-[9px]">
            {CONTENT.hero.label}
          </span>
        </motion.div>

        <div className="space-y-6 overflow-hidden">
          {CONTENT.hero.title.map((line, i) => (
            <h1 
              key={i}
              className="hero-title-word text-7xl md:text-[10rem] font-serif font-bold text-white tracking-tighter leading-[0.8] block"
            >
              {line}
            </h1>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-12 text-luxury-gray text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed tracking-wide italic opacity-80"
        >
          {CONTENT.hero.subtitle}
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, delay: 1.8 }}
           className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-10"
        >
          <button 
            onClick={() => document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative flex items-center gap-4 text-white font-semibold uppercase tracking-[0.4em] text-xs transition-all hover:gap-6"
          >
            <span className="relative">
              {CONTENT.hero.cta1}
              <div className="absolute -bottom-2 left-0 w-full h-px bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </span>
            <ChevronRight className="w-4 h-4 text-luxury-gold" />
          </button>

          <button 
            onClick={() => document.getElementById('video-story')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-4 px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white tracking-[0.3em] uppercase text-xs hover:bg-white/10 transition-all backdrop-blur-xl"
          >
            {CONTENT.hero.cta2} <Play className="w-3 h-3 fill-white" />
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Elements (Dust/Particles) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100, 0], 
              opacity: [0, 0.4, 0],
              x: [0, (Math.random() - 0.5) * 50] 
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-luxury-gold rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

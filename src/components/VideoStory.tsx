/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Play, Pause, Film, Volume2, VolumeX } from 'lucide-react';
import { CONTENT } from '../constants';

export default function VideoStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playingIndices, setPlayingIndices] = useState<number[]>([]);
  const [mutedIndices, setMutedIndices] = useState<number[]>(CONTENT.videos.map((_, i) => i));
  
  const videos = CONTENT.videos;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-card').forEach((card: any, i: number) => {
        const video = card.querySelector('video');
        if (!video) return;

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top center",
            end: "bottom center",
            onLeave: () => {
              video.pause();
              setPlayingIndices(prev => prev.filter(idx => idx !== i));
            },
            onLeaveBack: () => {
              video.pause();
              setPlayingIndices(prev => prev.filter(idx => idx !== i));
            },
          }
        });
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  const togglePlay = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const card = e.currentTarget.closest('.story-card');
    const video = card?.querySelector('video');
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
        setPlayingIndices(prev => Array.from(new Set([...prev, index])));
      } else {
        video.pause();
        setPlayingIndices(prev => prev.filter(idx => idx !== index));
      }
    }
  };

  const toggleMute = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const card = e.currentTarget.closest('.story-card');
    const video = card?.querySelector('video');
    if (video) {
       video.muted = !video.muted;
       if (video.muted) {
         setMutedIndices(prev => Array.from(new Set([...prev, index])));
       } else {
         setMutedIndices(prev => prev.filter(idx => idx !== index));
       }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="video-story"
      className="bg-luxury-black py-32 px-6"
    >
      <div className="max-w-7xl mx-auto mb-32">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="flex items-center gap-4 mb-4"
        >
          <Film className="w-4 h-4 text-luxury-gold" />
          <span className="text-luxury-gold font-medium tracking-[0.6em] uppercase text-[10px]">Arsip Video</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-6xl md:text-8xl font-serif text-white tracking-tight leading-none"
        >
          Keindahaan-Mu
        </motion.h2>
      </div>

      <div className="space-y-40">
        {videos.map((src, i) => (
          <div 
            key={i}
            onClick={(e) => togglePlay(i, e)}
            className="story-card relative group h-[70vh] md:h-[90vh] rounded-[30px] overflow-hidden bg-luxury-black/40 border border-white/5 cursor-pointer"
          >
            {/* Cinematic Letterboxing */}
            <div className="absolute top-0 left-0 w-full h-[10%] bg-luxury-black z-10 transition-all group-hover:h-[5%]" />
            <div className="absolute bottom-0 left-0 w-full h-[10%] bg-luxury-black z-10 transition-all group-hover:h-[5%]" />
            
            <video 
              src={src}
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-out
                ${playingIndices.includes(i) ? 'opacity-80 scale-100' : 'opacity-40 scale-110'}
              `}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60" />
            
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.button
                onClick={(e) => togglePlay(i, e)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm z-20 group-hover:bg-white/10 transition-all"
              >
                {playingIndices.includes(i) ? (
                  <Pause className="w-8 h-8 text-white fill-white/20" />
                ) : (
                  <Play className="w-8 h-8 text-white fill-white/20 ml-2" />
                )}
              </motion.button>
            </div>

            {/* Mute Toggle */}
            <button 
              onClick={(e) => toggleMute(i, e)}
              className="absolute top-10 right-10 z-30 p-4 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {mutedIndices.includes(i) ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            <div className="absolute bottom-16 left-16 right-16 z-20 flex flex-col items-center text-center gap-4">
              <h3 className="text-3xl md:text-5xl font-serif text-white italic tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                {i === 0 ? "Manis-ku" : i === 1 ? "Cinta-ku" : "Princes-ku"}
              </h3>
            </div>
          </div>
        ))}

        <div className="text-center py-40">
           <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-7xl md:text-[12rem] font-serif font-bold text-gold-gradient tracking-tighter italic"
          >
            Aku Mencintaimu Selamanya
          </motion.h4>
        </div>
      </div>
    </section>
  );
}

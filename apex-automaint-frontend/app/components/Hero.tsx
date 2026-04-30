"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ShieldCheck, Clock, Award } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import Car3D from './Car3D';

interface HeroProps {
  onBookClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center bg-[#060b12] text-white overflow-hidden py-20 lg:py-0">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,168,255,0.05),transparent)] z-0"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-gold"></span>
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">{t.hero.subtitle}</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-black leading-[1.1] mb-8">
              {t.hero.title1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{t.hero.title2}</span> <br/>
              <span className="text-gold">{t.hero.title3}</span>
            </h1>

            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
              <button 
                onClick={onBookClick}
                className="px-8 py-4 bg-gold text-dark font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                {t.hero.bookBtn}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#services" 
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-colors duration-300 flex items-center justify-center"
              >
                {t.hero.exploreBtn}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="text-3xl font-serif font-bold text-white mb-1">15+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">{t.hero.stats.exp}</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-white mb-1">10k+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">{t.hero.stats.clients}</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-white mb-1">24/7</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">{t.hero.stats.support}</div>
              </div>
            </div>
          </motion.div>

          {/* Visual/Image Placeholder - Now 3D Car */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="relative h-[400px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 z-10">
              <Car3D />
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-blue-500/10 rounded-full -z-10 animate-[spin_15s_linear_infinite_reverse]"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;

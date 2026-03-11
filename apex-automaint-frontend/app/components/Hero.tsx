"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ShieldCheck, Clock, Award } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onBookClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen min-h-[800px] flex items-center bg-dark text-white overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop)' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/40 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent z-0"></div>
      
      {/* Abstract Shapes/Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
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

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
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

          {/* Visual/Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <div className="grid gap-6">
                <div className="bg-[#0a0a0a] backdrop-blur-md p-6 rounded-xl border border-white/20 flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded-lg text-gold">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{t.hero.cards.iso.title}</h3>
                    <p className="text-sm text-white">{t.hero.cards.iso.desc}</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0a0a] backdrop-blur-md p-6 rounded-xl border border-white/20 flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded-lg text-gold">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{t.hero.cards.fast.title}</h3>
                    <p className="text-sm text-white">{t.hero.cards.fast.desc}</p>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] backdrop-blur-md p-6 rounded-xl border border-white/20 flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded-lg text-gold">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{t.hero.cards.expert.title}</h3>
                    <p className="text-sm text-white">{t.hero.cards.expert.desc}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative background behind cards */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-gold/20 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-full h-full border border-white/5 rounded-2xl -z-10"></div>
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

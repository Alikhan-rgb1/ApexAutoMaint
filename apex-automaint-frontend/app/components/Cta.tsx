"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface CtaProps {
  onBookClick?: () => void;
}

const Cta: React.FC<CtaProps> = ({ onBookClick }) => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-gold relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop)' }}
      ></div>
      <div className="absolute inset-0 bg-dark/5 pattern-grid-lg opacity-20"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6"
          >
            {t.cta.title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-dark/80 text-lg mb-10 max-w-2xl mx-auto"
          >
            {t.cta.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="tel:+971501234567" 
              className="px-8 py-4 bg-dark text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-dark transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Phone size={16} />
              {t.cta.callBtn}
            </a>
            <button 
              onClick={onBookClick}
              className="px-8 py-4 bg-transparent border-2 border-dark text-dark font-bold uppercase tracking-widest text-xs hover:bg-dark hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Calendar size={16} />
              {t.cta.bookBtn}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cta;

"use client";
import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  'AXA', 'Allianz', 'Noor Takaful', 'Oman Insurance', 
  'RSA', 'Sukoon', 'Tokio Marine', 'Salama',
  'GIG', 'MetLife', 'Orient', 'QIC'
];

const Insurance = () => {
  return (
    <section className="py-20 bg-dark border-t border-white/10 overflow-hidden">
      <div className="container text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/60 text-sm uppercase tracking-widest font-medium"
        >
          Trusted by Major Insurance Companies
        </motion.div>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap gap-12 py-4">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm text-white font-serif font-bold text-xl min-w-[200px] hover:border-gold/50 hover:bg-white/10 transition-all duration-300 cursor-default"
            >
              {logo}
            </div>
          ))}
        </div>
        
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-dark to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-dark to-transparent z-10"></div>
      </div>
      
      <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Insurance;

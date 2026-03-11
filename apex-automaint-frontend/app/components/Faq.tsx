"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Faq = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-light-bg relative">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.faq.subtitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
            {t.faq.title}
          </h2>
          <p className="text-gray-500">
            {t.faq.desc}
          </p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-serif font-bold transition-colors ${activeIndex === index ? 'text-gold' : 'text-dark'}`}>
                  {faq.q}
                </span>
                <span className={`p-2 rounded-full transition-colors ${activeIndex === index ? 'bg-gold text-white' : 'bg-light-bg text-dark'}`}>
                  {activeIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;

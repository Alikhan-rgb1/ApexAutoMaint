"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Car, Zap, Wrench, ShieldCheck, Thermometer, Cog, PhoneCall, FileCheck, ArrowUpRight } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const services = [
  { icon: Car, key: 'bodywork' },
  { icon: Zap, key: 'electrical' },
  { icon: Wrench, key: 'mechanical' },
  { icon: ShieldCheck, key: 'ceramic' },
  { icon: Thermometer, key: 'ac' },
  { icon: Cog, key: 'transmission' },
  { icon: PhoneCall, key: 'concierge' },
  { icon: FileCheck, key: 'insurance' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Services = () => {
  const { t } = useLanguage();
  
  const serviceItems = [
    { icon: Car, title: t.services.items.detailing.title, description: t.services.items.detailing.desc },
    { icon: Zap, title: t.services.items.electrical.title, description: t.services.items.electrical.desc },
    { icon: Wrench, title: t.services.items.mechanical.title, description: t.services.items.mechanical.desc },
    { icon: ShieldCheck, title: t.services.items.maintenance.title, description: t.services.items.maintenance.desc },
    { icon: Thermometer, title: t.services.items.ac.title, description: t.services.items.ac.desc },
    { icon: Cog, title: t.services.items.diagnostics.title, description: t.services.items.diagnostics.desc },
  ];

  return (
    <section id="services" className="py-24 bg-light-bg relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gold blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-dark blur-[120px]"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            {t.services.subtitle}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6"
          >
            {t.services.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg leading-relaxed"
          >
            {t.services.desc}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {serviceItems.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="text-gold" size={20} />
              </div>
              
              <div className="w-14 h-14 bg-light-bg rounded-xl flex items-center justify-center text-dark mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold text-dark mb-3 font-serif group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

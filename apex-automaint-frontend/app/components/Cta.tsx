"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';

const Cta = () => {
  return (
    <section className="py-24 bg-gold relative overflow-hidden">
      <div className="absolute inset-0 bg-dark/5 pattern-grid-lg opacity-20"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6"
          >
            Ready to Experience the Apex Difference?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-dark/80 text-lg mb-10 max-w-2xl mx-auto"
          >
            Contact us today for a free consultation and let our experts take care of your car with the precision it deserves.
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
              Call Us Now
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-transparent border-2 border-dark text-dark font-bold uppercase tracking-widest text-xs hover:bg-dark hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Calendar size={16} />
              Book Appointment
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cta;

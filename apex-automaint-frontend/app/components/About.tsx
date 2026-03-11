"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Star, Users } from 'lucide-react';

const features = [
  "ISO 9001:2015 Certified Facility",
  "Latest Diagnostic Technology",
  "Genuine Parts Guarantee",
  "Transparent Pricing Policy"
];

interface AboutProps {
  onBookClick?: () => void;
}

const About: React.FC<AboutProps> = ({ onBookClick }) => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 bg-dark rounded-2xl p-1 overflow-hidden h-full min-h-[500px] flex flex-col justify-end">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop)' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-0"></div>
              
              <div className="relative z-10 p-8 md:p-10 text-center">
                <div className="inline-flex items-center justify-center p-4 bg-gold/20 backdrop-blur-md rounded-full mb-6 border border-gold/30">
                  <Shield size={32} className="text-gold" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-2">ISO 9001:2015</h3>
                <p className="text-gold tracking-widest uppercase text-sm mb-8 font-bold">Certified Quality</p>
                
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-[#1a1a1a]/90 backdrop-blur-md p-4 rounded-lg border border-white/20">
                    <Star className="text-gold mb-2" size={20} />
                    <div className="text-white font-bold text-lg">4.9/5</div>
                    <div className="text-xs text-white">Customer Rating</div>
                  </div>
                  <div className="bg-[#1a1a1a]/90 backdrop-blur-md p-4 rounded-lg border border-white/20">
                    <Users className="text-gold mb-2" size={20} />
                    <div className="text-white font-bold text-lg">10k+</div>
                    <div className="text-xs text-white">Served Clients</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative background shape */}
            <div className="absolute top-10 -left-10 w-full h-full bg-gold/10 rounded-3xl -z-10 transform -rotate-3"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
              Your Peace of Mind is Our <span className="text-gold">Priority</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              ApexAutoMaint is not just a garage; it&apos;s a commitment to excellence. 
              Our team of experienced and certified technicians use the latest tools and technology to ensure your vehicle is in safe hands. 
              We believe in transparency, quality, and customer satisfaction above all else.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold flex-shrink-0" size={20} />
                  <span className="text-dark font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={onBookClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-dark text-white font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-dark transition-all duration-300 rounded-sm"
            >
              Get a Free Quote
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

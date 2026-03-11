"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Navigation } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container">
        <div className="text-center mb-16">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.contact.subtitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
            {t.contact.title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Dubai Branch */}
            <div className="relative pl-8 border-l-2 border-gold/30">
              <h3 className="text-2xl font-serif font-bold text-dark mb-6">{t.contact.dubaiBranch}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-gold mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-dark font-medium">{t.contact.addressVal}</p>
                    <p className="text-gray-500 text-sm">{t.contact.dubaiAddr}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold mt-2 hover:text-dark transition-colors">
                      <Navigation size={12} /> {t.contact.waze}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-gold flex-shrink-0" size={20} />
                  <a href="tel:+971501234567" className="text-gray-600 hover:text-gold transition-colors font-medium">+971 50 123 4567</a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-gold flex-shrink-0" size={20} />
                  <a href="mailto:info.dxb@apexauto.ae" className="text-gray-600 hover:text-gold transition-colors font-medium">info.dxb@apexauto.ae</a>
                </div>
              </div>
            </div>

            {/* Sharjah Branch */}
            <div className="relative pl-8 border-l-2 border-gold/30">
              <h3 className="text-2xl font-serif font-bold text-dark mb-6">{t.contact.sharjahBranch}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-gold mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-dark font-medium">456 Industrial Area 3</p>
                    <p className="text-gray-500 text-sm">{t.contact.sharjahAddr}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold mt-2 hover:text-dark transition-colors">
                      <Navigation size={12} /> {t.contact.waze}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-gold flex-shrink-0" size={20} />
                  <a href="tel:+971507654321" className="text-gray-600 hover:text-gold transition-colors font-medium">+971 50 765 4321</a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-gold flex-shrink-0" size={20} />
                  <a href="mailto:info.shj@apexauto.ae" className="text-gray-600 hover:text-gold transition-colors font-medium">info.shj@apexauto.ae</a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-light-bg p-8 rounded-2xl flex items-start gap-4">
              <Clock className="text-gold mt-1" size={24} />
              <div>
                <h4 className="font-bold text-dark mb-2">{t.contact.hours}</h4>
                <p className="text-gray-600 text-sm mb-1">{t.contact.hoursVal}</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-serif font-bold text-dark mb-8">{t.contact.form.submit}</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.contact.form.name}</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-light-bg border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  placeholder={t.contact.form.namePh}
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.contact.form.phone}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full bg-light-bg border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder={t.contact.form.phonePh}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.contact.form.service}</label>
                  <select 
                    id="service" 
                    className="w-full bg-light-bg border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none"
                  >
                    <option value="">{t.contact.form.service}</option>
                    <option value="maintenance">{t.contact.form.serviceOptions.maintenance}</option>
                    <option value="repair">{t.contact.form.serviceOptions.repair}</option>
                    <option value="bodywork">{t.contact.form.serviceOptions.bodywork}</option>
                    <option value="other">{t.contact.form.serviceOptions.other}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.contact.form.message}</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-light-bg border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                  placeholder={t.contact.form.messagePh}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-dark text-white font-bold uppercase tracking-widest text-sm py-4 rounded-lg hover:bg-gold hover:text-dark transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {t.contact.form.submit}
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

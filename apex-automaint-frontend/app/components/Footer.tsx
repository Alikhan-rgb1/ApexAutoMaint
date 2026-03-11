"use client";
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-dark text-white pt-20 pb-8 border-t border-white/10">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-black tracking-tight">
                ApexAuto<span className="text-gold">Maint</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{t.footer.links}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#about" className="hover:text-gold transition-colors">{t.nav.about}</Link></li>
              <li><Link href="#services" className="hover:text-gold transition-colors">{t.nav.services}</Link></li>
              <li><Link href="#faq" className="hover:text-gold transition-colors">{t.nav.faq}</Link></li>
              <li><Link href="#contact" className="hover:text-gold transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{t.nav.services}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-gold transition-colors">{t.services.items.mechanical.title}</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">{t.services.items.electrical.title}</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">{t.services.items.detailing.title}</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">{t.services.items.ac.title}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{t.footer.newsletter}</h4>
            <p className="text-gray-400 text-sm mb-4">{t.footer.subscribe}</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder={t.footer.emailPh} 
                className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm w-full focus:outline-none focus:border-gold transition-colors"
              />
              <button className="bg-gold text-dark font-bold uppercase text-xs px-4 py-2 rounded hover:bg-white transition-colors">
                {t.footer.join}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-wider">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-gold transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

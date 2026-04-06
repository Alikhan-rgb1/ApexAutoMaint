"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onBookClick?: () => void;
  forceDarkHeader?: boolean;
  showTopBannerOnMobile?: boolean;
  hideMainHeader?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBookClick, forceDarkHeader, showTopBannerOnMobile: _showTopBannerOnMobile, hideMainHeader }) => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  void _showTopBannerOnMobile;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      {!hideMainHeader && (
        <header 
          className={`fixed left-0 right-0 z-40 transition-all duration-300 top-8 ${
            forceDarkHeader
              ? 'bg-dark/95 backdrop-blur-md shadow-sm py-4 border-b border-white/10'
              : (isScrolled || isMenuOpen 
                ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-gray-100' 
                : 'bg-transparent py-6')
          }`}
        >
          <div className="container flex justify-between items-center">
            <Link href="/" className="relative z-50 group">
              <span className={`font-serif text-2xl md:text-3xl font-black tracking-tight transition-colors duration-300 ${
                forceDarkHeader ? 'text-white' : ((isScrolled || isMenuOpen) ? 'text-dark' : 'text-white')
              }`}>
                ApexAuto<span className="text-gold">Maint</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-xs font-medium uppercase tracking-widest hover:text-gold transition-colors relative group ${
                    forceDarkHeader ? 'text-gray-200' : (isScrolled ? 'text-dark-lighter' : 'text-gray-200')
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <Link
                href="/login"
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                  forceDarkHeader
                    ? 'border-white text-white hover:bg-white hover:text-dark'
                    : ((isScrolled || isMenuOpen)
                      ? 'border-dark text-dark hover:bg-dark hover:text-white'
                      : 'border-white text-white hover:bg-white hover:text-dark')
                }`}
              >
                {t?.nav?.login ?? 'Login'}
              </Link>
              <button 
                onClick={onBookClick}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                  forceDarkHeader
                    ? 'border-gold text-gold hover:bg-gold hover:text-dark'
                    : (isScrolled 
                      ? 'border-dark text-dark hover:bg-dark hover:text-white' 
                      : 'border-gold text-gold hover:bg-gold hover:text-dark')
                }`}>
                {t.nav.book}
              </button>
            </nav>

            <button 
              className="md:hidden relative z-50 p-2 text-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} className={forceDarkHeader ? 'text-white' : ((isScrolled || isMenuOpen) ? 'text-dark' : 'text-white')} />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden"
              >
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-serif font-bold text-dark hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-8 py-3 border-2 border-dark text-dark font-bold uppercase tracking-widest text-sm hover:bg-dark hover:text-white transition-colors"
                >
                  {t?.nav?.login ?? 'Login'}
                </Link>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    onBookClick?.();
                  }}
                  className="mt-4 px-8 py-3 bg-gold text-dark font-bold uppercase tracking-widest text-sm hover:bg-gold-hover transition-colors">
                  {t.nav.book}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}
    </>
  );
};

export default Header;

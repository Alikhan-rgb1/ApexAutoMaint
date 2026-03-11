"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onBookClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Banner - Sleek Dark */}
      <div className="bg-dark text-white text-[10px] uppercase tracking-widest py-2 hidden md:block border-b border-white/10">
        <div className="container flex justify-between items-center">
          <span className="opacity-80">24/7 Concierge Service & Free Pickup/Delivery | ISO 9001 Certified</span>
          <div className="flex items-center gap-4">
            <a href="tel:+971501234567" className="hover:text-gold transition-colors flex items-center gap-2">
              <Phone size={12} /> +971 50 123 4567
            </a>
            <div className="h-3 w-px bg-white/20"></div>
            <button className="hover:text-gold transition-colors font-bold">EN</button>
            <button className="opacity-50 hover:opacity-100 hover:text-gold transition-colors">AR</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen 
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-gray-100' 
            : 'bg-transparent py-6 md:top-8'
        }`}
      >
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50 group">
            <span className={`font-serif text-2xl md:text-3xl font-black tracking-tight transition-colors duration-300 ${
              isScrolled || isMenuOpen ? 'text-dark' : 'text-white'
            }`}>
              ApexAuto<span className="text-gold">Maint</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-xs font-medium uppercase tracking-widest hover:text-gold transition-colors relative group ${
                  isScrolled ? 'text-dark-lighter' : 'text-gray-200'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <button 
              onClick={onBookClick}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
              isScrolled 
                ? 'border-dark text-dark hover:bg-dark hover:text-white' 
                : 'border-gold text-gold hover:bg-gold hover:text-dark'
            }`}>
              Book Appointment
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? 'text-dark' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
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
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onBookClick?.();
                }}
                className="mt-4 px-8 py-3 bg-gold text-dark font-bold uppercase tracking-widest text-sm hover:bg-gold-hover transition-colors">
                Book Appointment
              </button>
              
              <div className="absolute bottom-10 flex gap-6 text-dark opacity-50">
                <span className="text-sm">EN</span>
                <span className="text-sm">AR</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;

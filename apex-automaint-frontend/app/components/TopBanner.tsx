"use client";
import React from 'react';
import { Phone } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function TopBanner() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-dark text-white text-[10px] uppercase tracking-widest py-2 border-b border-white/10">
      <div className="container flex justify-between items-center gap-4">
        <span className="opacity-80 truncate">
          ALWAKEEL AUTO MAINT | Диагностика, кузовной ремонт, покраска и механический сервис
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <a href="tel:+971523524196" className="hover:text-gold transition-colors flex items-center gap-2">
            <Phone size={12} /> +971523524196
          </a>
          <div className="h-3 w-px bg-white/20" />
          <a href="tel:+971522581990" className="hover:text-gold transition-colors flex items-center gap-2">
            <Phone size={12} /> +971 52 258 1990
          </a>
          <div className="h-3 w-px bg-white/20" />
          <button
            onClick={() => setLanguage('en')}
            className={`transition-colors font-bold ${language === 'en' ? 'text-gold' : 'opacity-50 hover:opacity-100'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`transition-colors font-bold ${language === 'ar' ? 'text-gold' : 'opacity-50 hover:opacity-100'}`}
          >
            AR
          </button>
          <button
            onClick={() => setLanguage('ru')}
            className={`transition-colors font-bold ${language === 'ru' ? 'text-gold' : 'opacity-50 hover:opacity-100'}`}
          >
            RU
          </button>
        </div>
      </div>
    </div>
  );
}

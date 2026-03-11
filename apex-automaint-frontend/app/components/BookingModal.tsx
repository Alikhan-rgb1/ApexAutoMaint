"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, FileText, CheckCircle } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { t, dir } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        onClose();
        setFormState('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
            dir={dir}
          >
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative">
              
              {/* Header */}
              <div className="bg-dark p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">{t.modal.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{t.modal.subtitle}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {formState === 'success' ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={40} className="text-green-600" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-dark mb-2">{t.modal.successTitle}</h4>
                    <p className="text-gray-500">{t.modal.successDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User size={16} className="text-gold" /> {t.modal.name}
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder={t.modal.namePh}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Phone size={16} className="text-gold" /> {t.modal.phone}
                        </label>
                        <input 
                          required
                          type="tel" 
                          placeholder={t.modal.phonePh}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Calendar size={16} className="text-gold" /> {t.modal.date}
                        </label>
                        <input 
                          required
                          type="date" 
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <FileText size={16} className="text-gold" /> {t.modal.service}
                      </label>
                      <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all bg-white">
                        <option>{t.modal.serviceOptions.general}</option>
                        <option>{t.modal.serviceOptions.oil}</option>
                        <option>{t.modal.serviceOptions.brake}</option>
                        <option>{t.modal.serviceOptions.engine}</option>
                        <option>{t.modal.serviceOptions.body}</option>
                        <option>{t.modal.serviceOptions.other}</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full py-4 bg-gold text-dark font-bold uppercase tracking-widest text-sm hover:bg-dark hover:text-white transition-all duration-300 rounded-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formState === 'submitting' ? t.modal.processing : t.modal.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

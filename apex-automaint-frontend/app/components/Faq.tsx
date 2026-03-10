"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What makes you different from other garages?",
    answer: "We are an ISO 9001 certified garage with a focus on quality, transparency, and customer convenience. Our 24/7 concierge service and approval from all major insurance companies set us apart."
  },
  {
    question: "Do you offer any warranty on your repairs?",
    answer: "Yes, we provide a warranty on all parts and labor. The duration of the warranty depends on the nature of the repair and the parts used, typically ranging from 6 to 12 months."
  },
  {
    question: "How does the free pickup and delivery work?",
    answer: "Simply book an appointment, and our concierge team will arrange to pick up your vehicle from your location in Dubai or Sharjah, and deliver it back to you after the service is complete."
  },
  {
    question: "Are your technicians certified?",
    answer: "Absolutely. Our team consists of highly trained and certified technicians with expertise in various car makes and models, ensuring your vehicle receives the best care."
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-light-bg relative">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Got Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Find answers to common questions about our services and policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
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
                  {faq.question}
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
                      {faq.answer}
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

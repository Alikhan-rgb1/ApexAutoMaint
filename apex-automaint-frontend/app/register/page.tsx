"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const subtitle =
    language === 'ru'
      ? 'Создайте личный кабинет'
      : language === 'ar'
        ? 'أنشئ حسابك'
        : 'Create your account';

  const nameLabel =
    language === 'ru'
      ? 'Имя'
      : language === 'ar'
        ? 'الاسم'
        : 'Full Name';

  const phoneLabel =
    language === 'ru'
      ? 'Телефон'
      : language === 'ar'
        ? 'الهاتف'
        : 'Phone';

  const emailLabel =
    language === 'ru'
      ? 'Email'
      : language === 'ar'
        ? 'البريد الإلكتروني'
        : 'Email';

  const passwordLabel =
    language === 'ru'
      ? 'Пароль'
      : language === 'ar'
        ? 'كلمة المرور'
        : 'Password';

  const haveAccount =
    language === 'ru'
      ? 'Уже есть аккаунт?'
      : language === 'ar'
        ? 'لديك حساب بالفعل؟'
        : 'Already have an account?';

  return (
    <>
      <Header forceDarkHeader showTopBannerOnMobile />
      <main className="min-h-screen bg-dark text-white pt-28 pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div className="bg-dark-lighter border border-white/10 shadow-2xl rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                  {t.nav.register}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-black text-white mb-3">
                {t.nav.register}
              </h1>
              <p className="text-gray-400 text-sm mb-10">
                {subtitle}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {nameLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder={t.contact.form.namePh}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      {phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                      placeholder={t.contact.form.phonePh}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      {emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {passwordLabel}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-dark font-bold uppercase tracking-widest text-sm py-4 rounded-lg hover:bg-white transition-colors"
                >
                  {t.nav.register}
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="text-sm text-gray-400">
                  {haveAccount}
                </span>
                <Link
                  href="/login"
                  className="inline-block px-5 py-2.5 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
                >
                  {t.nav.login}
                </Link>
              </div>
            </div>

            <div className="hidden lg:block rounded-2xl overflow-hidden border border-white/10 relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
              <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  ApexAutoMaint
                </div>
                <div className="text-3xl font-serif font-black leading-tight mb-4">
                  Start your journey, <br /> with premium care.
                </div>
                <div className="text-sm text-gray-300 max-w-sm">
                  Create an account to manage bookings and receive service updates.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

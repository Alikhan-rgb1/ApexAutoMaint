"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../lib/api';
import axios from 'axios';

type RegisterResponse = {
  accessToken?: string;
};

function getErrorMessage(e: unknown, fallback: string) {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data;
    if (typeof data === 'string') return data;
    if (typeof data === 'object' && data !== null) {
      const msg = (data as { message?: unknown }).message;
      if (typeof msg === 'string') return msg;
      if (Array.isArray(msg) && msg.every((v) => typeof v === 'string'))
        return msg.join(', ');
      const error = (data as { error?: unknown }).error;
      if (typeof error === 'string') return error;
    }
  }
  return fallback;
}

export default function RegisterPage() {
  const { t, language } = useLanguage();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

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

  const backLabel =
    language === 'ru'
      ? 'Назад'
      : language === 'ar'
        ? 'رجوع'
        : 'Back';

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
                ref={formRef}
                onSubmit={async (e) => {
                  e.preventDefault();
                  setStatus('submitting');
                  setErrorText('');
                  try {
                    const payload = {
                      name,
                      phone,
                      email,
                      password,
                    };
                    const res = await api.post('/auth/register', payload);
                    const data = res.data as RegisterResponse;
                    if (data.accessToken) localStorage.setItem('auth_token', data.accessToken);
                    setStatus('success');
                    setTimeout(() => {
                      window.location.href = '/portal/dashboard';
                    }, 1000);
                  } catch (e: unknown) {
                    setStatus('error');
                    setErrorText(getErrorMessage(e, 'Registration failed'));
                  }
                }}
                className="space-y-6"
              >
                {status === 'success' ? (
                  <div className="bg-dark border border-gold/30 rounded-xl p-6">
                    <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
                      Done
                    </div>
                    <div className="text-white font-serif font-bold text-2xl mb-2">
                      {t.nav.register}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {language === 'ru'
                        ? 'Мы получили данные. Скоро подключим полноценную регистрацию.'
                        : language === 'ar'
                          ? 'تم استلام البيانات. سنقوم بتفعيل التسجيل الكامل قريبًا.'
                          : 'We received your details. Full registration will be enabled soon.'}
                    </div>
                  </div>
                ) : status === 'error' ? (
                  <div className="bg-dark border border-red-500/30 rounded-xl p-6">
                    <div className="text-red-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                      Error
                    </div>
                    <div className="text-white font-serif font-bold text-2xl mb-2">
                      {t.nav.register}
                    </div>
                    <div className="text-red-200 text-sm">
                      {errorText}
                    </div>
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          setErrorText('');
                        }}
                        className="w-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm py-4 rounded-lg hover:border-gold hover:text-gold transition-colors"
                      >
                        {backLabel}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const ok = formRef.current?.reportValidity() ?? true;
                          if (!ok) return;
                          setStatus('idle');
                        }}
                        className="w-full bg-gold text-dark font-bold uppercase tracking-widest text-sm py-4 rounded-lg hover:bg-white transition-colors"
                      >
                        {t.nav.register}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
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
                          required
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
                      disabled={status === 'submitting'}
                      className="w-full bg-gold text-dark font-bold uppercase tracking-widest text-sm py-4 rounded-lg hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {t.nav.register}
                    </button>
                  </>
                )}
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

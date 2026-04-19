"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../lib/api';
import axios from 'axios';

type LoginResponse = {
  accessToken?: string;
  user?: { role?: 'client' | 'mechanic' | 'admin' };
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

export default function LoginPage() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const subtitle =
    language === 'ru'
      ? 'Вход в личный кабинет'
      : language === 'ar'
        ? 'تسجيل الدخول إلى حسابك'
        : 'Sign in to your account';

  const fieldLabel =
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

  const noAccount =
    language === 'ru'
      ? 'Нет аккаунта?'
      : language === 'ar'
        ? 'ليس لديك حساب؟'
        : 'No account?';

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
                  {t.nav.login}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-black text-white mb-3">
                {t.nav.login}
              </h1>
              <p className="text-gray-400 text-sm mb-10">
                {subtitle}
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setStatus('submitting');
                  setErrorText('');
                  try {
                    const res = await api.post('/auth/login', { email, password });
                    const data = res.data as LoginResponse;
                    if (data.accessToken) localStorage.setItem('auth_token', data.accessToken);
                    const role = data.user?.role;
                    if (role === 'admin') {
                      window.location.href = '/admin/dashboard';
                    } else if (role === 'mechanic') {
                      window.location.href = '/admin/orders';
                    } else {
                      window.location.href = '/portal/dashboard';
                    }
                  } catch (e: unknown) {
                    setStatus('error');
                    setErrorText(getErrorMessage(e, 'Login failed'));
                  } finally {
                    setStatus((prev) => (prev === 'error' ? 'error' : 'idle'));
                  }
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {fieldLabel}
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
                  {t.nav.login}
                </button>
              </form>
              {status === 'error' && (
                <div className="mt-4 text-sm text-red-300 text-center">
                  {errorText}
                </div>
              )}

              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="text-sm text-gray-400">
                  {noAccount}
                </span>
                <Link
                  href="/register"
                  className="inline-block px-5 py-2.5 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
                >
                  {t.nav.register}
                </Link>
              </div>
            </div>

            <div className="hidden lg:block rounded-2xl overflow-hidden border border-white/10 relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
              <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  ALWAKEEL AUTO MAINT
                </div>
                <div className="text-3xl font-serif font-black leading-tight mb-4">
                  Trusted service, <br /> modern precision.
                </div>
                <div className="text-sm text-gray-300 max-w-sm">
                  Book service, track progress, and manage your vehicles in one secure portal.
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

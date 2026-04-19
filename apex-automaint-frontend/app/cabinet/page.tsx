"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

type MeResponse =
  | { user: { id: string; email: string; name: string; phone: string; carMake: string | null; carModel: string | null; carYear: number | null; serviceType: string | null; createdAt: string } }
  | { error?: string; message?: string };

export default function CabinetPage() {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'loading' | 'ready' | 'unauthorized' | 'error'>('loading');
  const [data, setData] = useState<MeResponse | null>(null);

  const title =
    language === 'ru' ? 'Личный кабинет' : language === 'ar' ? 'لوحة الحساب' : 'Cabinet';

  const subtitle =
    language === 'ru'
      ? 'Профиль и данные автомобиля'
      : language === 'ar'
        ? 'الملف الشخصي وبيانات السيارة'
        : 'Profile and vehicle details';

  const logoutLabel =
    language === 'ru' ? 'Выйти' : language === 'ar' ? 'تسجيل الخروج' : 'Logout';

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setTimeout(() => setStatus('unauthorized'), 0);
      return;
    }
    fetch('/api/auth/me', {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
      .then(async (res) => {
        const json = (await res.json().catch(() => null)) as MeResponse | null;
        if (!res.ok) {
          if (res.status === 401) {
            setStatus('unauthorized');
            return;
          }
          setStatus('error');
          setData(json);
          return;
        }
        setData(json);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <>
      <Header showTopBannerOnMobile hideMainHeader />
      <main className="min-h-screen bg-dark text-white pt-20 pb-16">
        <div className="container">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
                ALWAKEEL AUTO MAINT
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-black">
                {title}
              </h1>
              <div className="text-gray-400 text-sm mt-2">
                {subtitle}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
              }}
              className="px-6 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
            >
              {logoutLabel}
            </button>
          </div>

          {status === 'loading' && (
            <div className="bg-dark-lighter border border-white/10 rounded-2xl p-8 text-gray-300">
              Loading...
            </div>
          )}

          {status === 'unauthorized' && (
            <div className="bg-dark-lighter border border-white/10 rounded-2xl p-8">
              <div className="text-white font-serif font-bold text-2xl mb-3">
                {language === 'ru' ? 'Нужно войти' : language === 'ar' ? 'يلزم تسجيل الدخول' : 'Login required'}
              </div>
              <div className="text-gray-400 text-sm mb-6">
                {language === 'ru'
                  ? 'Пожалуйста, войдите в кабинет, чтобы увидеть профиль.'
                  : language === 'ar'
                    ? 'يرجى تسجيل الدخول لعرض الملف الشخصي.'
                    : 'Please login to view your profile.'}
              </div>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
              >
                {language === 'ru' ? 'Войти' : language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-dark-lighter border border-red-500/30 rounded-2xl p-8 text-red-200">
              {language === 'ru' ? 'Ошибка загрузки кабинета' : language === 'ar' ? 'خطأ في تحميل الحساب' : 'Failed to load cabinet'}
            </div>
          )}

          {status === 'ready' && data && 'user' in data && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-dark-lighter border border-white/10 rounded-2xl p-8">
                <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  {language === 'ru' ? 'Профиль' : language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {language === 'ru' ? 'Имя' : language === 'ar' ? 'الاسم' : 'Name'}
                    </div>
                    <div className="text-white font-medium">
                      {data.user.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {language === 'ru' ? 'Email' : language === 'ar' ? 'البريد' : 'Email'}
                    </div>
                    <div className="text-white font-medium">
                      {data.user.email}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {language === 'ru' ? 'Телефон' : language === 'ar' ? 'الهاتف' : 'Phone'}
                    </div>
                    <div className="text-white font-medium">
                      {data.user.phone}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {language === 'ru' ? 'ID' : language === 'ar' ? 'المعرف' : 'ID'}
                    </div>
                    <div className="text-white font-medium">
                      {data.user.id}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-lighter border border-white/10 rounded-2xl p-8">
                <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  {language === 'ru' ? 'Автомобиль' : language === 'ar' ? 'السيارة' : 'Vehicle'}
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {language === 'ru' ? 'Марка/Модель' : language === 'ar' ? 'الماركة/الموديل' : 'Make/Model'}
                    </div>
                    <div className="text-white font-medium">
                      {(data.user.carMake ?? '-') + ' ' + (data.user.carModel ?? '')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {language === 'ru' ? 'Год' : language === 'ar' ? 'السنة' : 'Year'}
                    </div>
                    <div className="text-white font-medium">
                      {data.user.carYear ?? '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {language === 'ru' ? 'Услуга' : language === 'ar' ? 'الخدمة' : 'Service'}
                    </div>
                    <div className="text-white font-medium">
                      {data.user.serviceType ?? '-'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 bg-dark-lighter border border-white/10 rounded-2xl p-8">
                <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  {language === 'ru' ? 'Быстрые действия' : language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/#services"
                    className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
                  >
                    {language === 'ru' ? 'Записаться' : language === 'ar' ? 'احجز' : 'Book'}
                  </Link>
                  <Link
                    href="/#contact"
                    className="px-6 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
                  >
                    {language === 'ru' ? 'Связаться' : language === 'ar' ? 'اتصل بنا' : 'Contact'}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

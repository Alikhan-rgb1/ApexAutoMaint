"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useLanguage } from '../context/LanguageContext';
import { useApiSWR } from '../lib/swr';

type MeResponse =
  | { user: { id: string; email: string; name: string; role?: string } }
  | { error?: string; message?: string };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();
  const { data, error, isLoading } = useApiSWR<MeResponse>('/auth/me');

  useEffect(() => {
    if (error) return;
    if (isLoading) return;
    if (!data || !('user' in data)) {
      router.replace('/login');
      return;
    }
    const role = data.user.role;
    if (role !== 'mechanic' && role !== 'admin') {
      router.replace('/portal/dashboard');
      return;
    }
    if (role === 'mechanic' && pathname.startsWith('/admin/dashboard')) {
      router.replace('/admin/orders');
    }
  }, [data, error, isLoading, pathname, router]);

  const role = data && 'user' in data ? data.user.role : undefined;
  const nav =
    role === 'admin'
      ? [
          { href: '/admin/dashboard', label: t.admin.nav.dashboard },
          { href: '/admin/orders', label: t.admin.nav.orders },
        ]
      : [{ href: '/admin/orders', label: t.admin.nav.orders }];

  return (
    <div className="min-h-screen bg-dark text-white pt-8">
      <div className="bg-dark border-b border-white/10">
        <div className="container py-4 flex items-center justify-between gap-6">
          <Link href="/" className="font-serif text-xl font-black text-white">
            {t.admin.brand}
          </Link>
          <nav className="flex items-center gap-2 overflow-x-auto">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-colors ${
                  pathname.startsWith(i.href)
                    ? 'border-gold text-gold'
                    : 'border-white/10 text-gray-200 hover:border-gold hover:text-gold'
                }`}
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('auth_token');
              router.replace('/login');
            }}
            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-200 hover:border-gold hover:text-gold transition-colors"
          >
            {t.admin.nav.logout}
          </button>
        </div>
      </div>

      <div className="container py-8">
        {isLoading ? (
          <div className="bg-dark-lighter border border-white/10 rounded-2xl p-8">
            <div className="h-4 w-40 bg-white/10 rounded mb-4" />
            <div className="h-3 w-64 bg-white/10 rounded" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

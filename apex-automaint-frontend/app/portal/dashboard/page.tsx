"use client";
import React from 'react';
import Link from 'next/link';

import { useApiSWR } from '../../lib/swr';
import { useLanguage } from '../../context/LanguageContext';
import { getLocale } from '../../lib/locale';

type User = { id: string; email: string; name: string; role?: string };
type MeResponse = { user: User };

type Vehicle = { id: string; make: string; model: string; year: number; vin: string | null; currentMileage: number };
type OrderItem = { id: string; serviceType: string; price: string; quantity: number };
type Order = {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: string;
  serviceDate: string;
  createdAt: string;
  vehicle?: Vehicle;
  items?: OrderItem[];
};
type Notification = {
  id: string;
  type: string;
  channel?: string;
  message: string;
  scheduledAt: string;
  createdAt?: string;
  isSent: boolean;
};

function formatDate(value: string, locale: string) {
  const d = new Date(value);
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: '2-digit' });
}

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const locale = getLocale(language);
  const me = useApiSWR<MeResponse>('/auth/me');
  const vehicles = useApiSWR<Vehicle[]>('/vehicles');
  const orders = useApiSWR<Order[]>('/service-orders');
  const notifications = useApiSWR<Notification[]>('/notifications/my');

  const userName = me.data?.user?.name ?? 'Client';
  const lastOrder = orders.data?.[0];
  const upcoming = (() => {
    const list = (notifications.data ?? []).filter((n) => !n.isSent);
    const inApp = list
      .filter((n) => (n.channel ?? '') === 'in_app')
      .sort((a, b) => {
        const aT = Date.parse(a.createdAt ?? a.scheduledAt);
        const bT = Date.parse(b.createdAt ?? b.scheduledAt);
        return bT - aT;
      });
    const other = list
      .filter((n) => (n.channel ?? '') !== 'in_app')
      .sort((a, b) => {
        const aT = Date.parse(a.scheduledAt);
        const bT = Date.parse(b.scheduledAt);
        return aT - bT;
      });
    return [...inApp, ...other].slice(0, 5);
  })();

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {t.portal.dashboard.portal}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black">
            {t.portal.dashboard.greeting.replace('{name}', userName)}
          </h1>
          <div className="text-gray-400 text-sm mt-2">
            {t.portal.dashboard.subtitle}
          </div>
        </div>
        <Link
          href="/#contact"
          className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
        >
          {t.portal.dashboard.bookService}
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.portal.dashboard.vehiclesTitle}
          </div>
          {vehicles.isLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-24 rounded-xl bg-white/10" />
              <div className="h-24 rounded-xl bg-white/10" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {(vehicles.data ?? []).slice(0, 4).map((v) => (
                <Link
                  key={v.id}
                  href={`/portal/vehicles/${v.id}`}
                  className="border border-white/10 rounded-xl p-4 hover:border-gold transition-colors"
                >
                  <div className="text-white font-semibold">
                    {v.make} {v.model}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    {v.year} • {v.currentMileage.toLocaleString(locale)} км
                  </div>
                </Link>
              ))}
              <Link
                href="/portal/vehicles"
                className="border border-white/10 rounded-xl p-4 text-gray-200 hover:border-gold hover:text-gold transition-colors flex items-center justify-between"
              >
                <span className="text-sm font-bold uppercase tracking-widest">
                  {t.portal.common.viewAll}
                </span>
                <span className="text-gold">→</span>
              </Link>
            </div>
          )}
        </div>

        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.portal.dashboard.lastVisit}
          </div>
          {orders.isLoading ? (
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded w-40" />
              <div className="h-3 bg-white/10 rounded w-56" />
              <div className="h-3 bg-white/10 rounded w-24" />
            </div>
          ) : lastOrder ? (
            <div className="space-y-3">
              <div className="text-white font-semibold">
                {formatDate(lastOrder.serviceDate ?? lastOrder.createdAt, locale)}
              </div>
              <div className="text-gray-400 text-sm">
                {(lastOrder.items ?? []).slice(0, 2).map((i) => i.serviceType).join(', ') || 'Service order'}
              </div>
              <div className="text-gold font-bold">
                {Number(lastOrder.totalPrice).toLocaleString(locale, { style: 'currency', currency: 'AED' })}
              </div>
              <Link
                href={`/portal/orders/${lastOrder.id}`}
                className="inline-block mt-2 text-xs font-bold uppercase tracking-widest border border-white/10 rounded px-4 py-2 hover:border-gold hover:text-gold transition-colors"
              >
                {t.portal.common.details}
              </Link>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              {t.portal.dashboard.noOrders}
            </div>
          )}
        </div>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-6 mb-4">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
            {t.portal.dashboard.reminders}
          </div>
          <Link
            href="/portal/orders"
            className="text-xs font-bold uppercase tracking-widest text-gray-200 hover:text-gold transition-colors"
          >
            {t.portal.dashboard.allOrders}
          </Link>
        </div>
        {notifications.isLoading ? (
          <div className="space-y-3">
            <div className="h-10 bg-white/10 rounded" />
            <div className="h-10 bg-white/10 rounded" />
          </div>
        ) : upcoming.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {upcoming.map((n) => (
              <div key={n.id} className="border border-white/10 rounded-xl p-4">
                <div className="text-white font-semibold">
                  {formatDate(
                    n.channel === 'in_app'
                      ? n.createdAt ?? n.scheduledAt
                      : n.scheduledAt,
                    locale,
                  )}
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  {n.message}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            {t.portal.dashboard.noNotifications}
          </div>
        )}
      </div>
    </div>
  );
}

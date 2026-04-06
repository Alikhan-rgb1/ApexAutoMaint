"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';

import { useLanguage } from '../../context/LanguageContext';
import { getLocale } from '../../lib/locale';
import { useApiSWR } from '../../lib/swr';

type Vehicle = { id: string; make: string; model: string; year: number };
type User = { id: string; name: string; email: string; phone: string };
type OrderItem = { id: string; serviceType: string };
type Order = {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: string;
  serviceDate: string;
  createdAt: string;
  user?: User;
  vehicle?: Vehicle;
  items?: OrderItem[];
};

function formatDate(value: string, locale: string) {
  return new Date(value).toLocaleDateString(locale, { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function badge(status: Order['status']) {
  switch (status) {
    case 'pending':
      return 'bg-white/10 text-gray-200';
    case 'in_progress':
      return 'bg-blue-500/20 text-blue-200';
    case 'completed':
      return 'bg-green-500/20 text-green-200';
    case 'cancelled':
      return 'bg-red-500/20 text-red-200';
    default:
      return 'bg-white/10 text-gray-200';
  }
}

export default function AdminOrdersPage() {
  const { t, language } = useLanguage();
  const locale = getLocale(language);
  const { data, isLoading } = useApiSWR<Order[]>('/service-orders');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.max(1, Math.ceil((data?.length ?? 0) / pageSize));
  const rows = useMemo(() => (data ?? []).slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize), [data, page]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {t.admin.brand}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black">
            {t.admin.orders.title}
          </h1>
          <div className="text-gray-400 text-sm mt-2">
            {t.admin.orders.subtitle}
          </div>
        </div>
        <Link
          href="/admin/orders/new"
          className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
        >
          {t.admin.orders.createOrder}
        </Link>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full">
            <thead className="bg-dark border-b border-white/10">
              <tr className="text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-4">{t.admin.orders.date}</th>
                <th className="px-6 py-4">{t.admin.orders.client}</th>
                <th className="px-6 py-4">{t.admin.orders.vehicle}</th>
                <th className="px-6 py-4">{t.admin.orders.status}</th>
                <th className="px-6 py-4 text-right">{t.admin.orders.total}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-6 py-5"><div className="h-3 bg-white/10 rounded w-28" /></td>
                    <td className="px-6 py-5"><div className="h-3 bg-white/10 rounded w-52" /></td>
                    <td className="px-6 py-5"><div className="h-3 bg-white/10 rounded w-44" /></td>
                    <td className="px-6 py-5"><div className="h-6 bg-white/10 rounded w-24" /></td>
                    <td className="px-6 py-5 text-right"><div className="h-3 bg-white/10 rounded w-24 ml-auto" /></td>
                  </tr>
                ))
              ) : rows.length > 0 ? (
                rows.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5 text-sm text-gray-200">
                      <Link href={`/admin/orders/${o.id}/edit`} className="hover:text-gold transition-colors">
                        {formatDate(o.serviceDate ?? o.createdAt, locale)}
                      </Link>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-200">
                      {o.user ? `${o.user.name} (${o.user.phone})` : '-'}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-200">
                      {o.vehicle ? `${o.vehicle.make} ${o.vehicle.model}` : '-'}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${badge(o.status)}`}>
                        {t.portal.status[o.status]}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right text-gold font-bold">
                      {Number(o.totalPrice).toLocaleString(locale, { style: 'currency', currency: 'AED' })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-8 text-gray-400 text-sm" colSpan={5}>
                    {t.admin.orders.noOrders}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-xs text-gray-400">
            {t.admin.orders.pageOf.replace('{page}', String(page)).replace('{total}', String(totalPages))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-200 hover:border-gold hover:text-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.admin.orders.back}
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-200 hover:border-gold hover:text-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.admin.orders.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

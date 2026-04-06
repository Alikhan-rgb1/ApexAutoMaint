"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useApiSWR } from '../../../lib/swr';
import { useLanguage } from '../../../context/LanguageContext';
import { getLocale } from '../../../lib/locale';

type Vehicle = { id: string; make: string; model: string; year: number };
type OrderItem = { id: string; serviceType: string; description: string; price: string; quantity: number; partName: string | null; partBrand: string | null };
type Order = {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: string;
  serviceDate: string;
  createdAt: string;
  mileageAtService: number;
  notes: string;
  vehicle?: Vehicle;
  items?: OrderItem[];
};

function formatDate(value: string, locale: string) {
  return new Date(value).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: '2-digit' });
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

export default function PortalOrderDetailsPage() {
  const { t, language } = useLanguage();
  const locale = getLocale(language);
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isLoading } = useApiSWR<Order>(id ? `/service-orders/${id}` : null);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {t.portal.order.title}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black">
            {t.portal.order.title}
          </h1>
          <div className="text-gray-400 text-sm mt-2">
            {data ? `№ ${data.id}` : 'Загрузка...'}
          </div>
        </div>
        <Link
          href="/portal/orders"
          className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
        >
          {t.portal.common.back}
        </Link>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 w-56 bg-white/10 rounded" />
            <div className="h-4 w-72 bg-white/10 rounded" />
          </div>
        ) : data ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {t.portal.orders.date}
              </div>
              <div className="text-white font-medium">{formatDate(data.serviceDate ?? data.createdAt, locale)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {t.portal.orders.status}
              </div>
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${badge(data.status)}`}>
                {t.portal.status[data.status]}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {t.portal.orders.vehicle}
              </div>
              <div className="text-white font-medium">
                {data.vehicle ? `${data.vehicle.make} ${data.vehicle.model} (${data.vehicle.year})` : '-'}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {t.portal.order.mileageAtService}
              </div>
              <div className="text-white font-medium">{data.mileageAtService.toLocaleString(locale)} км</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            {t.portal.order.notFound}
          </div>
        )}
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
          {t.portal.order.workItems}
        </div>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-12 bg-white/10 rounded" />
            <div className="h-12 bg-white/10 rounded" />
          </div>
        ) : data && (data.items ?? []).length > 0 ? (
          <div className="space-y-3">
            {(data.items ?? []).map((i) => (
              <div key={i.id} className="border border-white/10 rounded-xl p-4 flex items-start justify-between gap-6">
                <div>
                  <div className="text-white font-semibold">
                    {i.serviceType}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    {i.description}
                  </div>
                  {(i.partName || i.partBrand) && (
                    <div className="text-gray-500 text-xs mt-2">
                      {i.partBrand ? `${i.partBrand} ` : ''}{i.partName ?? ''}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-gold font-bold">
                    {Number(i.price).toLocaleString(locale, { style: 'currency', currency: 'AED' })}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    × {i.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            {t.portal.order.noItems}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.portal.order.mechanicNotes}
          </div>
          <div className="text-gray-300 text-sm whitespace-pre-wrap">
            {data?.notes ?? '-'}
          </div>
        </div>
        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.portal.order.total}
          </div>
          <div className="text-2xl font-serif font-black text-white">
            {data ? Number(data.totalPrice).toLocaleString(locale, { style: 'currency', currency: 'AED' }) : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

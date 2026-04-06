"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { useLanguage } from '../../../../context/LanguageContext';
import { api } from '../../../../lib/api';
import { useApiSWR } from '../../../../lib/swr';

type Vehicle = { id: string; make: string; model: string; year: number };
type User = { id: string; name: string; email: string; phone: string };
type Order = {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: string;
  serviceDate: string;
  createdAt: string;
  mileageAtService: number;
  notes: string;
  user?: User;
  vehicle?: Vehicle;
};

export default function AdminOrderEditPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isLoading, mutate } = useApiSWR<Order>(id ? `/service-orders/${id}` : null);
  const { t, language } = useLanguage();
  void language;

  const [status, setStatus] = useState<Order['status']>('pending');
  const [notes, setNotes] = useState('');
  const [mileageAtService, setMileageAtService] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!data) return;
    setStatus(data.status);
    setNotes(data.notes ?? '');
    setMileageAtService(String(data.mileageAtService ?? ''));
    setServiceDate(data.serviceDate ? new Date(data.serviceDate).toISOString().slice(0, 16) : '');
    setTotalPrice(String(data.totalPrice ?? ''));
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {t.admin.brand}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black">
            {t.admin.editOrder.title}
          </h1>
          <div className="text-gray-400 text-sm mt-2">
            {data ? `№ ${data.id}` : '...'}
          </div>
        </div>
        <Link
          href="/admin/orders"
          className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
        >
          {t.admin.editOrder.back}
        </Link>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 w-52 bg-white/10 rounded" />
            <div className="h-4 w-64 bg-white/10 rounded" />
          </div>
        ) : data ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">{t.admin.editOrder.client}</div>
              <div className="text-white font-medium">
                {data.user ? `${data.user.name} (${data.user.phone})` : '-'}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">{t.admin.editOrder.vehicle}</div>
              <div className="text-white font-medium">
                {data.vehicle ? `${data.vehicle.make} ${data.vehicle.model} (${data.vehicle.year})` : '-'}
              </div>
              {data.vehicle && (
                <Link
                  href={`/admin/vehicles/${data.vehicle.id}/tech`}
                  className="inline-block mt-3 text-xs font-bold uppercase tracking-widest border border-white/10 rounded px-4 py-2 hover:border-gold hover:text-gold transition-colors"
                >
                  {t.admin.editOrder.updateTechData}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-sm">{t.admin.editOrder.notFound}</div>
        )}
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.editOrder.status}</div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Order['status'])}
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-gold"
            >
              <option value="pending" className="bg-dark">{t.portal.status.pending}</option>
              <option value="in_progress" className="bg-dark">{t.portal.status.in_progress}</option>
              <option value="completed" className="bg-dark">{t.portal.status.completed}</option>
              <option value="cancelled" className="bg-dark">{t.portal.status.cancelled}</option>
            </select>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.editOrder.serviceDate}</div>
            <input
              type="datetime-local"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.editOrder.mileage}</div>
            <input
              type="number"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={mileageAtService}
              onChange={(e) => setMileageAtService(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.editOrder.total}</div>
            <input
              type="number"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.editOrder.notes}</div>
          <textarea
            className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold min-h-[140px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={async () => {
              if (!id) return;
              setSubmitting(true);
              try {
                await api.put(`/service-orders/${id}`, {
                  status,
                  notes,
                  mileageAtService: mileageAtService ? Number(mileageAtService) : undefined,
                  totalPrice: totalPrice ? String(Number(totalPrice).toFixed(2)) : undefined,
                  serviceDate: serviceDate ? new Date(serviceDate).toISOString() : undefined,
                });
                toast.success(t.admin.editOrder.saved);
                await mutate();
              } catch {
                toast.error(t.admin.editOrder.saveFailed);
              } finally {
                setSubmitting(false);
              }
            }}
            className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {t.admin.editOrder.save}
          </button>
        </div>
      </div>
    </div>
  );
}

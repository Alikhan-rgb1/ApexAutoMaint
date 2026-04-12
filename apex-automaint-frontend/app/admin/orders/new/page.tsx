"use client";
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { useLanguage } from '../../../context/LanguageContext';
import { getLocale } from '../../../lib/locale';
import { api } from '@/app/lib/api';
import { useApiSWR } from '../../../lib/swr';

type ItemDraft = {
  serviceType: string;
  description: string;
  partName?: string;
  partBrand?: string;
  price: string;
  quantity: number;
};

type User = { id: string; name: string; phone: string; email: string; role: string };
type Vehicle = { id: string; make: string; model: string; year: number; vin: string | null; currentMileage: number };

function getErrorMessage(e: unknown, fallback: string) {
  const err = e as { response?: { data?: unknown } } | null | undefined;
  const data = err?.response?.data;
  if (typeof data === 'string') return data;
  if (typeof data === 'object' && data !== null) {
    const msg = (data as { message?: unknown }).message;
    if (typeof msg === 'string') return msg;
    if (Array.isArray(msg) && msg.every((v) => typeof v === 'string')) return msg.join(', ');
    const error = (data as { error?: unknown }).error;
    if (typeof error === 'string') return error;
  }
  return fallback;
}

export default function AdminNewOrderPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const locale = getLocale(language);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [mileageAtService, setMileageAtService] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<ItemDraft[]>([
    { serviceType: '', description: '', price: '0', quantity: 1 },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const users = useApiSWR<User[]>(`/users${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`);
  const vehicles = useApiSWR<Vehicle[]>(
    selectedUserId ? `/vehicles/by-user/${selectedUserId}?onlyWithoutOrders=true` : null,
  );

  const totalPrice = useMemo(() => {
    const sum = items.reduce((acc, i) => acc + Number(i.price || 0) * Number(i.quantity || 1), 0);
    return sum.toFixed(2);
  }, [items]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
          {t.admin.brand}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-black">
          {t.admin.newOrder.title}
        </h1>
        <div className="text-gray-400 text-sm mt-2">
          {t.admin.newOrder.subtitle}
        </div>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {t.admin.newOrder.clientSearch}
            </div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.admin.newOrder.clientPlaceholder}
            />
            <div className="mt-3 space-y-2 max-h-56 overflow-auto pr-1">
              {users.isLoading ? (
                <div className="h-12 bg-white/10 rounded" />
              ) : (users.data ?? []).length > 0 ? (
                (users.data ?? []).slice(0, 20).map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setSelectedUserId(u.id);
                      setSelectedVehicleId('');
                    }}
                    className={`w-full text-left border rounded-xl p-3 transition-colors ${
                      selectedUserId === u.id
                        ? 'border-gold'
                        : 'border-white/10 hover:border-gold'
                    }`}
                  >
                    <div className="text-white font-semibold">
                      {u.name}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {u.phone} • {u.email}
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-gray-400 text-sm">
                  {t.admin.newOrder.noClients}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {t.admin.newOrder.vehiclesWithoutOrders}
            </div>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              disabled={!selectedUserId || vehicles.isLoading}
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-gold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-dark">
                {selectedUserId ? t.admin.newOrder.selectVehicle : t.admin.newOrder.selectClientFirst}
              </option>
              {(vehicles.data ?? []).map((v) => (
                <option key={v.id} value={v.id} className="bg-dark">
                  {v.make} {v.model} ({v.year})
                </option>
              ))}
            </select>
            {selectedUserId && !vehicles.isLoading && (vehicles.data ?? []).length === 0 && (
              <div className="text-gray-400 text-sm">
                {t.admin.newOrder.noVehiclesWithoutOrders}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.newOrder.serviceDate}</div>
            <input
              type="datetime-local"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.newOrder.mileage}</div>
            <input
              type="number"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={mileageAtService}
              onChange={(e) => setMileageAtService(e.target.value)}
              placeholder="50000"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
            {t.admin.newOrder.workItems}
          </div>
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div key={idx} className="border border-white/10 rounded-xl p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.newOrder.workType}</div>
                    <input
                      className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                      value={it.serviceType}
                      onChange={(e) => {
                        const v = e.target.value;
                        setItems((arr) => arr.map((x, i) => (i === idx ? { ...x, serviceType: v } : x)));
                      }}
                      placeholder={t.admin.newOrder.workTypePlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.newOrder.description}</div>
                    <input
                      className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                      value={it.description}
                      onChange={(e) => {
                        const v = e.target.value;
                        setItems((arr) => arr.map((x, i) => (i === idx ? { ...x, description: v } : x)));
                      }}
                      placeholder={t.admin.newOrder.descriptionPlaceholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.newOrder.price}</div>
                    <input
                      type="number"
                      className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                      value={it.price}
                      onChange={(e) => {
                        const v = e.target.value;
                        setItems((arr) => arr.map((x, i) => (i === idx ? { ...x, price: v } : x)));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.newOrder.qty}</div>
                    <input
                      type="number"
                      className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                      value={it.quantity}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setItems((arr) => arr.map((x, i) => (i === idx ? { ...x, quantity: v } : x)));
                      }}
                      min={1}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setItems((arr) => arr.filter((_, i) => i !== idx))}
                    className="px-4 py-2 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-red-400 hover:text-red-200 transition-colors"
                    disabled={items.length === 1}
                  >
                    {t.admin.newOrder.remove}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setItems((arr) => [...arr, { serviceType: '', description: '', price: '0', quantity: 1 }])}
            className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
          >
            {t.admin.newOrder.addWork}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.newOrder.notes}</div>
            <textarea
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold min-h-[110px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.admin.newOrder.commentPlaceholder}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.admin.editOrder.total}</div>
            <div className="bg-dark border border-white/10 rounded-lg px-4 py-4">
              <div className="text-gold font-black text-2xl font-serif">
                {Number(totalPrice).toLocaleString(locale, { style: 'currency', currency: 'AED' })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={async () => {
              if (!selectedUserId || !selectedVehicleId || !serviceDate || !mileageAtService) {
                toast.error(t.admin.newOrder.requiredFields);
                return;
              }
              const cleanItems = items.filter((i) => i.serviceType && i.description);
              if (cleanItems.length === 0) {
                toast.error(t.admin.newOrder.addAtLeastOne);
                return;
              }
              setSubmitting(true);
              try {
                const res = await api.post('/service-orders', {
                  userId: selectedUserId,
                  vehicleId: selectedVehicleId,
                  mileageAtService: Number(mileageAtService),
                  notes,
                  totalPrice,
                  serviceDate: new Date(serviceDate).toISOString(),
                  items: cleanItems.map((i) => ({
                    serviceType: i.serviceType,
                    description: i.description,
                    partName: i.partName,
                    partBrand: i.partBrand,
                    price: String(i.price),
                    quantity: i.quantity,
                  })),
                });
                toast.success(t.admin.newOrder.created);
                router.replace(`/admin/orders/${res.data.id}/edit`);
              } catch (e) {
                toast.error(getErrorMessage(e, t.admin.newOrder.createFailed));
              } finally {
                setSubmitting(false);
              }
            }}
            className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {t.admin.newOrder.create}
          </button>
          <button
            type="button"
            onClick={() => router.replace('/admin/orders')}
            className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
          >
            {t.admin.newOrder.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

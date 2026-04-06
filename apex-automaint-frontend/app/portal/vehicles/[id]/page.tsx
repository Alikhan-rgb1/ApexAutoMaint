"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { api } from '../../../lib/api';
import { useApiSWR } from '../../../lib/swr';
import { useLanguage } from '../../../context/LanguageContext';
import { getLocale } from '../../../lib/locale';

type Vehicle = { id: string; make: string; model: string; year: number; vin: string | null; currentMileage: number; createdAt: string };
type TechData = {
  id: string;
  oilBrand: string;
  oilViscosity: string;
  oilChangeMileage: number;
  oilNextChangeKm: number;
  transmissionType: string;
  transmissionOil: string;
  transmissionOilChangeMileage: number;
  tireSize: string;
  tireType: string;
  brakePadFrontMm: number;
  brakePadRearMm: number;
  airFilterBrand: string;
  cabinFilterBrand: string;
  updatedAt: string;
} | null;

type OrderItem = { id: string; serviceType: string; price: string; quantity: number };
type Order = {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: string;
  serviceDate: string;
  createdAt: string;
  mileageAtService: number;
  items?: OrderItem[];
};

type MeResponse = { user: { id: string; role?: 'client' | 'mechanic' | 'admin' } };

function formatDate(value: string, locale: string) {
  return new Date(value).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: '2-digit' });
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

export default function PortalVehicleDetailsPage() {
  const { t, language } = useLanguage();
  const locale = getLocale(language);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const vehicle = useApiSWR<Vehicle>(id ? `/vehicles/${id}` : null);
  const tech = useApiSWR<TechData>(id ? `/vehicles/${id}/tech-data` : null);
  const orders = useApiSWR<Order[]>(id ? `/service-orders/vehicle/${id}` : null);
  const me = useApiSWR<MeResponse>('/auth/me');

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    currentMileage: '',
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!vehicle.data) return;
    setForm({
      make: vehicle.data.make,
      model: vehicle.data.model,
      year: String(vehicle.data.year),
      vin: vehicle.data.vin ?? '',
      currentMileage: String(vehicle.data.currentMileage),
    });
  }, [vehicle.data]);

  const remaining = useMemo(() => {
    if (!vehicle.data || !tech.data) return null;
    const next = tech.data.oilChangeMileage + tech.data.oilNextChangeKm;
    return next - vehicle.data.currentMileage;
  }, [tech.data, vehicle.data]);

  const highlight = remaining !== null && remaining < 1000;

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {t.portal.vehicle.title}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black">
            {vehicle.data ? `${vehicle.data.make} ${vehicle.data.model}` : t.portal.vehicle.title}
          </h1>
          <div className="text-gray-400 text-sm mt-2">
            {vehicle.data ? `${vehicle.data.year} • ${vehicle.data.currentMileage.toLocaleString(locale)} км` : '...'}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsEditing((v) => !v)}
            disabled={vehicle.isLoading || !vehicle.data}
            className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isEditing ? t.portal.common.cancel : t.portal.vehicle.edit}
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!id) return;
              const ok = window.confirm(t.portal.vehicle.deleteConfirm);
              if (!ok) return;
              setDeleting(true);
              try {
                await api.delete(`/vehicles/${id}`);
                toast.success(t.portal.vehicle.vehicleDeleted);
                router.replace('/portal/vehicles');
              } catch {
                toast.error(t.portal.vehicle.deleteFailed);
              } finally {
                setDeleting(false);
              }
            }}
            disabled={deleting || vehicle.isLoading || !vehicle.data}
            className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-red-400 hover:text-red-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {t.portal.vehicle.delete}
          </button>
          <Link
            href="/portal/vehicles"
            className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
          >
            {t.portal.common.back}
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.portal.vehicle.basics}
          </div>
          {vehicle.isLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-64 bg-white/10 rounded" />
              <div className="h-4 w-40 bg-white/10 rounded" />
            </div>
          ) : vehicle.data ? (
            <>
              {isEditing ? (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t.portal.vehicles.make}
                      </div>
                      <input
                        className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                        value={form.make}
                        onChange={(e) => setForm((f) => ({ ...f, make: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t.portal.vehicles.model}
                      </div>
                      <input
                        className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                        value={form.model}
                        onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t.portal.vehicles.year}
                      </div>
                      <input
                        type="number"
                        className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                        value={form.year}
                        onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        {t.portal.vehicles.mileage} (km)
                      </div>
                      <input
                        type="number"
                        className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                        value={form.currentMileage}
                        onChange={(e) => setForm((f) => ({ ...f, currentMileage: e.target.value }))}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-400">VIN</div>
                      <input
                        className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
                        value={form.vin}
                        onChange={(e) => setForm((f) => ({ ...f, vin: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={async () => {
                        if (!id) return;
                        if (!form.make || !form.model || !form.year || !form.currentMileage) {
                          toast.error(t.portal.vehicle.fillFields);
                          return;
                        }
                        setSaving(true);
                        try {
                          await api.put(`/vehicles/${id}`, {
                            make: form.make,
                            model: form.model,
                            year: Number(form.year),
                            vin: form.vin ? form.vin : null,
                            currentMileage: Number(form.currentMileage),
                          });
                          toast.success(t.portal.vehicle.saved);
                          setIsEditing(false);
                          await vehicle.mutate();
                        } catch {
                          toast.error(t.portal.vehicle.saveFailed);
                        } finally {
                          setSaving(false);
                        }
                      }}
                      className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {t.portal.common.save}
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">{t.portal.vehicle.vin}</div>
                    <div className="text-white font-medium">{vehicle.data.vin ?? '-'}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {t.portal.vehicle.currentMileage}
                    </div>
                    <div className="text-white font-medium">{vehicle.data.currentMileage.toLocaleString(locale)} км</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-400 text-sm">
              {t.portal.order.notFound}
            </div>
          )}
        </div>

        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.portal.techData.title}
          </div>
          {tech.isLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-40 bg-white/10 rounded" />
              <div className="h-4 w-56 bg-white/10 rounded" />
            </div>
          ) : tech.data ? (
            <div className="space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t.portal.techData.oil}
                </div>
                <div className="text-white font-medium">
                  {tech.data.oilBrand} • {tech.data.oilViscosity}
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  {t.portal.vehicle.changedAt.replace('{value}', tech.data.oilChangeMileage.toLocaleString(locale))}
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  {t.portal.techData.nextOilChangeAt.replace(
                    '{value}',
                    (tech.data.oilChangeMileage + tech.data.oilNextChangeKm).toLocaleString(locale),
                  )}
                </div>
                <div className={`text-sm font-bold mt-1 ${highlight ? 'text-red-300' : 'text-gray-200'}`}>
                  {t.portal.vehicle.nextIn.replace('{value}', tech.data.oilNextChangeKm.toLocaleString(locale))}
                  {remaining !== null
                    ? ` (${t.portal.vehicle.left.replace('{value}', Math.max(remaining, 0).toLocaleString(locale))})`
                    : ''}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t.portal.techData.transmission}
                </div>
                <div className="text-gray-300 text-sm">
                  {t.portal.techData.transmissionType}: {tech.data.transmissionType}
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {t.portal.techData.transmissionOil}: {tech.data.transmissionOil}
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {t.portal.techData.transmissionOilChangeMileage}: {tech.data.transmissionOilChangeMileage.toLocaleString(locale)} км
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t.portal.techData.tires}
                </div>
                <div className="text-gray-300 text-sm">
                  {t.portal.techData.tireSize}: {tech.data.tireSize}
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {t.portal.techData.tireType}: {tech.data.tireType}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t.portal.techData.brakes}
                </div>
                <div className="text-gray-300 text-sm">
                  {t.portal.techData.brakePadFrontMm}: {tech.data.brakePadFrontMm.toLocaleString(locale)}
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {t.portal.techData.brakePadRearMm}: {tech.data.brakePadRearMm.toLocaleString(locale)}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t.portal.techData.filters}
                </div>
                <div className="text-gray-300 text-sm">
                  {t.portal.techData.airFilterBrand}: {tech.data.airFilterBrand}
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {t.portal.techData.cabinFilterBrand}: {tech.data.cabinFilterBrand}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              {t.portal.vehicle.techNotFilled}
            </div>
          )}

          {me.data?.user?.role && (me.data.user.role === 'mechanic' || me.data.user.role === 'admin') && (
            <Link
              href={`/admin/vehicles/${id}/tech`}
              className="inline-block mt-6 px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
            >
              {t.portal.vehicle.editTechData}
            </Link>
          )}
        </div>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-6 mb-4">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
            {t.portal.vehicle.ordersHistory}
          </div>
          <Link
            href="/portal/orders"
            className="text-xs font-bold uppercase tracking-widest text-gray-200 hover:text-gold transition-colors"
          >
            {t.portal.common.viewAll}
          </Link>
        </div>
        {orders.isLoading ? (
          <div className="space-y-3">
            <div className="h-12 bg-white/10 rounded" />
            <div className="h-12 bg-white/10 rounded" />
          </div>
        ) : (orders.data ?? []).length > 0 ? (
          <div className="space-y-3">
            {(orders.data ?? []).slice(0, 5).map((o) => (
              <Link
                key={o.id}
                href={`/portal/orders/${o.id}`}
                className="block border border-white/10 rounded-xl p-4 hover:border-gold transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-white font-semibold">
                      {formatDate(o.serviceDate ?? o.createdAt, locale)}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {(o.items ?? []).slice(0, 2).map((i) => i.serviceType).join(', ') || t.portal.order.title}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${badge(o.status)}`}>
                      {t.portal.status[o.status]}
                    </div>
                    <div className="text-gold font-bold mt-2">
                      {Number(o.totalPrice).toLocaleString(locale, { style: 'currency', currency: 'AED' })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            {t.portal.vehicle.noOrders}
          </div>
        )}
      </div>
    </div>
  );
}

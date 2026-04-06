"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { api } from '../../lib/api';
import { useApiSWR } from '../../lib/swr';
import { useLanguage } from '../../context/LanguageContext';
import { getLocale } from '../../lib/locale';

type Vehicle = { id: string; make: string; model: string; year: number; vin: string | null; currentMileage: number };

export default function PortalVehiclesPage() {
  const { t, language } = useLanguage();
  const locale = getLocale(language);
  const { data, isLoading, mutate } = useApiSWR<Vehicle[]>('/vehicles');
  const vehicles = useMemo(() => data ?? [], [data]);

  const [isAdding, setIsAdding] = useState(false);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [currentMileage, setCurrentMileage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {t.portal.vehicles.title}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black">
            {t.portal.vehicles.title}
          </h1>
          <div className="text-gray-400 text-sm mt-2">
            {t.portal.vehicles.subtitle}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding((v) => !v)}
          className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
        >
          {isAdding ? t.portal.common.close : t.portal.vehicles.addVehicle}
        </button>
      </div>

      {isAdding && (
        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.vehicles.make}</div>
              <input
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Toyota"
              />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.vehicles.model}</div>
              <input
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Camry"
              />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.vehicles.year}</div>
              <input
                type="number"
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2020"
              />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.vehicles.mileage}</div>
              <input
                type="number"
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                value={currentMileage}
                onChange={(e) => setCurrentMileage(e.target.value)}
                placeholder="50000"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.vehicles.vinOptional}</div>
              <input
                className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder="WBA..."
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={submitting}
              onClick={async () => {
                if (!make || !model || !year || !currentMileage) {
                  toast.error(t.portal.vehicles.fillAllFields);
                  return;
                }
                setSubmitting(true);
                try {
                  await api.post('/vehicles', {
                    make,
                    model,
                    year: Number(year),
                    vin: vin ? vin : undefined,
                    currentMileage: Number(currentMileage),
                  });
                  toast.success(t.portal.vehicles.vehicleAdded);
                  setIsAdding(false);
                  setMake('');
                  setModel('');
                  setYear('');
                  setVin('');
                  setCurrentMileage('');
                  await mutate();
                } catch {
                  toast.error(t.portal.vehicles.addFailed);
                } finally {
                  setSubmitting(false);
                }
              }}
              className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {t.portal.common.save}
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
            >
              {t.portal.common.cancel}
            </button>
          </div>
        </div>
      )}

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-24 rounded-xl bg-white/10" />
            <div className="h-24 rounded-xl bg-white/10" />
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="border border-white/10 rounded-xl p-4 hover:border-gold transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <Link href={`/portal/vehicles/${v.id}`} className="min-w-0">
                    <div className="text-white font-semibold truncate">
                      {v.make} {v.model}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {v.year} • {v.currentMileage.toLocaleString(locale)} км
                    </div>
                    {v.vin && (
                      <div className="text-gray-500 text-xs mt-2">
                        VIN: {v.vin}
                      </div>
                    )}
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      const ok = window.confirm(
                        t.portal.vehicle.deleteConfirm,
                      );
                      if (!ok) return;
                      try {
                        await api.delete(`/vehicles/${v.id}`);
                        toast.success(t.portal.vehicle.vehicleDeleted);
                        await mutate();
                      } catch {
                        toast.error(t.portal.vehicle.deleteFailed);
                      }
                    }}
                    className="shrink-0 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-200 hover:border-red-400 hover:text-red-200 transition-colors"
                  >
                    {t.portal.vehicle.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            {t.portal.vehicles.noVehicles}
          </div>
        )}
      </div>
    </div>
  );
}

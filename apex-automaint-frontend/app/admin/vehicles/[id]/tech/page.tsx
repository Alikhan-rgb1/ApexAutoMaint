"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { api } from '@/app/lib/api';
import { useApiSWR } from '../../../../lib/swr';
import { useLanguage } from '../../../../context/LanguageContext';
import { getLocale } from '../../../../lib/locale';

type Vehicle = { id: string; make: string; model: string; year: number; currentMileage: number };
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

export default function AdminVehicleTechPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { t, language } = useLanguage();
  const locale = getLocale(language);

  const vehicle = useApiSWR<Vehicle>(id ? `/vehicles/${id}` : null);
  const tech = useApiSWR<TechData>(id ? `/vehicles/${id}/tech-data` : null);

  const [form, setForm] = useState({
    oilBrand: '',
    oilViscosity: '',
    oilChangeMileage: '',
    oilNextChangeKm: '',
    transmissionType: '',
    transmissionOil: '',
    transmissionOilChangeMileage: '',
    tireSize: '',
    tireType: '',
    brakePadFrontMm: '',
    brakePadRearMm: '',
    airFilterBrand: '',
    cabinFilterBrand: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!tech.data) return;
    setForm({
      oilBrand: tech.data.oilBrand ?? '',
      oilViscosity: tech.data.oilViscosity ?? '',
      oilChangeMileage: String(tech.data.oilChangeMileage ?? ''),
      oilNextChangeKm: String(tech.data.oilNextChangeKm ?? ''),
      transmissionType: tech.data.transmissionType ?? '',
      transmissionOil: tech.data.transmissionOil ?? '',
      transmissionOilChangeMileage: String(tech.data.transmissionOilChangeMileage ?? ''),
      tireSize: tech.data.tireSize ?? '',
      tireType: tech.data.tireType ?? '',
      brakePadFrontMm: String(tech.data.brakePadFrontMm ?? ''),
      brakePadRearMm: String(tech.data.brakePadRearMm ?? ''),
      airFilterBrand: tech.data.airFilterBrand ?? '',
      cabinFilterBrand: tech.data.cabinFilterBrand ?? '',
    });
  }, [tech.data]);

  const nextOilMileage = useMemo(() => {
    const oilChange = Number(form.oilChangeMileage);
    const next = Number(form.oilNextChangeKm);
    if (!Number.isFinite(oilChange) || !Number.isFinite(next)) return null;
    return oilChange + next;
  }, [form.oilChangeMileage, form.oilNextChangeKm]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {t.admin.brand}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black">
            {t.portal.techData.title}
          </h1>
          <div className="text-gray-400 text-sm mt-2">
            {vehicle.data ? `${vehicle.data.make} ${vehicle.data.model} (${vehicle.data.year})` : '...'}
          </div>
        </div>
        <Link
          href="/admin/orders"
          className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
        >
          {t.portal.common.back}
        </Link>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.oilBrand}</div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.oilBrand}
              onChange={(e) => setForm((f) => ({ ...f, oilBrand: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.oilViscosity}</div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.oilViscosity}
              onChange={(e) => setForm((f) => ({ ...f, oilViscosity: e.target.value }))}
              placeholder="5W-30"
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.oilChangeMileage}</div>
            <input
              type="number"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.oilChangeMileage}
              onChange={(e) => setForm((f) => ({ ...f, oilChangeMileage: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.oilNextChangeKm}</div>
            <input
              type="number"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.oilNextChangeKm}
              onChange={(e) => setForm((f) => ({ ...f, oilNextChangeKm: e.target.value }))}
            />
            {nextOilMileage !== null && (
              <div className="text-gray-400 text-xs">
                {t.portal.techData.nextOilChangeAt.replace('{value}', nextOilMileage.toLocaleString(locale))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.transmissionType}</div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.transmissionType}
              onChange={(e) => setForm((f) => ({ ...f, transmissionType: e.target.value }))}
              placeholder="АКПП"
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.transmissionOil}</div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.transmissionOil}
              onChange={(e) => setForm((f) => ({ ...f, transmissionOil: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.transmissionOilChangeMileage}</div>
            <input
              type="number"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.transmissionOilChangeMileage}
              onChange={(e) => setForm((f) => ({ ...f, transmissionOilChangeMileage: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.tireSize}</div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.tireSize}
              onChange={(e) => setForm((f) => ({ ...f, tireSize: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.tireType}</div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.tireType}
              onChange={(e) => setForm((f) => ({ ...f, tireType: e.target.value }))}
              placeholder="лето"
            />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.brakePadFrontMm}</div>
            <input
              type="number"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.brakePadFrontMm}
              onChange={(e) => setForm((f) => ({ ...f, brakePadFrontMm: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.brakePadRearMm}</div>
            <input
              type="number"
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.brakePadRearMm}
              onChange={(e) => setForm((f) => ({ ...f, brakePadRearMm: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.airFilterBrand}</div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.airFilterBrand}
              onChange={(e) => setForm((f) => ({ ...f, airFilterBrand: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.portal.techData.cabinFilterBrand}</div>
            <input
              className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
              value={form.cabinFilterBrand}
              onChange={(e) => setForm((f) => ({ ...f, cabinFilterBrand: e.target.value }))}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={async () => {
              if (!id) return;
              const payload = {
                oilBrand: form.oilBrand,
                oilViscosity: form.oilViscosity,
                oilChangeMileage: Number(form.oilChangeMileage),
                oilNextChangeKm: Number(form.oilNextChangeKm),
                transmissionType: form.transmissionType,
                transmissionOil: form.transmissionOil,
                transmissionOilChangeMileage: Number(form.transmissionOilChangeMileage),
                tireSize: form.tireSize,
                tireType: form.tireType,
                brakePadFrontMm: Number(form.brakePadFrontMm),
                brakePadRearMm: Number(form.brakePadRearMm),
                airFilterBrand: form.airFilterBrand,
                cabinFilterBrand: form.cabinFilterBrand,
              };
              setSubmitting(true);
              try {
                await api.put(`/vehicles/${id}/tech-data`, payload);
                toast.success(t.admin.techData.saved);
                await tech.mutate();
              } catch {
                toast.error(t.admin.techData.saveFailed);
              } finally {
                setSubmitting(false);
              }
            }}
            className="px-6 py-3 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {t.portal.common.save}
          </button>
        </div>
      </div>
    </div>
  );
}

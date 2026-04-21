"use client";
import React, { useMemo, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { api } from '@/app/lib/api';
import { useApiSWR } from '../../lib/swr';
import { useLanguage } from '../../context/LanguageContext';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  vin?: string | null;
  currentMileage?: number;
};

type Lift = {
  id: string;
  name: string;
  group: string;
  status: string;
  workTime?: string | null;
  workType?: string | null;
  notes?: string | null;
  mechanic?: string | null;
  vehicleId?: string | null;
  vehicle?: { id: string; make: string; model: string; year: number } | null;
};

function getErrorText(error: unknown) {
  if (!error) return null;
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as unknown;
    const message =
      typeof data === 'string'
        ? data
        : typeof data === 'object' && data
          ? ((data as { message?: unknown; error?: unknown }).message ??
              (data as { message?: unknown; error?: unknown }).error ??
              null)
          : null;

    if (Array.isArray(message)) return message.join(', ');
    if (typeof message === 'string' && message.trim()) return message;
    if (typeof error.message === 'string' && error.message.trim())
      return status ? `${error.message} (${status})` : error.message;
    return status ? `Ошибка загрузки (${status})` : 'Ошибка загрузки';
  }
  if (error instanceof Error && error.message.trim()) return error.message;
  return 'Ошибка загрузки';
}

function getItemStatus(item: Lift) {
  const v = item.status ?? '';
  return v.toString().trim();
}

function fmt(v: string | null | undefined) {
  const s = (v ?? '').trim();
  return s ? s : '-';
}

function vehicleLabel(v: Vehicle) {
  return `${v.make} ${v.model} (${v.year})`;
}

const GROUP_ORDER = ['LIFT 1', 'LIFT 2', 'LIFT 3', 'PAINT BOOTH'] as const;

export default function AdminLiftsPage() {
  const { t } = useLanguage();
  const lifts = useApiSWR<Lift[]>('/lifts');
  const { data, isLoading, mutate } = lifts;
  const vehicles = useApiSWR<Vehicle[]>('/vehicles');

  const liftsErrorText = useMemo(() => {
    const swrErrorText = getErrorText(lifts.error);
    if (swrErrorText) return swrErrorText;
    return null;
  }, [lifts.error]);

  const items = useMemo(() => {
    return data ?? [];
  }, [data]);

  const groups = useMemo(() => {
    const buckets = new Map<string, Lift[]>();
    for (const item of items) {
      const key = (item.group ?? 'Other').toString().trim() || 'Other';
      const list = buckets.get(key) ?? [];
      list.push(item);
      buckets.set(key, list);
    }

    const ordered: Array<{ title: string; items: Lift[] }> = [];
    for (const name of GROUP_ORDER) {
      const list = buckets.get(name);
      if (list && list.length > 0) ordered.push({ title: name, items: list });
      buckets.delete(name);
    }
    for (const [title, list] of buckets) {
      ordered.push({ title, items: list });
    }
    return ordered;
  }, [items]);

  const [savingStatusId, setSavingStatusId] = useState<string | null>(null);
  const [savingCarId, setSavingCarId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [carDrafts, setCarDrafts] = useState<Record<string, string>>({});

  const vehicleOptions = useMemo(() => {
    const list = vehicles.data ? [...vehicles.data] : [];
    list.sort((a, b) => vehicleLabel(a).localeCompare(vehicleLabel(b)));
    return list;
  }, [vehicles.data]);

  const renderItem = (item: Lift) => {
    const currentStatus = getItemStatus(item);
    const value =
      drafts[item.id] !== undefined ? drafts[item.id] : currentStatus;
    const isSavingStatus = savingStatusId === item.id;
    const isSavingCar = savingCarId === item.id;
    const inferredVehicleId = item.vehicleId ?? '';
    const selectedVehicleId =
      carDrafts[item.id] !== undefined
        ? carDrafts[item.id]
        : inferredVehicleId || '';
    const carLabel = item.vehicle ? vehicleLabel(item.vehicle) : null;

    return (
      <div key={item.id} className="border border-white/10 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-white font-semibold truncate">{item.name}</div>
            <div className="text-gray-400 text-sm mt-1">
              {t.admin.lifts.status}: {currentStatus || '-'}
            </div>
            <div className="text-xs text-gray-500 mt-2 space-y-1">
              <div>
                {t.admin.lifts.workType}: {fmt(item.workType)}
                {' • '}
                {t.admin.lifts.workTime}: {fmt(item.workTime)}
              </div>
              <div>
                {t.admin.lifts.mechanic}: {fmt(item.mechanic)}
              </div>
              {(carLabel || item.notes) && (
                <div>
                  {carLabel ? `${t.admin.lifts.car}: ${carLabel}` : ''}
                  {carLabel && item.notes ? ' • ' : ''}
                  {item.notes ? `${t.admin.lifts.notes}: ${item.notes}` : ''}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full">
              <select
                value={selectedVehicleId}
                onChange={(e) =>
                  setCarDrafts((prev) => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }))
                }
                className="bg-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors w-full sm:w-64"
              >
                <option value="">{t.admin.lifts.selectCar}</option>
                {vehicleOptions.map((v) => (
                  <option key={v.id} value={v.id}>
                    {vehicleLabel(v)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={isSavingCar || vehicles.isLoading}
                onClick={async () => {
                  setSavingCarId(item.id);
                  try {
                    await api.put(`/lifts/${item.id}`, {
                      vehicleId: selectedVehicleId ? selectedVehicleId : null,
                    });
                    toast.success(t.admin.lifts.saved);
                    setCarDrafts((prev) => {
                      const copy = { ...prev };
                      delete copy[item.id];
                      return copy;
                    });
                    await mutate();
                  } catch {
                    toast.error(t.admin.lifts.saveFailed);
                  } finally {
                    setSavingCarId(null);
                  }
                }}
                className="px-4 py-2 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {t.admin.lifts.setCar}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full">
              <input
                value={value}
                onChange={(e) =>
                  setDrafts((prev) => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }))
                }
                placeholder={t.admin.lifts.setStatus}
                className="bg-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors w-full sm:w-64"
              />
              <button
                type="button"
                disabled={isSavingStatus}
                onClick={async () => {
                  const nextStatus = (drafts[item.id] ?? '').trim();
                  if (!nextStatus) return;
                  setSavingStatusId(item.id);
                  try {
                    await api.put(`/lifts/${item.id}`, { status: nextStatus });
                    toast.success(t.admin.lifts.saved);
                    setDrafts((prev) => {
                      const copy = { ...prev };
                      delete copy[item.id];
                      return copy;
                    });
                    await mutate();
                  } catch {
                    toast.error(t.admin.lifts.saveFailed);
                  } finally {
                    setSavingStatusId(null);
                  }
                }}
                className="px-4 py-2 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {t.admin.lifts.setStatus}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
          {t.admin.brand}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-black">
          {t.admin.lifts.title}
        </h1>
        <div className="text-gray-400 text-sm mt-2">
          {t.admin.lifts.subtitle}
        </div>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-10 rounded-xl bg-white/10" />
            <div className="h-10 rounded-xl bg-white/10" />
            <div className="h-10 rounded-xl bg-white/10" />
          </div>
        ) : liftsErrorText ? (
          <div className="text-red-200 text-sm">
            {liftsErrorText}
          </div>
        ) : items.length === 0 ? (
          <div className="text-gray-400 text-sm">{t.admin.lifts.noItems}</div>
        ) : (
          <div className="space-y-6">
            {groups.map((g) => (
              <div key={g.title}>
                <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  {g.title}
                </div>
                <div className="space-y-3">{g.items.map(renderItem)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

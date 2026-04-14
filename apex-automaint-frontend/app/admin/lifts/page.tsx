"use client";
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { api } from '@/app/lib/api';
import { useApiSWR } from '../../lib/swr';
import { useLanguage } from '../../context/LanguageContext';

type MondayItem = {
  id: string;
  name: string;
  group?: string | null;
  status: string | null;
  workTime?: string | null;
  workType?: string | null;
  car?: string | null;
  notes?: string | null;
  mechanic?: string | null;
};

type LiftsResponse =
  | {
      board: { id: string; name: string } | null;
      statusColumnId: string;
      columns?: Record<string, string>;
      items: MondayItem[];
    }
  | { message?: string; error?: string };

function getItemStatus(item: MondayItem) {
  const v = item.status ?? '';
  return v.trim();
}

function fmt(v: string | null | undefined) {
  const s = (v ?? '').trim();
  return s ? s : '-';
}

const GROUP_ORDER = ['LIFT 1', 'LIFT 2', 'LIFT 3', 'PAINT BOOTH'] as const;

export default function AdminLiftsPage() {
  const { t } = useLanguage();
  const { data, isLoading, mutate } = useApiSWR<LiftsResponse>('/monday/lifts');

  const items = useMemo(() => {
    if (!data || !('items' in data)) return [];
    return data.items ?? [];
  }, [data]);

  const groups = useMemo(() => {
    const buckets = new Map<string, MondayItem[]>();
    for (const item of items) {
      const key = (item.group ?? 'Other').toString().trim() || 'Other';
      const list = buckets.get(key) ?? [];
      list.push(item);
      buckets.set(key, list);
    }

    const ordered: Array<{ title: string; items: MondayItem[] }> = [];
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

  const boardName =
    data && 'board' in data && data.board ? data.board.name : null;

  const [savingId, setSavingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

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
          {boardName ? ` • ${boardName}` : ''}
        </div>
      </div>

      <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-10 rounded-xl bg-white/10" />
            <div className="h-10 rounded-xl bg-white/10" />
            <div className="h-10 rounded-xl bg-white/10" />
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
                <div className="space-y-3">
                  {g.items.map((item) => {
                    const currentStatus = getItemStatus(item);
                    const value =
                      drafts[item.id] !== undefined
                        ? drafts[item.id]
                        : currentStatus;
                    const isSaving = savingId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="border border-white/10 rounded-xl p-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-white font-semibold truncate">
                              {item.name}
                            </div>
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
                              {(item.car || item.notes) && (
                                <div>
                                  {item.car
                                    ? `${t.admin.lifts.car}: ${item.car}`
                                    : ''}
                                  {item.car && item.notes ? ' • ' : ''}
                                  {item.notes
                                    ? `${t.admin.lifts.notes}: ${item.notes}`
                                    : ''}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
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
                              disabled={isSaving}
                              onClick={async () => {
                                const nextStatus = (drafts[item.id] ?? '').trim();
                                if (!nextStatus) return;
                                setSavingId(item.id);
                                try {
                                  await api.put(
                                    `/monday/lifts/${item.id}/status`,
                                    { status: nextStatus },
                                  );
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
                                  setSavingId(null);
                                }
                              }}
                              className="px-4 py-2 bg-gold text-dark text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              {t.admin.lifts.setStatus}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

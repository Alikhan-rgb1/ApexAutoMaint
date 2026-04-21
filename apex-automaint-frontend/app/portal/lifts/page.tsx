"use client";
import React, { useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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

function getItemStatus(item: MondayItem) {
  const v = item.status ?? '';
  return v.trim() ? v.trim() : '-';
}

function fmt(v: string | null | undefined) {
  const s = (v ?? '').trim();
  return s ? s : '-';
}

const GROUP_ORDER = ['LIFT 1', 'LIFT 2', 'LIFT 3', 'PAINT BOOTH'] as const;

export default function PortalLiftsPage() {
  const { t } = useLanguage();
  const lifts = useApiSWR<LiftsResponse>('/monday/lifts');
  const { data, isLoading, mutate } = lifts;

  const liftsErrorText = useMemo(() => {
    const swrErrorText = getErrorText(lifts.error);
    if (swrErrorText) return swrErrorText;
    if (data && !('items' in data)) {
      const msg = (data.message ?? data.error ?? '').toString().trim();
      return msg ? msg : null;
    }
    return null;
  }, [data, lifts.error]);

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

  return (
    <div className="space-y-6">
      <div>
        <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
          {t.portal.vehicles.title}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-black">
          {t.portal.lifts.title}
        </h1>
        <div className="text-gray-400 text-sm mt-2">
          {t.portal.lifts.subtitle}
          {boardName ? ` • ${boardName}` : ''}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
          {t.portal.lifts.title}
        </div>
        <button
          type="button"
          onClick={async () => {
            try {
              await mutate();
            } catch {
              toast.error('Failed to refresh');
            }
          }}
          className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-200 hover:border-gold hover:text-gold transition-colors"
        >
          {t.portal.common.viewAll}
        </button>
      </div>

      {isLoading ? (
        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6 space-y-3">
          <div className="h-10 rounded-xl bg-white/10" />
          <div className="h-10 rounded-xl bg-white/10" />
          <div className="h-10 rounded-xl bg-white/10" />
        </div>
      ) : liftsErrorText ? (
        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6 text-red-200 text-sm">
          {liftsErrorText}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6 text-gray-400 text-sm">
          {t.portal.lifts.noItems}
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((g) => (
            <div
              key={g.title}
              className="bg-dark-lighter border border-white/10 rounded-2xl p-6"
            >
              <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {g.title}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-widest text-gray-400">
                      <th className="py-3 pr-4">{t.portal.lifts.lift}</th>
                      <th className="py-3">{t.portal.lifts.status}</th>
                      <th className="py-3">{t.portal.lifts.workType}</th>
                      <th className="py-3">{t.portal.lifts.workTime}</th>
                      <th className="py-3">{t.portal.lifts.mechanic}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-white/10 text-sm"
                      >
                        <td className="py-4 pr-4 text-white font-medium">
                          <div className="text-white font-medium">
                            {item.name}
                          </div>
                          {(item.car || item.notes) && (
                            <div className="text-xs text-gray-500 mt-1">
                              {item.car
                                ? `${t.portal.lifts.car}: ${item.car}`
                                : ''}
                              {item.car && item.notes ? ' • ' : ''}
                              {item.notes
                                ? `${t.portal.lifts.notes}: ${item.notes}`
                                : ''}
                            </div>
                          )}
                        </td>
                        <td className="py-4 text-gray-200">
                          {getItemStatus(item)}
                        </td>
                        <td className="py-4 text-gray-200">
                          {fmt(item.workType)}
                        </td>
                        <td className="py-4 text-gray-200">
                          {fmt(item.workTime)}
                        </td>
                        <td className="py-4 text-gray-200">
                          {fmt(item.mechanic)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


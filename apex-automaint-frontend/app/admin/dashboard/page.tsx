"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';

import { useLanguage } from '../../context/LanguageContext';
import { getLocale } from '../../lib/locale';
import { useApiSWR } from '../../lib/swr';

type User = { id: string; name: string; phone: string; email: string; role: string };
type Vehicle = { id: string; make: string; model: string; year: number; vin: string | null; currentMileage: number };

export default function AdminDashboardPage() {
  const { t, language } = useLanguage();
  const locale = getLocale(language);
  const [search, setSearch] = useState('');
  const users = useApiSWR<User[]>(`/users${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const vehicles = useApiSWR<Vehicle[]>(
    selectedUserId ? `/vehicles/by-user/${selectedUserId}` : null,
  );

  const selectedUser = useMemo(() => {
    if (!selectedUserId) return null;
    return (users.data ?? []).find((u) => u.id === selectedUserId) ?? null;
  }, [selectedUserId, users.data]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {t.admin.brand}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black">
            {t.admin.dashboard.title}
          </h1>
          <div className="text-gray-400 text-sm mt-2">
            {t.admin.dashboard.subtitle}
          </div>
        </div>
        <Link
          href="/admin/orders"
          className="px-6 py-3 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
        >
          {t.admin.dashboard.orders}
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.admin.dashboard.accounts}
          </div>
          <input
            className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
            placeholder={t.admin.dashboard.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mt-4 space-y-2 max-h-[520px] overflow-auto pr-1">
            {users.isLoading ? (
              <>
                <div className="h-14 bg-white/10 rounded-xl" />
                <div className="h-14 bg-white/10 rounded-xl" />
              </>
            ) : (users.data ?? []).length > 0 ? (
              (users.data ?? []).map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setSelectedUserId(u.id)}
                  className={`w-full text-left border rounded-xl p-4 transition-colors ${
                    selectedUserId === u.id
                      ? 'border-gold'
                      : 'border-white/10 hover:border-gold'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-white font-semibold truncate">
                        {u.name}
                      </div>
                      <div className="text-gray-400 text-xs mt-1 truncate">
                        {u.phone} • {u.email}
                      </div>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      {u.role}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-gray-400 text-sm">
                {t.admin.dashboard.noUsers}
              </div>
            )}
          </div>
        </div>

        <div className="bg-dark-lighter border border-white/10 rounded-2xl p-6">
          <div className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t.admin.dashboard.vehicles}
          </div>
          {!selectedUserId ? (
            <div className="text-gray-400 text-sm">
              {t.admin.dashboard.selectAccount}
            </div>
          ) : vehicles.isLoading ? (
            <div className="space-y-2">
              <div className="h-14 bg-white/10 rounded-xl" />
              <div className="h-14 bg-white/10 rounded-xl" />
            </div>
          ) : (
            <>
              {selectedUser && (
                <div className="text-white font-semibold mb-4">
                  {selectedUser.name}
                </div>
              )}
              {(vehicles.data ?? []).length > 0 ? (
                <div className="space-y-2">
                  {(vehicles.data ?? []).map((v) => (
                    <div key={v.id} className="border border-white/10 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-white font-semibold truncate">
                            {v.make} {v.model} ({v.year})
                          </div>
                          <div className="text-gray-400 text-sm mt-1">
                            {v.currentMileage.toLocaleString(locale)} км
                          </div>
                          {v.vin && (
                            <div className="text-gray-500 text-xs mt-2">
                              VIN: {v.vin}
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/admin/vehicles/${v.id}/tech`}
                          className="shrink-0 px-4 py-2 border border-white/10 text-gray-200 text-xs font-bold uppercase tracking-widest rounded hover:border-gold hover:text-gold transition-colors"
                        >
                          {t.admin.dashboard.techData}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  {t.admin.dashboard.noVehicles}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

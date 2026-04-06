import useSWR from 'swr';

import { api } from './api';

export function useApiSWR<T>(key: string | null) {
  return useSWR<T>(key, async (url: string) => {
    const res = await api.get(url);
    return res.data as T;
  });
}


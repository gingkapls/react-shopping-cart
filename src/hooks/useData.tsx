import { useEffect, useState } from 'react';
import { APIResource } from '../lib/api';

function useData<T extends APIResource>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        const response = await fetch(url, {
          mode: 'cors',
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`HTTP Status error: ${response.status}`);

        const data = (await response.json()) as T;

        setData(data);
        setError(null);
      } catch (e) {
        setError(e);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    void getData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, isLoading };
}

export default useData;

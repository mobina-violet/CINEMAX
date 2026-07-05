import { useEffect, useState } from "react";

//این ابنترفیس میگ هوم ما چه مقادیری برمیگرداند
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

//یک هوک سفارشی برای مدیریت اررور و لودینگ و داده

function useFetch<T>(fetchFn: () => Promise<{ data: T }>, deps: unknown[] = []): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchFn()
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Something went wrong");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, deps);

  return { data, loading, error };
}

export default useFetch;
import { useState, useEffect, useCallback } from "react";
//این هوک برای مدیریت جستجوی هوشمند با تأخیر (Debounce) ساخته شده
function useSearch(delay = 500) {
  const [query, setQuery] = useState(""); // مقدار واقعی که کاربر تایپ می‌کند
  const [debouncedQuery, setDebouncedQuery] = useState(""); // مقدار تأخیرخورده (برای جستجو)
  //هر بار که query تغییر کند (یعنی کاربر تایپ کند)، useEffect اجرا می‌شود.
  //اما debouncedQuery فقط بعد از delay میلی‌ثانیه آپدیت می‌شود
  useEffect(() => {
    const timer = setTimeout(() => {
      // بعد از تأخیر، debouncedQuery آپدیت می‌شود
      setDebouncedQuery(query);
    }, delay);
    /// پاک‌سازی تایمر (جلوگیری از Memory Leak)
    return () => clearTimeout(timer);
  }, [query, delay]);
  //ز useCallback استفاده شده تا تابع در هر رندر دوباره ساخته نشود
  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  return { query, debouncedQuery, handleSearch };
}

export default useSearch;

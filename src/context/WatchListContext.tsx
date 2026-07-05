import { createContext, useContext, useState, useEffect } from "react";
import type { Movie } from "../types";

//این interface تمام مقادیری که Context باید فراهم کند را مشخص می‌کند
interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
}
//مقادیر پیش‌فرض (برای جلوگیری از خطا وقتی Context خارج از Provider استفاده شود).
const WatchlistContext = createContext<WatchlistContextType>({
  watchlist: [],
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  isInWatchlist: () => false,
});
//هنگام اولین بارگذاری، لیست را از localStorage می‌خوان
export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("cinemax-watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  //هر بار که watchlist تغییر کند، اطلاعات به صورت JSON در مرورگر ذخیره می‌شود

  useEffect(() => {
    localStorage.setItem("cinemax-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  //تابع های اصلی
  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => [...prev, movie]);
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((m) => m.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

//هر بار که watchlist تغییر کند، اطلاعات به صورت JSON در مرورگر ذخیره می‌شود (حتی اگر صفحه را ببندی، لیست باقی می‌ماند).
export const useWatchlist = () => useContext(WatchlistContext);
//useWatchlist(): هوک آماده برای استفاده آسان در هر کامپوننت.
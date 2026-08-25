import axios from "axios";

import type { ApiResponse, Movie } from "../types";
import type { AxiosResponse } from "axios";
//ایجاد instance از axios
const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-US",
  },
});
//سرویس اصلی فیلم
export const movieService = {
  getPopular: (page = 1): Promise<AxiosResponse<ApiResponse<Movie>>> =>
    api.get("/movie/popular", { params: { page } }),

  getNowPlaying: (page = 1): Promise<AxiosResponse<ApiResponse<Movie>>> =>
    api.get("/movie/now_playing", { params: { page } }),

  getTopRated: (page = 1): Promise<AxiosResponse<ApiResponse<Movie>>> =>
    api.get("/movie/top_rated", { params: { page } }),
  //جزئیات یک فیلم خاص را می‌گیرد
  getMovieDetail: (id: number) =>
    api.get(`/movie/${id}`, {
      params: {
        append_to_response: "videos,credits,similar",
      },
    }),
  //اینترفیس MovieDetail
  //با append_to_response همزمان این اطلاعات را هم برمی‌گرداند:
  //videos → تریلرها
  //credits → بازیگران و عوامل
  //similar → فیلم‌های مشابه

  //////////جستجو و ژانرها👇🏼
  searchMovies: (query: string, page = 1) =>
    api.get("/search/movie", { params: { query, page } }),

  getGenres: () => api.get("/genre/movie/list"),

  getByGenre: (genreId: number, page = 1) =>
    api.get("/discover/movie", {
      params: { with_genres: genreId, page },
    }),
};
//تابع کمکی ساخت آدرس تصویر
export const getImageUrl = (path: string, size = "w500") =>
  path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/${size}${path}`
    : "/placeholder.jpg";

export default api;

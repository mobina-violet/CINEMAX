//نمایش فیلم هادر لیست ها و صفحه اصلی و جست و جو
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
}
//ارثبری
//برای صفحه جزئیات فیلم
export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  videos: { results: Video[] };
  credits: { cast: Cast[]; crew: Crew[] };
  similar: { results: Movie[] };
}
//ژانر
export interface Genre {
  id: number;
  name: string;
}
//بازیگران
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}
//عوامل
export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}
//شرکت تولیدکننده
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string;
}
//پاسخ عمومی API
//این یک اینترفیس جنریک
export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

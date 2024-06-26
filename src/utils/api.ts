import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const APP_KEY = import.meta.env.VITE_APP_API;

const headers = {};

export interface IParams {
	sort_by: string;
	primary_release_year: number;
	page: number;
	"vote_count.gte": number;
	with_genres?: string[] | number | number[] | string;
}

export type DebouncedFunction = {
	(): void;
	_tId?: number;
};

export enum BackdropSize {
	W300 = "w300",
	W780 = "w780",
	W1280 = "w1280",
	Original = "original",
}

export enum PosterSize {
	w92 = "w92",
	w154 = "w154",
	w185 = "w185",
	w342 = "w342",
	w500 = "w500",
	w780 = "w780",
	Original = "original",
}

export interface IImageConfig {
	base_url: string;
	secure_base_url: string;
	backdrop_sizes: string[];
	logo_sizes: string[];
	poster_sizes: string[];
	profile_sizes: string[];
	still_sizes: string[];
}

export interface IConfiguration {
	images: IImageConfig[];
	change_keys: string[];
}

export interface IMovieDeep {
	movies: IMovieDetail[];
	movieIDs: [];
}

export interface IMovieDeepDetails {
	[year: string]: IMovieDeep[];
}

export interface IMovieDetail {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	cast?: ICast[];
	crew?: ICrew[];
	castNames?: string[];
	directorNames?: string[];
	year?: number;
	release_year?: number;
}

export interface IYearMovies {
	[year: number]: IMovieDetail[];
}

export interface ICast {
	adult: Boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: string;
	character: string;
	credit_id: number;
	order: number;
}

export interface DirectorProps {
	director: string[];
	castLimit: number;
}

export interface CastProps {
	castNames: string[];
	castLimit: number;
}

export interface GenresIDS {
	genresID: string[];
}

export interface GenresProps {
	genresIds: number[];
	genresLimit: number;
}

export interface ICrew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: number;
	department: string;
	job: string;
}

export interface ICredit {
	id: number;
	cast: ICast[];
	crew: ICrew[];
}

export interface IGenreDetails {
	id: number;
	name: string;
}

export interface IYearWiseMovies {
	year: number;
	movies: IMovieDetail[];
}

export interface IMovieResponse {
	page: number;
	results: IMovieDetail[];
	total_pages: number;
	total_results: number;
}

export interface IGenreResponse {
	genres: IGenreDetails[];
}

export interface IGenreMap {
	[key: number]: IGenreDetails;
}

export interface ISelectOption {
	value: number;
	label: string;
}

export const fetchGenreData = async (
	_url: string,
	_params?: Record<string, any>
): Promise<IGenreResponse> => {
	try {
		const { data } = await axios.get<IGenreResponse>(BASE_URL + _url, {
			headers,
			params: {
				..._params,
				api_key: APP_KEY,
			},
		});
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching data");
	}
};

export const fetchApiConfiguration = async (
	_url: string,
	_params?: Record<string, any>
): Promise<IConfiguration> => {
	try {
		const { data } = await axios.get<IConfiguration>(BASE_URL + _url, {
			headers,
			params: {
				..._params,
				api_key: APP_KEY,
			},
		});
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching data");
	}
};

export const fetchCreditDetails = async (
	_movieIds: number[]
): Promise<ICredit[]> => {
	try {
		const promises = _movieIds.map(async (id: number) => {
			const data = await axios.get<ICredit>(
				`${BASE_URL}/movie/${id}/credits`,
				{
					headers,
					params: {
						api_key: APP_KEY,
					},
				}
			);
			return data.data;
		});

		const credits = await Promise.all(promises);
		return credits;
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching data");
	}
};

export const fetchYearsWiseMovies = async (
	_movieYear: number[],
	_params?: Record<string, any>
): Promise<IMovieResponse[]> => {
	try {
		const promises = _movieYear.map(async (year: number) => {
			const data = await axios.get<IMovieResponse>(
				`${BASE_URL}/discover/movie?primary_release_year=${year}&sort_by=popularity.desc&page=1&vote_count.gte=100`,
				{
					headers,
					params: {
						api_key: APP_KEY,
					},
				}
			);
			return data.data;
		});

		const allMovies = await Promise.all(promises);
		return allMovies;
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching data");
	}
};

export const fetchMovieData = async (
	_url: string,
	_params?: Record<string, any>
): Promise<IMovieResponse> => {
	try {
		const { data } = await axios.get<IMovieResponse>(BASE_URL + _url, {
			headers,
			params: {
				..._params,
				api_key: APP_KEY,
			},
		});
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching data");
	}
};

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const APP_KEY = import.meta.env.VITE_APP_API;

const headers = {};

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
	original = "original",
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
}

export interface IGenreDetails {
	id: number;
	name: string;
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

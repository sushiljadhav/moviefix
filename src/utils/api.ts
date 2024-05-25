import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const APP_KEY = import.meta.env.VITE_APP_API;

const headers = {};

export interface IMovieDetail {
	adult: boolean;
	backdrop_path: string;
	genre_ids: [];
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
	results: [IMovieDetail];
	total_pages: number;
	total_results: number;
}

export interface IGenreResponse {
	genres: [IGenreDetails];
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

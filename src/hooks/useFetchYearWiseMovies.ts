import { useEffect, useState } from "react";
import {
	ICredit,
	IMovieDetail,
	IMovieResponse,
	IParams,
	fetchCreditDetails,
	fetchYearsWiseMovies,
} from "../utils/api";

const useFetchYearWiseMovies = (_years: number[], _params?: IParams) => {
	const [yearsMoviesLoading, setYearsMoviesLoading] = useState<
		string | null | Boolean
	>(null);
	const [yearsMoviesData, setYearsMoviesData] = useState<
		IMovieResponse[] | null
	>(null);
	const [error, setError] = useState<string | null>(null);
	const [movieGroupByYear, setMoviesGroupByYear] = useState<{
		[year: number]: IMovieDetail[];
	}>({});
	const [yearWiseMovies, setYearWiseMovies] = useState<{
		[year: number]: IMovieDetail[];
	}>({});

	const groupMovieYearWise = (_movies: IMovieDetail[]) => {
		const groupedMovies: { [year: number]: IMovieDetail[] } = {};

		_movies.forEach((movie) => {
			const releaseYear = new Date(movie.release_date).getFullYear();
			if (!groupedMovies[releaseYear]) {
				groupedMovies[releaseYear] = [];
			}
			groupedMovies[releaseYear].push(movie);
		});

		setYearWiseMovies(groupedMovies);
	};

	useEffect(() => {
		setYearsMoviesLoading(false);
		setYearsMoviesData(null);
		setError(null);

		if (_years) {
			fetchYearsWiseMovies(_years)
				.then((_res: IMovieResponse[]) => {
					setYearsMoviesLoading(false);
					const moviesData: IMovieDetail[] = _res.flatMap(
						(response) => response.results
					);
					groupMovieYearWise(moviesData);
					// const years = bindYearWiseMovies(movieGroupByYear);
					// setYearsMoviesData(moviesData);
				})
				.catch((_error) => {
					setYearsMoviesLoading(false);
					setError("Error Ocurred");
				});
		}
	}, [_years]);

	return { yearsMoviesData, yearsMoviesLoading, error };
};

export default useFetchYearWiseMovies;

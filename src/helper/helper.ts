import { ICredit, IMovieDetail, IYearWiseMovies } from "../utils/api";

export function debounce(method: () => void, delay: number): () => void {
	let timer: ReturnType<typeof setTimeout>;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(method, delay);
	};
}

export const bindCastDirector = (
	_moviesData: IMovieDetail[],
	_creditData: ICredit[]
): IMovieDetail[] | null => {
	if (_moviesData && _creditData) {
		const movies = _moviesData?.map((movie) => {
			const matchingCredit = _creditData.find(
				(credit) => credit.id === movie.id
			);
			if (matchingCredit) {
				const castNames = [
					...matchingCredit?.cast
						.filter((c) => c.known_for_department === "Acting")
						.map((c) => c.name),
					...matchingCredit?.crew
						.filter((c) => c.known_for_department === "Acting")
						.map((c) => c.name),
				];
				const directorNames = [
					...matchingCredit?.cast
						.filter((c) => c.known_for_department === "Directing")
						.map((c) => c.name),
					...matchingCredit?.crew
						.filter((c) => c.known_for_department === "Directing")
						.map((c) => c.name),
				];

				return {
					...movie,
					castNames,
					directorNames,
					release_year: new Date(movie.release_date).getFullYear(),
				};
			}
			return {
				...movie,
			};
		});

		return movies;
	}
	return null;
};

export const groupMovieYearWise = (
	_updatedMovies: IMovieDetail[],
	setMoviesGroupByYear: (groupedMovies: {
		[year: number]: IMovieDetail[];
	}) => void
) => {
	if (_updatedMovies && _updatedMovies.length > 0) {
		const updatedMovieGroupByYear: { [year: number]: IMovieDetail[] } = {};
		_updatedMovies.forEach((movie) => {
			const releaseYear = movie.release_year;
			if (releaseYear) {
				if (!updatedMovieGroupByYear[releaseYear]) {
					updatedMovieGroupByYear[releaseYear] = [];
				}
				updatedMovieGroupByYear[releaseYear].push(movie);
			}
		});
		setMoviesGroupByYear(updatedMovieGroupByYear);
	} else {
		console.error("Missing updated movies or credit data.");
	}
};

export const bindYearWiseMovies = (
	yearWiseMovies: IYearWiseMovies[],
	movieGroupByYear: { [year: number]: IMovieDetail[] },
	setYearWiseMovies: (movies: IYearWiseMovies[]) => void
) => {
	const updatedYearWiseMovies = [...yearWiseMovies];

	for (const year in movieGroupByYear) {
		if (Object.prototype.hasOwnProperty.call(movieGroupByYear, year)) {
			const existingYearIndex = updatedYearWiseMovies.findIndex(
				(yearMovies) => yearMovies.year === parseInt(year)
			);

			if (existingYearIndex !== -1) {
				const existingMoviesSet = new Set(
					updatedYearWiseMovies[existingYearIndex].movies.map(
						(movie) => movie.id
					)
				);
				const newMovies = movieGroupByYear[parseInt(year)].filter(
					(movie) => !existingMoviesSet.has(movie.id)
				);
				updatedYearWiseMovies[existingYearIndex].movies = [
					...updatedYearWiseMovies[existingYearIndex].movies,
					...newMovies,
				];
			} else {
				updatedYearWiseMovies.push({
					year: parseInt(year),
					movies: movieGroupByYear[parseInt(year)],
				});
			}
		}
	}

	updatedYearWiseMovies.sort((a, b) => a.year - b.year);
	setYearWiseMovies(updatedYearWiseMovies);
};

export const getDirection = (direction: any) => {
	switch (direction) {
		case direction.Still:
			return "↕still";
		case direction.Up:
			return "up";
		case direction.Down:
			return "down";
		default:
			return "";
	}
};

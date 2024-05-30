import { useEffect, useState, lazy, Suspense, useRef } from "react";
import Wrapper from "../../../components/global/wrapper/Wrapper";
import { ICredit, IMovieDetail, IParams } from "../../../utils/api";

import useFetchMovie from "../../../hooks/useFetchMovie";
import useFetchCredit from "../../../hooks/useFetchCredit";
import MovieCardSkelton from "../../../components/moviescard/MovieCardSkelton";

import RingLoader from "react-spinners/RingLoader";

import "./moviesyear.css";

const MoviesCard = lazy(
	() => import("../../../components/moviescard/MoviesCard")
);

import { debounce } from "../../../helper/helper";

function MoviesYear() {
	const date = new Date();
	const threshold = 80;
	const prevYearLimit = 2000;
	const NextYearLimit = date.getFullYear();

	const [params, setParams] = useState<IParams>({
		sort_by: "popularity.desc",
		primary_release_year: 2012,
		page: 1,
		"vote_count.gte": 100,
	});

	const [topScroll, setTopScroll] = useState<boolean>(false);
	const [bottomScroll, setBottomScroll] = useState<boolean>(false);
	const [year, setYear] = useState<number>(2012);
	const [movieIds, setMovieIds] = useState<number[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const [showTopLoader, setShowTopLoader] = useState(false);
	const [showBottomLoader, setShowBottomLoader] = useState(false);

	const [movieGroupByYear, setMoviesGroupByYear] = useState<{
		[year: number]: IMovieDetail[];
	}>({});

	const [yearWiseMovies, setYearWiseMovies] = useState<
		{
			year: number;
			movies: IMovieDetail[];
		}[]
	>([]);

	const { data, loading } = useFetchMovie("/discover/movie", params);
	const { creditData, creditLoading } = useFetchCredit(movieIds);

	const ref = useRef<HTMLDivElement | null>(null);

	const lazyLoadMovieComponent = () => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.4 }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	};

	const groupMovieYearWise = (_updatedMovies: IMovieDetail[]) => {
		const updatedMovieGroupByYear: { [year: number]: IMovieDetail[] } = {};

		_updatedMovies?.forEach((movie) => {
			const releaseYear = new Date(movie.release_date).getFullYear();
			if (!updatedMovieGroupByYear[releaseYear]) {
				updatedMovieGroupByYear[releaseYear] = [];
			}
			updatedMovieGroupByYear[releaseYear].push(movie);
		});

		setMoviesGroupByYear(updatedMovieGroupByYear);
	};

	const bindYearWiseMovies = () => {
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

	const bindMovieIds = (_results: IMovieDetail[]) => {
		const movieIds = _results.map((movie) => movie.id);
		setMovieIds(movieIds);
	};

	const bindMovies = (
		_moviesData: IMovieDetail[],
		_creditData: ICredit[]
	): IMovieDetail[] | null => {
		if (_moviesData && _creditData) {
			const movies = _moviesData.map((movie) => {
				const matchingCredit = _creditData.find(
					(credit) => credit.id === movie.id
				);
				if (matchingCredit) {
					const castNames = [
						...matchingCredit.cast
							.filter((c) => c.known_for_department === "Acting")
							.map((c) => c.name),
						...matchingCredit.crew
							.filter((c) => c.known_for_department === "Acting")
							.map((c) => c.name),
					];
					const directorNames = [
						...matchingCredit.cast
							.filter(
								(c) => c.known_for_department === "Directing"
							)
							.map((c) => c.name),
						...matchingCredit.crew
							.filter(
								(c) => c.known_for_department === "Directing"
							)
							.map((c) => c.name),
					];

					const releaseYear = year;

					return {
						...movie,
						cast: matchingCredit.cast,
						crew: matchingCredit.crew,
						castNames,
						directorNames,
						releaseYear,
					};
				}
				return {
					...movie,
					castNames: [],
					directorNames: [],
				};
			});

			return movies;
		}
		return null;
	};

	useEffect(() => {
		if (data?.results) {
			// lazyLoadMovieComponent();
			bindMovieIds(data.results);
		} else {
		}
	}, [data, loading, year]);

	useEffect(() => {
		if (data && creditData) {
			const updatedMovies = bindMovies(data?.results, creditData);
			if (updatedMovies) {
				groupMovieYearWise(updatedMovies);
				if (movieGroupByYear) {
					bindYearWiseMovies();
				}
			} else {
				console.log("No movies available.");
			}
		} else {
			console.log("Movies or credit data are not available yet.");
		}
	}, [data, creditData]);

	/**
	 * TODO last success version
	 */
	const handleScroll = () => {
		if (ref.current && year >= prevYearLimit && year <= NextYearLimit) {
			const observer = new IntersectionObserver((entries) => {
				const scrollTop = Math.round(
					document.documentElement.scrollTop
				);

				const entry = entries[0];
				const rect = entry.boundingClientRect;
				const start = Math.round(rect.top + scrollTop);
				const end = Math.round(rect.height);
				// const isTop =
				// 	scrollTop >= start && scrollTop <= start + threshold;
				const isTop = scrollTop === 0;
				const isBottom = document.body.scrollHeight === scrollTop;

				if (isTop) {
					setYear((prevYear) =>
						Math.max(prevYear - 1, prevYearLimit)
					);

					setTopScroll(true);
					setBottomScroll(false);
					window.scrollTo({ top: 80, behavior: "smooth" });
				} else {
					setTopScroll(false);
				}

				if (isBottom) {
					setYear((prevYear) =>
						Math.min(prevYear + 1, NextYearLimit)
					);

					setBottomScroll(true);
					setTopScroll(false);
					window.scrollTo({
						top: document.body.scrollHeight - 80,
						behavior: "smooth",
					});
				} else {
					setBottomScroll(false);
				}

				const sectInView =
					(scrollTop >= start && scrollTop <= start + threshold) ||
					(scrollTop >= end && scrollTop <= end + threshold);
				setIsInView(sectInView);
			});

			if (ref.current) {
				observer.observe(ref.current);
			}

			return () => {
				if (ref.current) {
					observer.unobserve(ref.current);
				}
			};
		}
	};

	const fetchData = (year: number) => {
		if (bottomScroll) {
			const updateMovies = yearWiseMovies.slice(1);
			setYearWiseMovies(updateMovies);
		}

		console.log(year);
		console.log("console.log", yearWiseMovies);
		setParams((prevParams) => ({
			...prevParams,
			primary_release_year: year,
		}));
	};

	useEffect(() => {
		if (year >= prevYearLimit && year <= NextYearLimit) {
			fetchData(year);
		}
	}, [year]);

	useEffect(() => {
		const debouncedHandleScroll = debounce(handleScroll, 1500);

		const handleScrollEvent = () => {
			debouncedHandleScroll();
		};

		window.addEventListener("scroll", handleScrollEvent);

		return () => {
			window.removeEventListener("scroll", handleScrollEvent);
		};
	}, [loading]);

	useEffect(() => {
		// Scroll to a position slightly below the top on component load
		window.scrollTo({ top: 80, behavior: "smooth" });
	}, []);

	return (
		<div className="movies_content" ref={ref}>
			<Wrapper>
				<div className="movies_header">
					<h2 className="heading">Movies</h2>
				</div>
				<div className="movies_section">
					{topScroll && bottomScroll ? (
						<div>loading....</div>
					) : (
						yearWiseMovies?.map((yearMovies, index) => (
							<div className="movie_section_wrapper" key={index}>
								<h2 className="year_text">{yearMovies.year}</h2>
								<div
									className="movies_card_wrapper"
									key={yearMovies.year}
								>
									{yearMovies?.movies.map((movie) => (
										// <MoviesCard
										// 	key={movie.id}
										// 	movie={movie}
										// />
										<Suspense
											fallback={
												<MovieCardSkelton
													cards={4}
												></MovieCardSkelton>
											}
										>
											<MoviesCard
												key={movie.id}
												movie={movie}
											/>
										</Suspense>
									))}
								</div>
							</div>
						))
					)}
				</div>
			</Wrapper>
		</div>
	);
}

export default MoviesYear;

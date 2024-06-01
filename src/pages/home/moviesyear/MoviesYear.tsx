import { useEffect, useState, useRef } from "react";
import Wrapper from "../../../components/global/wrapper/Wrapper";
import { IMovieDetail, IParams, IYearWiseMovies } from "../../../utils/api";

import useFetchMovie from "../../../hooks/useFetchMovie";
import useFetchCredit from "../../../hooks/useFetchCredit";
import scrollBottom from "../../../helper/ScrollBottom";

import MovieCardSkelton from "../../../components/moviescard/MovieCardSkelton";
import {
	bindCastDirector,
	groupMovieYearWise,
	bindYearWiseMovies,
} from "../../../helper/helper";
import throttle from "lodash/throttle";

import "./moviesyear.css";

import MoviesCard from "../../../components/moviescard/MoviesCard";
import ScrollTop from "../../../helper/ScrollTop";
import { useTypedSelector } from "../../../hooks/useSelector";

let firstLoad = false;

function MoviesYear() {
	const date = new Date();
	const prevYearLimit = 2000;
	const NextYearLimit = date.getFullYear();

	const [params, setParams] = useState<IParams>({
		sort_by: "popularity.desc",
		primary_release_year: 2012,
		page: 1,
		"vote_count.gte": 100,
		with_genres: "",
	});

	const { selectedGenres } = useTypedSelector((state) => state.movies);

	const [year, setYear] = useState<number>(params.primary_release_year);
	const [movieIds, setMovieIds] = useState<number[]>([]);

	const [movieGroupByYear, setMoviesGroupByYear] = useState<{
		[year: number]: IMovieDetail[];
	}>({});

	const [yearWiseMovies, setYearWiseMovies] = useState<IYearWiseMovies[]>([]);

	/**
	 * API CALL
	 */
	const { data, loading } = useFetchMovie("/discover/movie", params);
	const { creditData, creditLoading } = useFetchCredit(movieIds);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const cardWrapper = useRef<HTMLDivElement | null>(null);
	const lastMovieCard = useRef<HTMLDivElement | null>(null);

	const loadMoreItems = () => {
		if (!loading && !creditLoading) {
			setYear((prevYear) => Math.min(prevYear + 1, NextYearLimit));
		}
	};

	const loadMoreItemsAtTop = () => {
		if (!loading && !creditLoading) {
			setYear((prevYear) => Math.max(prevYear - 1, prevYearLimit));
		}
	};

	const bindMovieIds = (_results: IMovieDetail[]) => {
		const movieIds = _results.map((movie) => movie.id);
		setMovieIds(movieIds);
	};

	useEffect(() => {
		if (Object.keys(movieGroupByYear).length > 0) {
			bindYearWiseMovies(
				yearWiseMovies,
				movieGroupByYear,
				setYearWiseMovies
			);
		}
	}, [movieGroupByYear]);

	useEffect(() => {
		if (lastMovieCard.current && !loading) {
			scrollBottom(lastMovieCard, loadMoreItems, {
				threshold: [0.4, 0.8],
			});
		}

		if (firstLoad == true) {
			if (cardWrapper.current && !loading) {
				ScrollTop(cardWrapper, loadMoreItemsAtTop, {
					threshold: [0.4, 0.8],
				});
			}
		}

		firstLoad = true;
	}, [yearWiseMovies]);

	const genreHandler = (selectedGenres: number[]) => {
		if (selectedGenres) {
			let genresString = "";
			if (selectedGenres.length > 0) {
				if (selectedGenres) {
					if (selectedGenres.length > 1) {
						genresString = selectedGenres.join(",");
					} else {
						genresString = selectedGenres.toString();
					}
				}
			}

			return genresString;
		}
	};

	const throttledFetchData = useRef(
		throttle((year: number, selectedGenres?: string) => {
			if (selectedGenres) {
				if (selectedGenres) {
					setParams((prevParams) => ({
						...prevParams,
						primary_release_year: year,
						with_genres: selectedGenres,
					}));
				}
			} else {
				setParams((prevParams) => ({
					...prevParams,
					primary_release_year: year,
				}));
			}
		}, 200)
	);

	useEffect(() => {
		if (year >= prevYearLimit && year <= NextYearLimit) {
			let genresList = genreHandler(selectedGenres);
			if (selectedGenres.length > 0) {
				throttledFetchData.current(year, genresList);
			} else {
				throttledFetchData.current(year);
			}
		}
	}, [year, selectedGenres]);

	useEffect(() => {
		let genresList = genreHandler(selectedGenres);
		if (genresList) {
			setYearWiseMovies([]);
			throttledFetchData.current(year, genresList);
		}
	}, [selectedGenres]);

	useEffect(() => {
		if (data?.results) {
			bindMovieIds(data.results);
		}
	}, [data, loading]);

	useEffect(() => {
		if (data && creditData?.length > 0 && !loading && !creditLoading) {
			const updatedMovies = bindCastDirector(data?.results, creditData);
			if (updatedMovies) {
				if (updatedMovies.length > 0) {
					groupMovieYearWise(updatedMovies, setMoviesGroupByYear);
				}
			}
		}
	}, [creditData, creditLoading]);

	return (
		<div className="movies_content">
			<Wrapper>
				<div className="movies_header">
					<h2 className="heading" ref={cardWrapper}>
						Movies
					</h2>
					<div className="empty-sect">
						<div className="dotsCss">
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
						</div>
					</div>
				</div>
				<div className="movies_section" ref={containerRef}>
					{yearWiseMovies?.map((yearMovies, index) => (
						<div
							className="movie_section_wrapper"
							data-attribute={yearMovies?.year.toString()}
							key={yearMovies?.year}
						>
							<h2 className="year_text">{yearMovies?.year}</h2>
							<div className="movies_card_wrapper" key={index}>
								{loading ? (
									<MovieCardSkelton cards={4} />
								) : (
									yearMovies?.movies.map(
										(movie, index, movies) => (
											<>
												{loading ? (
													<MovieCardSkelton
														cards={index}
													/>
												) : (
													<MoviesCard
														key={movie.id}
														movie={movie}
														ref={
															movies.length ===
															index + 1
																? lastMovieCard
																: null
														}
													/>
												)}
											</>
										)
									)
								)}
							</div>
						</div>
					))}
				</div>
			</Wrapper>
		</div>
	);
}

export default MoviesYear;

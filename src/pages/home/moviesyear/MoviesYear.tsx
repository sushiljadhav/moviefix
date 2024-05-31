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
	});

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
		if (!loading) {
			setYear((prevYear) => Math.min(prevYear + 1, NextYearLimit));
		}
	};

	const loadMoreItemsAtTop = () => {
		if (!loading) {
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
		if (lastMovieCard.current) {
			scrollBottom(lastMovieCard, loadMoreItems, {
				threshold: [0.4, 0.8],
			});
		}

		console.log("moviescard", cardWrapper);

		if (firstLoad == true) {
			if (cardWrapper.current) {
				ScrollTop(cardWrapper, loadMoreItemsAtTop, {
					threshold: 0.5,
				});
			}
		}

		firstLoad = true;
	}, [yearWiseMovies]);

	const throttledFetchData = useRef(
		throttle((year: number) => {
			setParams((prevParams) => ({
				...prevParams,
				primary_release_year: year,
			}));
		}, 200)
	);

	useEffect(() => {
		if (year >= prevYearLimit && year <= NextYearLimit) {
			throttledFetchData.current(year);
		}
	}, [year]);

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
								{yearMovies?.movies.map(
									(movie, index, movies) => (
										<>
											{loading ? (
												<MovieCardSkelton cards={4} />
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

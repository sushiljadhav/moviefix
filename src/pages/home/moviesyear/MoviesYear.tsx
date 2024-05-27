import { useEffect, useState, lazy, Suspense, useRef } from "react";
import Wrapper from "../../../components/global/wrapper/Wrapper";
import "./moviesyear.css";
import {
	ICredit,
	IMovieDeepDetails,
	IMovieDetail,
	IParams,
} from "../../../utils/api";
import useFetchMovie from "../../../hooks/useFetchMovie";
import useFetchCredit from "../../../hooks/useFetchCredit";
import MovieCardSkelton from "../../../components/moviescard/MovieCardSkelton";

const MoviesCard = lazy(
	() => import("../../../components/moviescard/MoviesCard")
);

const PARAMS: IParams = {
	sort_by: "popularity.desc",
	primary_release_year: 2012,
	page: 1,
	"vote_count.gte": 100,
};

function MoviesYear() {
	const MOVIES_DETAILS: IMovieDeepDetails = {
		[PARAMS.primary_release_year]: [],
	};

	const [moviesData, setMovieData] = useState<IMovieDetail[] | null>(null);
	const [storeCreditData, setStoreCreditData] = useState<ICredit[] | null>(
		null
	);

	const [combineMovieData, setCombineMovieData] =
		useState<IMovieDeepDetails | null>(null);

	const [year, setYear] = useState<number>(PARAMS.primary_release_year);

	const [movieIds, setMovieIds] = useState<number[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const { data, loading } = useFetchMovie("/discover/movie", PARAMS);

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
			{ threshold: 0.1 }
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

					return {
						...movie,
						cast: matchingCredit.cast,
						crew: matchingCredit.crew,
						castNames,
						directorNames,
					};
				}
				return { ...movie, castNames: [], directorNames: [] };
			});

			return movies;
		}
		return null;
	};

	useEffect(() => {
		if (data?.results) {
			setMovieData(data.results);
			lazyLoadMovieComponent();
			bindMovieIds(data.results);
		} else {
			setMovieData(null);
		}
	}, [data, loading, year]);

	console.log("data", moviesData);

	useEffect(() => {
		if (data && creditData) {
			const updatedMovies = bindMovies(data?.results, creditData);
			if (updatedMovies) {
				setMovieData(updatedMovies);
			} else {
				console.log("No movies available.");
			}
		} else {
			console.log("Movies or credit data are not available yet.");
		}
	}, [data, creditData]);

	return (
		<div className="movies_content">
			<Wrapper>
				<div className="movies_header">
					<h2 className="heading">Movies</h2>
				</div>
				<div className="year_text">{year}</div>
				<div className="movies_card_wrapper" ref={ref}>
					{!loading && isVisible && !creditLoading ? (
						<Suspense
							fallback={
								<>
									<MovieCardSkelton />
									<MovieCardSkelton />
									<MovieCardSkelton />
									<MovieCardSkelton />
								</>
							}
						>
							{moviesData?.map((item) => (
								<MoviesCard key={item.id} {...item} />
							))}
						</Suspense>
					) : (
						<>
							<MovieCardSkelton />
							<MovieCardSkelton />
							<MovieCardSkelton />
							<MovieCardSkelton />
						</>
					)}
				</div>
			</Wrapper>
		</div>
	);
}

export default MoviesYear;

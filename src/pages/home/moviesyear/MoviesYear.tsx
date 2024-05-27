import { useEffect, useState, lazy, Suspense, useRef } from "react";
import Wrapper from "../../../components/global/wrapper/Wrapper";
import "./moviesyear.css";
import { IMovieDetail, IParams } from "../../../utils/api";
import useFetchMovie from "../../../hooks/useFetchMovie";
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
	const [moviesData, setMovieData] = useState<IMovieDetail[] | null>(null);
	const [year, setYear] = useState<number>(PARAMS.primary_release_year);
	const [isVisible, setIsVisible] = useState(false);
	const { data, loading } = useFetchMovie("/discover/movie", PARAMS);
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

	useEffect(() => {
		if (data?.results) {
			setMovieData(data.results);
		} else {
			setMovieData(null);
		}
		lazyLoadMovieComponent();
	}, [data, loading, year]);

	return (
		<div className="movies_content">
			<Wrapper>
				<div className="movies_header">
					<h2 className="heading">Movies</h2>
				</div>
				<div className="year_text">{year}</div>
				<div className="movies_card_wrapper" ref={ref}>
					{!loading && isVisible ? (
						<Suspense fallback={<MovieCardSkelton />}>
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

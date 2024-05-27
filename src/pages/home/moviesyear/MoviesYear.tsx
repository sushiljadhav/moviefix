import { useEffect, useState } from "react";
import Wrapper from "../../../components/global/wrapper/Wrapper";
import "./moviesyear.css";
import { IMovieDetail, IParams } from "../../../utils/api";
import useFetchMovie from "../../../hooks/useFetchMovie";
import MoviesCard from "../../../components/moviescard/MoviesCard";

function MoviesYear() {
	const [moviesData, setMovieData] = useState<IMovieDetail[] | null>(null);
	const PARAMS: IParams = {
		sort_by: "popularity.desc",
		primary_release_year: 2012,
		page: 1,
		"vote_count.gte": 100,
	};
	const { data, loading } = useFetchMovie("/discover/movie", PARAMS);

	useEffect(() => {
		if (data?.results) {
			setMovieData(data.results);
		} else {
			setMovieData(null);
		}
	}, [data, loading]);

	return (
		<div className="movies_content">
			<Wrapper>
				<div className="movies_header">
					<h2 className="heading">Movies</h2>
				</div>
				<div className="year_text">2012</div>
				<div className="_movies_card_wrapper">
					<MoviesCard />
				</div>
			</Wrapper>
		</div>
	);
}

export default MoviesYear;

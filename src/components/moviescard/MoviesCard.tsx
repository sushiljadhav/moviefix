import { useEffect, useState } from "react";
import { IMovieDetail, PosterSize } from "../../utils/api";
import LazyLoadImages from "../lazyImage/LazyLoadImages";
import "./moviescard.css";
import { useTypedSelector } from "../../hooks/useSelector";
import Director from "./director/Director";
import Cast from "./cast/Cast";
import GenresChip from "./genres/GenresChip";
import Rating from "./rating/Rating";

interface MoviesCardProps {
	movie: IMovieDetail;
}

const MoviesCard: React.FC<MoviesCardProps> = ({ movie }) => {
	const [movieSrc, setMovieSrc] = useState<string>("");
	const [castLimit, setCastLimit] = useState<number>(3);
	const [genresLimit, setGenresLimit] = useState<number>(3);
	const { url } = useTypedSelector((state) => state.movies);

	useEffect(() => {
		const posterPath =
			url?.["base_url"] + PosterSize.Original + movie?.poster_path ||
			movie?.backdrop_path;
		setMovieSrc(posterPath);
	}, [movie]);

	return (
		<div className="movie_card">
			<div className="movie_card_top">
				<div className="card_movie_poster_content">
					{/* <img src={movieSrc} className="card_movie_poster" /> */}
					<LazyLoadImages
						src={movieSrc}
						className="card_movie_poster"
					/>
				</div>
			</div>
			<div className="movie_card_bottom">
				<Rating vote={movie?.vote_average} />
				<h5 className="movie_card_title">
					{movie?.original_title || movie?.title}
				</h5>
				<p className="movie_card_description">{movie?.overview}</p>
				<Cast
					castNames={movie?.castNames || []}
					castLimit={castLimit}
				/>
				<Director
					director={movie?.directorNames || []}
					castLimit={castLimit}
				/>
				<GenresChip
					genresIds={movie?.genre_ids || []}
					genresLimit={genresLimit}
				/>
			</div>
		</div>
	);
};

export default MoviesCard;

import { useEffect, useState } from "react";
import { IMovieDetail, PosterSize } from "../../utils/api";
import LazyLoadImages from "../lazyImage/LazyLoadImages";
import "./moviescard.css";
import { FaStar } from "react-icons/fa";
import { useTypedSelector } from "../../hooks/useSelector";

function MoviesCard(movie: IMovieDetail) {
	const [movieSrc, setMovieSrc] = useState<string>("");
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
					<LazyLoadImages
						src={movieSrc}
						className="card_movie_poster"
					/>
				</div>
			</div>
			<div className="movie_card_bottom">
				<div className="rating-wrapper">
					<FaStar className="star" />
					<FaStar className="star" />
					<FaStar className="star" />
					<FaStar className="star" />
					<FaStar className="star" />
				</div>
				<h5 className="movie_card_title">
					{movie?.original_title || movie?.title}
				</h5>
				<p className="movie_card_description">{movie?.overview}</p>
				<p className="movie_card_cast">
					<span className="cast_tag card_item_text">cast : </span>
					<span className="cast_item cast_item_subtext">
						Logan Marshall-Green
					</span>
				</p>
				<p className="movie_card_director">
					<span className="director_tag card_item_text">
						Director :{" "}
					</span>
					<span className="director_item cast_item_subtext">
						Carolina Jiménez
					</span>
				</p>
				<div className="card_movie_genres">
					<div className="genres_chip">
						<span className="genres_name">Action</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MoviesCard;

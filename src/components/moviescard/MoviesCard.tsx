import React from "react";
import LazyLoadImages from "../lazyImage/LazyLoadImages";
import "./moviescard.css";

function MoviesCard() {
	return (
		<div className="movie_card">
			<div className="movie_card_top">
				<div className="card_movie_poster_content">
					<LazyLoadImages
						src={
							"https://image.tmdb.org/t/p/w154/iADOJ8Zymht2JPMoy3R7xceZprc.jpg"
						}
						className="card_movie_poster"
					/>
				</div>
				<div className="card_movie_genres">
					<div className="genres_chip">
						<span className="genres_name">Action</span>
					</div>
				</div>
				<div className="rating_circle">
					<span className="rating_number"> 10</span>
				</div>
			</div>
			<div className="movie_card_bottom">
				<h5 className="movie_card_title">Total Recall</h5>
				<p className="movie_card_description">
					Factory worker Doug Quaid takes a virtual mind-trip vacation
					with the Rekall company, opting for
				</p>
				<p className="movie_card_cast">
					<span className="cast_tag">cast :</span>
					<span className="cast_item">Logan Marshall-Green</span>
				</p>
				<p className="movie_card_director">
					<span className="director_tag">Director</span>
					<span className="director_item">Carolina Jiménez</span>
				</p>
			</div>
		</div>
	);
}

export default MoviesCard;

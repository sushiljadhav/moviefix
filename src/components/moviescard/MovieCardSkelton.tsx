import "./moviecardskelton.css";

interface MovieCardSkeletonProps {
	cards: number;
}

const MovieCardSkelton: React.FC<MovieCardSkeletonProps> = ({ cards }) => {
	return (
		<>
			{Array.from({ length: cards }).map((_, index) => (
				<div key={index} className="movie_skelton_card">
					<div className="movie_skelton_card_top">
						<div className="card_movie_skelton_poster_content loading_animation"></div>
					</div>
					<div className="movie_skelton_card_bottom">
						<div className="skelton_rating-wrapper loading_animation"></div>
						<span className="movie_skelton_card_title loading_animation"></span>
						<span className="movie_skelton_card_description loading_animation"></span>
						<div className="movie_skelton_card_cast loading_animation"></div>
						<div className="movie_skelton_card_director loading_animation"></div>
						<div className="card_movie_skelton_genres">
							<div className="genres_skelton_chip loading_animation">
								<span className="genres_skelton_name"></span>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default MovieCardSkelton;

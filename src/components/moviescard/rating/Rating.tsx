import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingProps {
	vote: number;
}

const Rating: React.FC<RatingProps> = ({ vote }) => {
	const maxStars = 5;
	const starRating = (vote / 10) * maxStars;

	const fullStars = Math.floor(starRating);
	const halfStar = starRating % 1 >= 0.5;

	return (
		<div className="rating-wrapper">
			{[...Array(fullStars)].map((_, index) => (
				<FaStar key={index} className="star" />
			))}
			{halfStar && <FaStarHalfAlt className="star" />}
			{[...Array(maxStars - fullStars - (halfStar ? 1 : 0))].map(
				(_, index) => (
					<FaRegStar key={index} className="star" />
				)
			)}
		</div>
	);
};

export default Rating;

import React, { useEffect, useState } from "react";
import { GenresProps, GenresIDS, IGenreDetails } from "../../../utils/api";
import { useTypedSelector } from "../../../hooks/useSelector";

const GenresChip: React.FC<GenresProps> = ({ genresIds, genresLimit }) => {
	const { genres } = useTypedSelector((state) => state.movies);
	const [genreNames, setGenreNames] = useState<string[] | null>(null);

	const getGenreNames = (
		_genresIds: number[],
		_genres: { [key: number]: IGenreDetails }
	): string[] => {
		return _genresIds
			.map((genreId) => _genres[genreId]?.name)
			.filter(Boolean) as string[];
	};

	useEffect(() => {
		if (genresIds && genres) {
			const genreNames = getGenreNames(genresIds, genres);
			setGenreNames(genreNames);
		}
	}, [genresIds, genres]);

	if (!genreNames || genreNames.length === 0) return null;
	return (
		<div className="card_movie_genres">
			{genreNames.slice(0, genresLimit).map((genreName, index) => (
				<div key={index} className="genres_chip">
					<span className="genres_name">{genreName}</span>
				</div>
			))}
		</div>
	);
};

export default GenresChip;

import React, { useEffect, useState } from "react";
import { IGenreMap, ISelectOption } from "../../utils/api";
import { MultiValue, SingleValue } from "react-select";
import { useTypedSelector } from "../../hooks/useSelector";
import Wrapper from "../global/wrapper/Wrapper";
import "./genres.css";

function Genres() {
	const [genreOptions, setGenreOptions] = useState<ISelectOption[]>([]);
	const [selectedGenre, setSelectedGenres] = useState<number[]>([]);
	const { genres } = useTypedSelector((state) => state.movies);

	const convertGenresToOptions = (genresMap: IGenreMap): ISelectOption[] => {
		return Object.values(genresMap).map((genre) => ({
			value: genre.id,
			label: genre.name,
		}));
	};

	const handleGenreClick = (genreValue: number) => {
		setSelectedGenres((prevGenres) => {
			if (prevGenres.includes(genreValue)) {
				return prevGenres.filter((value) => value !== genreValue);
			} else {
				return [...prevGenres, genreValue];
			}
		});
	};

	useEffect(() => {
		if (genres) {
			const convertedGenres = convertGenresToOptions(genres);
			setGenreOptions(convertedGenres);
		}
	}, [genres]);
	return (
		<div className="genres">
			<Wrapper>
				<div className="genres_content">
					{genreOptions.map((genre, index) => {
						return (
							<div
								className={`genres_chip ${
									selectedGenre.includes(genre.value)
										? "active"
										: ""
								}`}
								key={index}
								onClick={() => handleGenreClick(genre.value)}
							>
								<span className="genres_name">
									{genre.label}
								</span>
							</div>
						);
					})}
				</div>
			</Wrapper>
		</div>
	);
}

export default Genres;

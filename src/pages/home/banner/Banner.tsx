import React, { useEffect, useState } from "react";
import Wrapper from "../../../components/global/wrapper/Wrapper";
import useFetchMovie from "../../../hooks/useFetchMovie";
import { useTypedSelector } from "../../../hooks/useSelector";
import { BackdropSize, IImageConfig, PosterSize } from "../../../utils/api";
import LazyLoadImages from "../../../components/lazyImage/LazyLoadImages";
import BannerSkeleton from "./BannerSkeleton";
import "./banner.css";

function Banner() {
	const [bannerImage, setBannerImage] = useState<string>("");
	const [posterImage, setPosterImage] = useState<string>("");
	const [movieTitle, setMovieTitle] = useState<string>("");
	const [movieDescription, setMovieDescription] = useState<string>("");
	const [randomNumber, setRandomNumber] = useState<number>(0);
	const { url } = useTypedSelector((state) => state.movies);

	const { data, loading } = useFetchMovie("/trending/movie/day");

	const generateRandomNumber = () => {
		setRandomNumber(Math.floor(Math.random() * 20));
	};

	useEffect(() => {
		generateRandomNumber();
		const backgroundImage =
			url?.["base_url"] +
				BackdropSize.Original +
				data?.results?.[randomNumber]?.backdrop_path ||
			"defaultImagePath";
		const title = data?.results?.[randomNumber]?.original_title || "";
		const overView = data?.results?.[randomNumber].overview || "";
		const movieImage =
			url?.["base_url"] +
				PosterSize.w154 +
				data?.results[randomNumber].poster_path || "";

		setBannerImage(backgroundImage);
		setMovieTitle(title);
		setMovieDescription(overView);
		setPosterImage(movieImage);
	}, [data, url]);

	return (
		<div className="banner">
			<Wrapper>
				<div className="banner_movie_image">
					<LazyLoadImages
						src={bannerImage}
						className="banner-image"
					/>
				</div>
				{!loading ? (
					<div className="banner_content">
						<div className="poster_image_content">
							<LazyLoadImages
								src={posterImage}
								className="poster_image"
							/>
						</div>
						<h2 className="banner_movie_title">{movieTitle}</h2>
						<p className="banner_movie_overview">
							{movieDescription}
						</p>
					</div>
				) : (
					<BannerSkeleton />
				)}

				<div className="overlay_layer"></div>
			</Wrapper>
		</div>
	);
}

export default Banner;

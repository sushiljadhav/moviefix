import React, { useEffect, useRef, useState } from "react";
import Banner from "./banner/Banner";
import Genres from "../../components/genres/Genres";
import "./home.css";
import MoviesYear from "./moviesyear/MoviesYear";
function Home() {
	const moviesYearRef = useRef<HTMLDivElement>(null);
	const [showBanner, setShowBanner] = useState<Boolean>(true);
	const [stickyGenre, setStickGenre] = useState<string>("no_sticky");

	useEffect(() => {
		setShowBanner(false);
		setStickGenre("sticky");
	}, [showBanner, stickyGenre]);

	return (
		<main className="home_page_content">
			{showBanner && <Banner />}
			<div className="btf">
				<div className={stickyGenre}>
					<Genres></Genres>
				</div>
				<div>
					<MoviesYear></MoviesYear>
				</div>
			</div>
		</main>
	);
}

export default Home;

import React from "react";
import Banner from "./banner/Banner";
import Genres from "../../components/genres/Genres";
import "./home.css";
import MoviesYear from "./moviesyear/MoviesYear";
function Home() {
	return (
		<main className="home_page_content">
			<Banner></Banner>
			<Genres></Genres>
			<MoviesYear></MoviesYear>
			<div style={{ height: 1000 }}></div>
		</main>
	);
}

export default Home;

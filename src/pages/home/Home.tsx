import React from "react";
import Banner from "./banner/Banner";
import Genres from "../../components/genres/Genres";
import "./home.css";

function Home() {
	return (
		<main className="home_page_content">
			<Banner></Banner>
			<Genres></Genres>
		</main>
	);
}

export default Home;

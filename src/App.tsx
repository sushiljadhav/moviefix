import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IConfiguration, IGenreDetails, IGenreMap } from "./utils/api";
import { useDispatch } from "react-redux";
import { apiConfiguration, getGenres } from "./store/movies";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/searchResult/SearchResult";
import useFetchGenre from "./hooks/useFetchGenre";
import useFetchConfiguration from "./hooks/useFetchConfiguration";

import "./App.css";

function App() {
	const dispatch = useDispatch();

	const [configuration, setConfiguration] = useState<IConfiguration | null>(
		null
	);
	const [genresMap, setGenresMap] = useState<IGenreMap | null>(null);

	// fetch genres

	const { data, loading } = useFetchGenre("/genre/movie/list");
	// fetch configuration

	const { configurationData, configurationLoading } =
		useFetchConfiguration("/configuration");

	/** This method convert the Genres array to {id : {item}}
	 * @param genresArray
	 */
	const convertGenresArrayToMap = (
		genresArray: IGenreDetails[]
	): IGenreMap => {
		return genresArray.reduce((acc, genre) => {
			acc[genre.id] = genre;
			return acc;
		}, {} as IGenreMap);
	};

	// set genres to genres state and configuration to configuration state
	useEffect(() => {
		if (data?.genres) {
			console.log("dataGenres", data?.genres);
			setGenresMap(convertGenresArrayToMap(data?.genres));
		} else {
			setGenresMap(null);
		}

		if (configurationData) {
			setConfiguration(configurationData);
		} else {
			setConfiguration(null);
		}
	}, [data, loading, configurationData, configurationLoading]);

	//set the genres data in redux store
	dispatch(getGenres(genresMap));
	//set the configuration data in redux store
	dispatch(apiConfiguration(configuration?.images));

	return (
		<BrowserRouter>
			<div className="movie_fix_page">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search/:query" element={<SearchResult />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;

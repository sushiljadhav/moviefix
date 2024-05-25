import { useEffect } from "react";
import { fetchMovieData } from "./utils/api";
import "./App.css";

interface IParams {
	sort_by: string;
	primary_release_year: number;
	page: number;
	"vote_count.gte": number;
}

function App() {
	const params: IParams = {
		sort_by: "popularity.desc",
		primary_release_year: 2023,
		page: 1,
		"vote_count.gte": 100,
	};

	const apiTesting = () => {
		fetchMovieData("/discover/movie", params).then((res) => {
			console.log("data", res);
		});
	};

	useEffect(() => {
		apiTesting();
	}, []);
	return <div>App</div>;
}

export default App;

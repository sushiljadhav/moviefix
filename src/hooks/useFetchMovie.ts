import { useEffect, useState } from "react";
import { IMovieResponse, fetchMovieData } from "../utils/api";

const useFetchMovie = (_url: string) => {
	const [loading, setLoading] = useState<string | null | Boolean>(null);
	const [data, setData] = useState<IMovieResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading("loading...");
		setData(null);
		setError(null);

		fetchMovieData(_url)
			.then((_res: IMovieResponse) => {
				setLoading(false);
				setData(_res);
			})
			.catch((_error) => {
				setLoading(false);
				setError("Error Ocurred");
			});
	}, [_url]);

	return { data, loading, error };
};

export default useFetchMovie;

import { useEffect, useState } from "react";
import { IMovieResponse, IParams, fetchMovieData } from "../utils/api";

const useFetchMovie = (_url: string, params?: IParams) => {
	const [loading, setLoading] = useState<string | null | Boolean>(null);
	const [data, setData] = useState<IMovieResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading("loading...");
		setData(null);
		setError(null);

		fetchMovieData(_url, params)
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

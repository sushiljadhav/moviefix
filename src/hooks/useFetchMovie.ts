import { useEffect, useState } from "react";
import { IMovieResponse, IParams, fetchMovieData } from "../utils/api";

const useFetchMovie = (_url: string, params?: IParams) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<IMovieResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
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
	}, [_url, params]);

	return { data, loading, error };
};

export default useFetchMovie;

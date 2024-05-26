import { useEffect, useState } from "react";
import { IGenreResponse, fetchGenreData } from "../utils/api";

const useFetchGenre = (_url: string) => {
	const [loading, setLoading] = useState<string | null | Boolean>(null);
	const [data, setData] = useState<IGenreResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLoading("loading...");
		setData(null);
		setError(null);

		fetchGenreData(_url)
			.then((_res: IGenreResponse) => {
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

export default useFetchGenre;

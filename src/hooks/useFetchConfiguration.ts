import { useEffect, useState } from "react";
import {
	IConfiguration,
	fetchApiConfiguration,
	fetchGenreData,
} from "../utils/api";

const useFetchConfiguration = (_url: string) => {
	const [configurationLoading, setconfigurationLoading] = useState<
		string | null | boolean
	>(null);
	const [configurationData, setconfigurationData] =
		useState<IConfiguration | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setconfigurationLoading("loading...");
		setconfigurationData(null);
		setError(null);

		fetchApiConfiguration(_url)
			.then((_res: IConfiguration) => {
				setconfigurationLoading(false);
				setconfigurationData(_res);
			})
			.catch((_error) => {
				setconfigurationLoading(false);
				setError("Error Ocurred");
			});
	}, [_url]);

	return { configurationData, configurationLoading, error };
};

export default useFetchConfiguration;

import { useEffect, useState } from "react";
import { ICredit, fetchCreditDetails } from "../utils/api";

const useFetchCredit = (_movieIds: number[]) => {
	const [creditLoading, setCreditLoading] = useState<boolean>(true);
	const [creditData, setCreditData] = useState<ICredit[] | []>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setCreditLoading(true);
		setCreditData([]);
		setError(null);

		if (_movieIds) {
			fetchCreditDetails(_movieIds)
				.then((_res: ICredit[]) => {
					setCreditLoading(false);
					setCreditData(_res);
				})
				.catch((_error) => {
					setCreditLoading(false);
					setError("Error Ocurred");
				})
				.finally(() => {});
		}
	}, [_movieIds]);

	return { creditData, creditLoading, error };
};

export default useFetchCredit;

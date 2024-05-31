import { useEffect, useState } from "react";

const useScrollTop = (): boolean => {
	const [isAtTop, setIsAtTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				setIsAtTop(true);
			} else {
				setIsAtTop(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Initial check
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return isAtTop;
};

export default useScrollTop;

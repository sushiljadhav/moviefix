const ScrollBottom = (
	ref: React.RefObject<HTMLDivElement | undefined>,
	callback: () => void,
	options: IntersectionObserverInit
) => {
	const observer = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) {
			callback();
			observer.unobserve(entry.target);
		}
	}, options);

	if (ref.current) {
		observer.observe(ref.current);
	}
};

export default ScrollBottom;

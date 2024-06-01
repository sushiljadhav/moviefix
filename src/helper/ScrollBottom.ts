const ScrollBottom = (
	ref: React.RefObject<HTMLDivElement | undefined>,
	callback: () => void,
	options: IntersectionObserverInit
) => {
	const observer = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) {
			callback();
			observer.unobserve(entry.target);
			window.scrollTo({ top: 500, behavior: "smooth" });
		}
	}, options);

	if (ref.current) {
		observer.observe(ref.current);
	}
};

export default ScrollBottom;

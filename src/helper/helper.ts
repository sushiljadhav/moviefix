export function debounce(method: () => void, delay: number): () => void {
	let timer: ReturnType<typeof setTimeout>;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(method, delay);
	};
}

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LazyLoadImagesProps {
	src: string;
	className?: string;
	alt?: string;
}

function LazyLoadImages({ src, className, alt }: LazyLoadImagesProps) {
	return (
		<LazyLoadImage
			className={className || ""}
			alt={alt}
			effect="blur"
			src={src}
		/>
		// <>
		// 	<img src={src} alt="" />
		// </>
	);
}

export default LazyLoadImages;

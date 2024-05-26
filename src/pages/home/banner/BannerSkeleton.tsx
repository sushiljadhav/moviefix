import React from "react";

function BannerSkeleton() {
	return (
		<div className="skeleton_banner_content banner_content">
			<div className="skeleton_poster_image_content">
				<div className="skeleton_banner_image loading_animation"></div>
			</div>
			<div className="skeleton_banner_movie_title loading_animation"></div>
			<div className="skeleton_banner_movie_overview loading_animation"></div>
		</div>
	);
}

export default BannerSkeleton;

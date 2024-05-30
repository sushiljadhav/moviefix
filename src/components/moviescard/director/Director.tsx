import React from "react";
import { DirectorProps } from "../../../utils/api";

const Director: React.FC<DirectorProps> = ({ director, castLimit }) => {
	return (
		<p className="movie_card_director">
			{director && director.length > 0 && (
				<span className="director_tag card_item_text">Director : </span>
			)}

			{director && director.length > 0 ? (
				<>
					{director?.map((name, _index) => (
						<span
							key={_index}
							className="director_item cast_item_subtext"
						>
							{name}
							{_index === castLimit ||
							(director && _index === director.length - 1)
								? null
								: ","}{" "}
						</span>
					))}
				</>
			) : null}
		</p>
	);
};

export default Director;

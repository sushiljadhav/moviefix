import React from "react";
import { CastProps } from "../../../utils/api";

const Cast: React.FC<CastProps> = ({ castNames, castLimit }) => {
	return (
		<p className="movie_card_cast">
			<span className="cast_tag card_item_text">cast : </span>
			{castNames && castNames.length > 0 ? (
				<>
					{castNames?.map((name, _index) => (
						<span
							key={_index}
							className="cast_item cast_item_subtext"
						>
							{name}
							{_index === castLimit ? null : ","}{" "}
						</span>
					))}
				</>
			) : null}
		</p>
	);
};

export default Cast;

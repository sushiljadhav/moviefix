import logo from "../../assets/images/logo.svg";
import { FaSearch } from "react-icons/fa";
import "./header.css";
import Wrapper from "../global/wrapper/Wrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
	const [searchQuery, setSearchQuery] = useState<string>("");

	const navigate = useNavigate();

	const queryHandler = (
		event:
			| React.KeyboardEvent<HTMLInputElement>
			| React.MouseEvent<SVGElement, MouseEvent>
	) => {
		if (
			("key" in event &&
				event.key === "Enter" &&
				searchQuery.length > 0) ||
			("type" in event && event.type === "click")
		) {
			navigate(`search/${searchQuery}`);
			setSearchQuery("");
		}
	};

	return (
		<header className="header">
			<Wrapper>
				<div className="header_content">
					<div className="logo">
						<img src={logo} alt="Movie Fix Logo" />
					</div>
					<div className="search_bar_content">
						<div className="search_bar_wrapper">
							<input
								type="text"
								className="search_bar_input"
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyUp={queryHandler}
							></input>
							<FaSearch
								className="search_icon"
								onClick={queryHandler}
							/>
						</div>
					</div>
				</div>
			</Wrapper>
		</header>
	);
}

export default Header;

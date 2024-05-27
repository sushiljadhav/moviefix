import React from "react";
import logo from "../../assets/images/logo.svg";
import { FaSearch } from "react-icons/fa";
import "./header.css";
import Wrapper from "../global/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
	const [lastScrollY, setLastScrollY] = useState<number>(0);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [show, setShow] = useState<string>("top");
	const location = useLocation();

	const navigate = useNavigate();
	const scrollHandler = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY) {
				setShow("hide");
			} else {
				setShow("show");
			}
		} else {
			setShow("top");
		}
		setLastScrollY(window.scrollY);
		console.log("sushil", window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [lastScrollY]);

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
		<header className={`header ${show}`}>
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

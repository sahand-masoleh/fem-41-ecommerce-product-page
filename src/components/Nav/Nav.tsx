/// <reference types="vite-plugin-svgr/client" />
import "./Nav.scss";
import { useContext, useState } from "react";
import { CartContext, CartContextType } from "@root/contexts/CartContext";
import Cart from "./Cart";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as CartIcon } from "@assets/icon-cart.svg";

const LINKS = ["collections", "men", "women", "about", "contact"];

function Nav() {
	const [isOpen, setIsOpen] = useState(false);
	const { quantity } =
		useContext<CartContextType | undefined>(CartContext) || {};

	function handleOpen() {
		setIsOpen((prev) => !prev);
	}

	const linksMap = [];
	for (let link of LINKS) {
		linksMap.push(<NavLink key={link} text={link} />);
	}
	return (
		<nav className="nav">
			<div className="nav__logo image">
				<Logo className="image__img" />
			</div>
			<div className="nav__spacer"></div>
			<div className="nav__menu">{linksMap}</div>
			<button
				className="nav__cart image"
				onClick={handleOpen}
				data-count={quantity}
			>
				<CartIcon className="image__img" />
			</button>
			<div className="nav__spacer"></div>
			<div className="nav__avatar image">
				<img
					src="./images/image-avatar.png"
					alt="user avatar"
					className="image__img"
				/>
			</div>
			{isOpen && <Cart handleOpen={handleOpen} />}
		</nav>
	);
}

export default Nav;

function NavLink({ text }: { text: string }) {
	return (
		<>
			<a href="#" className="nav__link">
				{text}
			</a>
			<div className="nav__spacer"></div>
		</>
	);
}

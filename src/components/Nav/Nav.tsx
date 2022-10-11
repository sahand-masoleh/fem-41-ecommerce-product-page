/// <reference types="vite-plugin-svgr/client" />
import "./Nav.scss";
import { useContext, useState } from "react";
import { CartContext, CartContextType } from "@root/contexts/CartContext";
import { products } from "@root/productList";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as CartIcon } from "@assets/icon-cart.svg";

const LINKS = ["collections", "men", "women", "about", "contact"];
const PRODUCT = products[0];

function Nav() {
	const [isOpen, setIsOpen] = useState(false);

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
			{linksMap}
			<button className="nav__cart image" onClick={handleOpen}>
				<CartIcon className="image__img" />
			</button>
			<div className="nav__avatar image">
				<img
					src="./images/image-avatar.png"
					alt="user avatar"
					className="image__img"
				/>
			</div>
			{isOpen && <Cart />}
		</nav>
	);
}

export default Nav;

function NavLink({ text }: { text: string }) {
	return (
		<a href="#" className="nav__link">
			{text}
		</a>
	);
}

function Cart() {
	const { quantity } = useContext(CartContext);
	return <div>{quantity}</div>;
}

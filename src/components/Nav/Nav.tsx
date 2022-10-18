/// <reference types="vite-plugin-svgr/client" />
import "./Nav.scss";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { CartContext, CartContextType } from "@root/contexts/CartContext";
import Cart from "./Cart";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as CartIcon } from "@assets/icon-cart.svg";
import { ReactComponent as MenuIcon } from "@assets/icon-menu.svg";
import { ReactComponent as CloseIcon } from "@assets/icon-close.svg";

const LINKS = ["collections", "men", "women", "about", "contact"];

function Nav() {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(true);

	const { quantity } =
		useContext<CartContextType | undefined>(CartContext) || {};

	function handleOpen() {
		setIsCartOpen((prev) => !prev);
	}

	const linksMapDesktop = [];
	for (let link of LINKS) {
		linksMapDesktop.push(
			<>
				<NavLink key={link} text={link} />
				<div className="nav__spacer"></div>
			</>
		);
	}

	return (
		<nav className="nav">
			<button className="nav__open image" onClick={() => setIsMenuOpen(true)}>
				<MenuIcon className="image__img" />
			</button>
			<div className="nav__logo image">
				<Logo className="image__img" />
			</div>
			<div className="nav__spacer"></div>
			<div className="nav__menu-desktop">{linksMapDesktop}</div>
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
			{isCartOpen && <Cart handleOpen={handleOpen} />}
			{isMenuOpen && <MobileMenu handleClose={() => setIsMenuOpen(false)} />}
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

interface Props {
	handleClose: () => void;
}

function MobileMenu({ handleClose }: Props) {
	const linksMapMobile = [];
	for (let link of LINKS) {
		linksMapMobile.push(<NavLink key={link} text={link} />);
	}
	return createPortal(
		<>
			<div className="menu">
				<button className="menu__close image" onClick={handleClose}>
					<CloseIcon className="image__img" />
				</button>
				{linksMapMobile}
			</div>
			<div className="menu__background" onClick={handleClose}></div>
		</>,
		document.body
	);
}

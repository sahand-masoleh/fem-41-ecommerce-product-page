/// <reference types="vite-plugin-svgr/client" />
import "./Nav.scss";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext, CartContextType } from "@root/contexts/CartContext";
import links from "./links";
import Cart from "./Cart";
import MobileMenu from "./MobileMenu";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as CartIcon } from "@assets/icon-cart.svg";
import { ReactComponent as MenuIcon } from "@assets/icon-menu.svg";

function Nav() {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [hovered, setHovered] = useState<string | null>(null);

	const { quantity } =
		useContext<CartContextType | undefined>(CartContext) || {};

	function handleOpen() {
		setIsCartOpen((prev) => !prev);
	}

	function handleHover(link: string | null) {
		if (link) {
			setHovered(link);
		} else {
			setHovered(null);
		}
	}

	const linksMapDesktop = [];
	for (let link of links) {
		linksMapDesktop.push(
			<>
				<NavLink
					key={link}
					text={link}
					isHovered={hovered === link}
					onHover={() => handleHover(link)}
				/>
				<div className="nav__spacer"></div>
			</>
		);
	}

	return (
		<nav className="nav">
			<button
				className="nav__hamburger image"
				onClick={() => setIsMenuOpen(true)}
			>
				<MenuIcon className="image__img" />
			</button>
			<div className="nav__spacer"></div>
			<div className="nav__logo image">
				<Logo className="image__img" />
			</div>
			<div className="nav__spacer"></div>
			<div className="nav__menu" onMouseLeave={() => handleHover(null)}>
				{linksMapDesktop}
			</div>
			<button
				className="nav__cart image"
				onClick={handleOpen}
				data-count={quantity || null}
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

interface Props {
	text: string;
	isHovered: boolean;
	onHover: () => void;
}

function NavLink({ text, isHovered, onHover }: Props) {
	return (
		<div className="nav__link-wrapper">
			<a href="#" className="nav__link" onMouseEnter={onHover}>
				{text}
			</a>
			<AnimatePresence>
				{isHovered ? (
					<motion.div
						className="nav__underline"
						layoutId="underline"
						key="underline"
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					></motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}

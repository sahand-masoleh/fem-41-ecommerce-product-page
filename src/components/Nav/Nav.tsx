/// <reference types="vite-plugin-svgr/client" />
import "./Nav.scss";
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext, CartContextable } from "@contexts/CartContext";
import useToast, { MESSAGES } from "@hooks/useToast";
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
	const showToast = useToast();

	useEffect(() => {
		const body = document.querySelector("body");
		if (isMenuOpen && body) {
			body.style.overflow = "hidden";
		} else if (!isMenuOpen && body) {
			body.style.overflow = "unset";
		}
	}, [isMenuOpen]);

	const { quantity } =
		useContext<CartContextable | undefined>(CartContext) || {};

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

	function handleMock() {
		showToast && showToast(MESSAGES.MOCK);
	}

	const linksMapDesktop = [];
	for (let link of links) {
		linksMapDesktop.push(
			<React.Fragment key={link}>
				<NavLink
					text={link}
					isHovered={hovered === link}
					onHover={() => handleHover(link)}
					onClick={handleMock}
				/>
				<div className="nav__spacer"></div>
			</React.Fragment>
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
			<button className="nav__avatar image" onClick={handleMock}>
				<img
					src="./images/image-avatar.png"
					alt="user avatar"
					className="image__img"
				/>
			</button>
			{isCartOpen && <Cart handleOpen={handleOpen} />}
			<AnimatePresence>
				{isMenuOpen && <MobileMenu handleClose={() => setIsMenuOpen(false)} />}
			</AnimatePresence>
		</nav>
	);
}

export default Nav;

interface NavLinkable {
	text: string;
	isHovered: boolean;
	onHover: () => void;
	onClick: () => void;
}

function NavLink({ text, isHovered, onHover, onClick }: NavLinkable) {
	return (
		<div className="nav__link-wrapper" onClick={onClick}>
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

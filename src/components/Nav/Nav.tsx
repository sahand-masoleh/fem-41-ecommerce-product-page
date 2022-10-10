/// <reference types="vite-plugin-svgr/client" />
import "./Nav.scss";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as CartIcon } from "@assets/icon-cart.svg";

const links = ["collections", "men", "women", "about", "contact"];

function Nav() {
	const linksMap = [];
	for (let link of links) {
		linksMap.push(<NavLink key={link} text={link} />);
	}
	return (
		<nav className="nav">
			<div className="nav__logo image">
				<Logo className="image__img" />
			</div>
			{linksMap}
			<button className="nav__cart image">
				<CartIcon className="image__img" />
			</button>
			<div className="nav__avatar image">
				<img
					src="./images/image-avatar.png"
					alt="user avatar"
					className="image__img"
				/>
			</div>
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

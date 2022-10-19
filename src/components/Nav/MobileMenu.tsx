import "./MobileMenu.scss";
import links from "./links";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from "@assets/icon-close.svg";

interface Props {
	handleClose: () => void;
}

function MobileMenu({ handleClose }: Props) {
	const linksMapMobile = [];
	for (let link of links) {
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

export default MobileMenu;

function NavLink({ text }: { text: string }) {
	return (
		<a href="#" className="menu__link">
			{text}
		</a>
	);
}

import "./MobileMenu.scss";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import links from "./links";
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
			<motion.div
				className="menu"
				key="menu"
				initial={{ x: "-100%" }}
				animate={{ x: 0 }}
				exit={{ x: "-100%" }}
				transition={{ bounce: false }}
			>
				<button className="menu__close image" onClick={handleClose}>
					<CloseIcon className="image__img" />
				</button>
				{linksMapMobile}
			</motion.div>
			<motion.div
				className="menu__background"
				onClick={handleClose}
				key="background"
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.5 }}
				exit={{ opacity: 0 }}
				transition={{ bounce: false }}
			></motion.div>
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

import "./MobileMenu.scss";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import useToast, { MESSAGES } from "@hooks/useToast";
import links from "./links";
import { ReactComponent as CloseIcon } from "@assets/icon-close.svg";

interface MobileMenuable {
	handleClose: () => void;
}

function MobileMenu({ handleClose }: MobileMenuable) {
	const showToast = useToast();

	function handleMock() {
		showToast && showToast(MESSAGES.MOCK);
	}

	const linksMapMobile = [];
	for (let link of links) {
		linksMapMobile.push(
			<NavLink key={link} text={link} onClick={handleMock} />
		);
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

interface NavLinkable {
	text: string;
	onClick: () => void;
}

function NavLink({ text, onClick }: NavLinkable) {
	return (
		<a href="#" className="menu__link" onClick={onClick}>
			{text}
		</a>
	);
}

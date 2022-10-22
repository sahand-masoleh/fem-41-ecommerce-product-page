import "./FullScreen.scss";
import { createPortal } from "react-dom";
import Gallery from "./Gallery";

interface FullScreenable {
	active: number;
	close: () => void;
}

function FullScreen({ active, close }: FullScreenable) {
	return createPortal(
		<div className="fullscreen">
			<div className="fullscreen__background" onClick={close}></div>
			<div className="fullscreen__wrapper">
				<Gallery inModal active={active} />
			</div>
		</div>,
		document.body
	);
}

export default FullScreen;

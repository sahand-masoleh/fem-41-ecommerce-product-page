import "@styles/reset.scss";
import "@styles/common.scss";
import "./App.scss";

import { CartContextProvider } from "@contexts/CartContext";
import { ToastContextProvider } from "@contexts/ToastContext";
import Nav from "@components/Nav/Nav";
import Gallery from "@components/Gallery/Gallery";
import Description from "@components/Description/Description";

function App() {
	return (
		<div className="app">
			<ToastContextProvider>
				<CartContextProvider>
					<Nav />
					<main className="main">
						<Gallery />
						<div className="main__spacer"></div>
						<Description />
					</main>
				</CartContextProvider>
			</ToastContextProvider>
			<footer className="attribution">
				Coded by{" "}
				<a
					href="https://www.frontendmentor.io/profile/sahand-masoleh"
					target="_blank"
					className="attribution__link"
				>
					Sahand Masoleh
				</a>
				. Challenge by{" "}
				<a
					href="https://www.frontendmentor.io"
					target="_blank"
					className="attribution__link"
				>
					frontendmentor.io
				</a>
			</footer>
		</div>
	);
}

export default App;

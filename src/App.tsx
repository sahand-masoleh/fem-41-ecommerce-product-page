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
		</div>
	);
}

export default App;

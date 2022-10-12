import "@styles/reset.scss";
import "@styles/common.scss";
import "./App.scss";

import Nav from "@components/Nav/Nav";
import Gallery from "@components/Gallery/Gallery";
import Description from "@components/Description/Description";
import { CartContextProvider } from "@contexts/CartContext";

function App() {
	return (
		<div className="app">
			<CartContextProvider>
				<Nav />
				<main className="main">
					<Gallery />
					<div className="main__spacer"></div>
					<Description />
				</main>
			</CartContextProvider>
		</div>
	);
}

export default App;

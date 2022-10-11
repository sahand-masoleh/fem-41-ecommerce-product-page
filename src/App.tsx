import "@styles/reset.scss";
import "@styles/common.scss";
import "./App.scss";

import Nav from "@components/Nav/Nav";
import Gallery from "@components/Gallery/Gallery";
import Description from "@components/Description/Description";
import { CartContextProvider } from "@contexts/CartContext";

function App() {
	return (
		<CartContextProvider>
			<Nav />
			<main className="app">
				<Gallery />
				<Description />
			</main>
		</CartContextProvider>
	);
}

export default App;

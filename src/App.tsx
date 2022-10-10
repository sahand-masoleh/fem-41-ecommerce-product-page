import "@styles/reset.scss";
import "@styles/common.scss";
import "./App.scss";

import Nav from "@components/Nav/Nav";
import Gallery from "@components/Gallery/Gallery";

function App() {
	return (
		<>
			<Nav />
			<main className="app">
				<Gallery />
			</main>
		</>
	);
}

export default App;

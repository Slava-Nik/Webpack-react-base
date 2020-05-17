import React from "react";
import { render } from "react-dom";
import Home from "@components/Home/Home.js";

function App() {
	return (
		<Home/>
	);
}

render(<App />, document.getElementById("app"));

import React, { useState } from "react";
import "./style.scss";
import homePageImage from "@assets/images/react-webpack-babel.png";

function Home() {
	const [count, setCount] = useState(0);
	return (
		<>
			<img className="home-image" src={homePageImage} alt="Home image"/>
			<p className="counter-text">Counter: {count}</p>
			<button
				type="button"
				className="counter-button"
				onClick={() => {
					setCount(count + 1);
				}}
			>
        Increment counter
			</button>
		</>
	);
}

export default Home;
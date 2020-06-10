import React, { useState, useRef, useEffect } from "react";
import homePageImage from "@assets/images/react-webpack-babel.png";
import "./style.scss";


function Timer() {	
	const intervalRef = useRef();
	const timerCountRef = useRef(0);

	useEffect(() => {
		const id = setInterval(() => {
			timerCountRef.current++;
		}, 500);
		intervalRef.current = id;
		return () => {
			clearInterval(intervalRef.current);
		};
	});
	return (
		<span>{timerCountRef.current}</span>
	);
}


function Home() {
	const [count, setCount] = useState(0);
	return (
		<>
			<Timer />
			<img className="home-image" src={homePageImage} alt="Home image" />
			<p className="counter-text">{`Counter: ${count}`}</p>
			<button
				type="button"
				className="counter-button"
				onClick={() => {
					setCount(count + 1);
				}}
			>
        Increment counter.
			</button>
		</>
	);
}

export default Home;

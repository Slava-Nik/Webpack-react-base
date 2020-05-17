import React, { useState } from "react";
import "./style.scss";

function Home() {
	const [count, setCount] = useState(0);
	return (
		<>
			<p>Counter: {count}</p>
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
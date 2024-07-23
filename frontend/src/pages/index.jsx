// pages/index.js

import Hero from "../components/Hero";
import NavBar from "../components/NavBar";

export default function Landing() {
	return (
		<div>
			<NavBar className="z-10" />
			<Hero className="z-0" />
		</div>
	);
}

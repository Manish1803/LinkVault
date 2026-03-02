import { Feature } from "framer-motion";
import Hero from "./Hero";
import styles from "./LandingPage.module.css";
import Navbar from "./Navbar";
import ShaderBackground from "./ShaderBackground";
import Features from "./Feartures";
import Footer from "./Footer";

const LandingPage = () => {
	return (
		<>
			<ShaderBackground />
			<div style={{ position: "relative", zIndex: 1 }}>
				<Navbar />
				<Hero />
				<Features />
				<Footer />
			</div>
		</>
	);
};

export default LandingPage;

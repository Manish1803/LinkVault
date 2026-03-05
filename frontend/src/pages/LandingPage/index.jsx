import Hero from "./Hero";
import Navbar from "./Navbar";
import ShaderBackground from "./ShaderBackground";
import Features from "./Features";
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

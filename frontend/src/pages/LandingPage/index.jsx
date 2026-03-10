import React, { Suspense, lazy } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

const ShaderBackground = lazy(() => import("./components/ShaderBackground"));
const Features = lazy(() => import("./components/Features"));
const Footer = lazy(() => import("./components/Footer"));

const LandingPage = () => {
	return (
		<>
			<Suspense fallback={<Loader />}>
				<ShaderBackground />
			</Suspense>
			<section style={{ position: "relative", zIndex: 1 }}>
				<Navbar />
				<Hero />
				<Suspense fallback={<Loader />}>
					<Features />
					<Footer />
				</Suspense>
			</section>
		</>
	);
};

export default LandingPage;

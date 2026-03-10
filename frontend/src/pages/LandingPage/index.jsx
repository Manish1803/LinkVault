import React, { Suspense, lazy } from "react";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Loader from "./Loader";

const ShaderBackground = lazy(() => import("./ShaderBackground"));
const Features = lazy(() => import("./Features"));
const Footer = lazy(() => import("./Footer"));

const LandingPage = () => {
	return (
		<>
			<Suspense fallback={<Loader />}>
				<ShaderBackground />
			</Suspense>
			<div style={{ position: "relative", zIndex: 1 }}>
				<Navbar />
				<Hero />
				<Suspense fallback={<Loader />}>
					<Features />
					<Footer />
				</Suspense>
			</div>
		</>
	);
};

export default LandingPage;

import { motion } from "framer-motion";
import styles from "./LandingPage.module.css";

const Navbar = () => {
	return (
		<motion.nav
			className={styles.navbar}
			initial={{ y: -80 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className={styles.logo}>
				<img src="/logo.png" alt="LinkVault" />
			</div>
			<div className={styles.navlinks}>
				<a href="#features">Features</a>
				<a href="/auth">Login</a>
				<a href="/auth" className={styles.btnSign}>
					Sign Up
				</a>
			</div>
		</motion.nav>
	);
};

export default Navbar;

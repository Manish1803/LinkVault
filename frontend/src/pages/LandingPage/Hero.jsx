import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import styles from "./LandingPage.module.css";
import Tag from "./Tag";
import { BiLink, BiRightArrowAlt } from "react-icons/bi";

export default function Hero() {
	const [urlText, setUrlText] = useState("");
	const navigate = useNavigate();

	const handleShorten = () => {
		if (urlText.trim()) {
			localStorage.setItem("pendingUrl", urlText.trim());
		}
		navigate("/auth");
	};

	return (
		<section className={styles.hero}>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				<Tag>SIMPLIFIED LINK MANAGEMENT</Tag>
			</motion.p>
			<motion.h1
				className={styles.headline}
				initial={{ opacity: 0, y: 60 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				Make every <span>link</span> count.
			</motion.h1>

			<motion.p
				className={styles.sub}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				Create short, powerful links that help you grow and track your audience.
				Secure, fast, and free to use.
			</motion.p>

			<motion.div
				className={styles.inputUrl}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.8 }}
			>
				<BiLink size="2rem" />
				<input
					type="text"
					placeholder="Paste your long URL here..."
					value={urlText}
					onChange={(e) => setUrlText(e.target.value)}
				/>
				<MagneticButton onClick={handleShorten}>
					Shorten <BiRightArrowAlt size="2rem" />
				</MagneticButton>
			</motion.div>

			<motion.p
				className={styles.terms}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
			>
				By clicking Shorten, you agree to our <span>Terms of Service</span>.
			</motion.p>
		</section>
	);
}

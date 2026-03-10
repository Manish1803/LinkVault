import { motion } from "framer-motion";
import {
	RiFlashlightLine,
	RiLineChartLine,
	RiShieldCheckLine,
} from "react-icons/ri";
import styles from "./Features.module.css";

const features = [
	{
		icon: <RiFlashlightLine size="2.4rem" />,
		title: "Lightning Fast",
		description:
			"Shorten links in under a second with our global edge infrastructure. Performance is our priority.",
	},
	{
		icon: <RiLineChartLine size="2.4rem" />,
		title: "Smart Analytics",
		description:
			"Track clicks, devices, and geographic locations in real-time. Understand your audience better.",
	},
	{
		icon: <RiShieldCheckLine size="2.4rem" />,
		title: "Secure by Design",
		description:
			"Automatic phishing detection and link expiration options keep your content and users safe.",
	},
];

export default function Features() {
	return (
		<section className={styles.section} id="features">
			<div className={styles.container}>
				{features.map((feature) => (
					<motion.div
						key={feature.title}
						className={styles.card}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: features.indexOf(feature) * 0.15 }}
						viewport={{ once: true }}
					>
						<div className={styles.iconWrapper}>{feature.icon}</div>

						<h3 className={styles.title}>{feature.title}</h3>

						<p className={styles.description}>{feature.description}</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}

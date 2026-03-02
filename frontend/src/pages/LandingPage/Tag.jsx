import React from "react";
import { BsStars } from "react-icons/bs";
import styles from "./LandingPage.module.css";

const Tag = ({ children }) => {
	return (
		<div className={styles.tag}>
			<BsStars />
			<span>{children}</span>
		</div>
	);
};

export default Tag;

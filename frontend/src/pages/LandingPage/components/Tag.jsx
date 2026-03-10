import { BsStars } from "react-icons/bs";

const tagStyle = {
	fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  color: "var(--color-primary)",
  backgroundColor: "var(--color-bg-tag)"
}


const Tag = ({ children }) => {
	return (
		<div style={tagStyle}>
			<BsStars />
			<span>{children}</span>
		</div>
	);
};

export default Tag;

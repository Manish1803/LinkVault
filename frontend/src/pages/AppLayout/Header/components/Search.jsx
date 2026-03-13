import { IoSearch } from "react-icons/io5";
import { useApp } from "./../../../../contexts/AppContext";
import { useNavigate } from "react-router";

const styles = {
  search: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    border: "1px solid var(--color-border)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "0.6rem",
    padding: "1rem",
    color: "var(--color-text-primary)",
    marginRight: "3rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    color: "var(--color-text-primary)",
    fontSize: "1.4rem",
  },
};

function Search() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useApp();

  const handleFocus = () => {
    navigate("/app/links");
  };

  return (
    <div style={styles.search}>
      <IoSearch size="2rem" />
      <input
        type="text"
        placeholder="Search by remarks"
        style={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleFocus}
      />
    </div>
  );
}

export default Search;

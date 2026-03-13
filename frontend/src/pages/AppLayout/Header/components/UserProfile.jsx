import { useNavigate } from "react-router";
import { useAuth } from "./../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";

function UserProfile() {
  const navigate = useNavigate();
  const { user, fetchUser, getInitials, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.profilePic}
        onClick={() => setIsOpen((is) => !is)}
      >
        {getInitials(user?.name)}
      </div>
      {isOpen && (
        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default UserProfile;

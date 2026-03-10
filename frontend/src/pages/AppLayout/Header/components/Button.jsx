import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useApp } from "./../../../../contexts/AppContext";

import Overlay from "./../../../AppComponents/Overlay";
import LinkModal from "../../../AppComponents/LinkModal";

function Button() {
  const { createNewLink } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [initialUrl, setInitialUrl] = useState("");

  useEffect(() => {
    const pendingUrl = localStorage.getItem("pendingUrl");
    if (pendingUrl) {
      setInitialUrl(pendingUrl);
      setIsOpen(true);
      localStorage.removeItem("pendingUrl");
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setInitialUrl("");
  };

  return (
    <>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "1rem 1.5rem",
          borderRadius: "0.5rem",
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          fontWeight: "500",
        }}
        onClick={() => setIsOpen((is) => !is)}
      >
        <GoPlus size="2rem" /> <span>Create new</span>
      </button>
      {isOpen && (
        <Overlay>
          <LinkModal
            onClose={handleClose}
            onSubmit={createNewLink}
            action="create"
            initialUrl={initialUrl}
          />
        </Overlay>
      )}
    </>
  );
}

export default Button;

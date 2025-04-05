import { useState } from "react";

import "../css/DeleteModal.css";
import { useDispatch } from "react-redux";
import { fetchReset } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function ResetModal({ closeModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isResetting, setIsDeleting] = useState(false);

  const handleReset = async () => {
    setIsDeleting(true);

    const { message } = await dispatch(fetchReset()).unwrap();

    setMessage(message);
    setTimeout(() => {
      closeModal();
      navigate("/");
    }, 1500);
  };

  return (
    <div className="delete-modal" id="delete-modal">
      <div className="delete-modal-form">
        <div className="delete-message" id="delete-message">
          {!message && !isResetting
            ? "Are you sure you want to reset Database? This action cannot be undone. Once reset, all data will be returned to initial state and all the latest changes will be deleted permanently."
            : !message && isResetting
              ? "Resetting Database. This can take some time. Please be patient and do not engage any actions. Interrupting the process will cause critical errors."
              : message}
        </div>
        <div className="button-holder" id="button-holder">
          <button
            className="delete-button confirm"
            id="delete-confirm"
            onClick={handleReset}
            disabled={isResetting}
          >
            {isResetting ? "RESETTING..." : "RESET"}
          </button>
          <button
            className="delete-button cancel"
            id="delete-cancel"
            onClick={closeModal}
            disabled={isResetting}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetModal;

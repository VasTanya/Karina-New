import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/SimpleModal.css";

function IsAddingModal({ item, path, result }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(result);

  useEffect(() => {
    setMessage(result);
    if (result) {
      setTimeout(() => {
        navigate(`/${path}`);
      }, 1500);
    }
  }, [result, path, navigate]);

  return (
    <div className="simple-modal" id="simple-modal">
      <div className="simple-modal-form">
        <div className="simple-message" id="simple-message">
          {!message
            ? `Adding ${item || "item"}. Please be patient interrupting the process will cause critical errors.`
            : message || `${item || "Item"} added successfully`}
        </div>
      </div>
    </div>
  );
}

export default IsAddingModal;

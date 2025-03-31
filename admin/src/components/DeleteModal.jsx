import React, { useState } from "react";

import "../css/DeleteModal.css";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchSlice } from "../redux/deleteSlice";

function DeleteModal({ item, closeModal, refresh }) {
  const dispatch = useDispatch();

  const path = useLocation().pathname;
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const { _id } = item;
    const { message } = await dispatch(
      fetchSlice({ path, param: _id })
    ).unwrap();

    setMessage(message);
    setTimeout(() => {
      closeModal();
      refresh();
    }, 1500);
  };

  return (
    <div className="delete-modal" id="delete-modal">
      <div className="delete-modal-form">
        <div className="delete-message" id="delete-message">
          {!message && !isDeleting
            ? `Are you sure you want to delete ${
                item.title || item.display_number
              }`
            : !message && isDeleting
              ? "Deleting items can take some time. Please be patient and do not engage any actions. Interrupting the process will cause critical errors."
              : message}
        </div>
        <div className="button-holder" id="button-holder">
          <button
            className="delete-button confirm"
            id="delete-confirm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "DELETING..." : "DELETE"}
          </button>
          <button
            className="delete-button cancel"
            id="delete-cancel"
            onClick={closeModal}
            disabled={isDeleting}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

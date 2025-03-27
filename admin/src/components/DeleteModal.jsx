import React from "react";

import "../css/DeleteModal.css";

function DeleteModal({ item, closeModal }) {
  return (
    <div className="delete-modal" id="delete-modal">
      <div className="delete-modal-form">
        <div
          className="delete-message"
          id="delete-message"
        >{`Are you sure you want to delete ${
          item.title || item.display_number
        }`}</div>
        <div className="button-holder" id="button-holder">
          <button className="delete-button confirm" id="delete-confirm">
            DELETE
          </button>
          <button
            className="delete-button cancel"
            id="delete-cancel"
            onClick={closeModal}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

import { useEffect, useState } from "react";

import "../css/EditModal.css";

function EditModal({ item, closeModal }) {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    ...(item._id && { _id: "" }),
    ...(item.display_number && { display_number: "" }),
    ...(item.album_number && { album_number: "" }),
    ...(item.title && { title: "" }),
    ...(item.price && { price: "" }),
    ...(item.src && { src: "" }),
  });

  const handleSave = () => {
    closeModal();
  };

  useEffect(() => {
    if (item) {
      setFormData({
        ...(item._id && { _id: item._id }),
        ...(item.display_number && { display_number: item.display_number }),
        ...(item.album_number && { album_number: item.album_number }),
        ...(item.title && { title: item.title }),
        ...(item.price && { price: item.price }),
        ...(item.src && { src: item.src }),
      });
    }
  }, [item]);

  return (
    <div className="edit-modal" id="edit-modal">
      <div id="edit-modal-form">
        <div className="edit-modal-inputs" id="edit-modal-inputs">
          <input
            type="text"
            className="edit-modal-textInput"
            value={formData._id}
            disabled
          />
          <input
            type="text"
            className="edit-modal-textInput"
            value={formData.display_number || formData.album_number}
            onChange={(e) =>
              setFormData({
                ...formData,
                [formData.display_number ? "display_number" : "album_number"]:
                  e.target.value,
              })
            }
          />
          {formData.title && (
            <input
              type="text"
              className="edit-modal-textInput"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          )}
          {formData.price && (
            <input
              type="text"
              className="edit-modal-textInput"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          )}
          {formData.src && (
            <>
              <img
                className="edit-modal-textInput edit-modal-img"
                src={formData.src?.lg || formData.src.md || formData.src.sm}
                alt=""
              />
              <input
                type="file"
                name="img"
                accept="image/*"
                className="edit-modal-textInput"
              />
            </>
          )}
        </div>
        <div className="edit-modal-message" id="edit-modal-message">
          {message}
        </div>
        <div className="edit-modal-buttons" id="edit-modal-buttons">
          <button className="edit-button" id="edit-save" onClick={handleSave}>
            SAVE
          </button>
          <button
            type="button"
            className="edit-button"
            id="edit-cancel"
            onClick={closeModal}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;

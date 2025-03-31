import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchSlice } from "../redux/updateSlice";

import { mapModalData } from "../helpers/mapModalData";
import "../css/EditModal.css";

function EditModal({ item, closeModal, refresh }) {
  const dispatch = useDispatch();

  const path = useLocation().pathname;
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(() => mapModalData(item));
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const { _id, src, ...rest } = formData;
    const { message } = await dispatch(
      fetchSlice({ path, param: _id, data: rest })
    ).unwrap();

    setMessage(message);
    setTimeout(() => {
      closeModal();
      refresh();
    }, 1500);
  };

  useEffect(() => {
    if (item) {
      setFormData((prevData) => mapModalData(item, prevData));
    }
  }, [item, dispatch]);

  return (
    <div className="edit-modal" id="edit-modal">
      <div id="edit-modal-form">
        <div className="edit-modal-inputs" id="edit-modal-inputs">
          <input
            type="text"
            className="edit-modal-textInput"
            value={formData._id || ""}
            disabled
          />
          <input
            type="text"
            className="edit-modal-textInput"
            value={
              (formData.display_number
                ? formData.display_number
                : formData.album_number) || ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                [formData.display_number !== undefined
                  ? "display_number"
                  : "album_number"]: e.target.value,
              })
            }
          />
          {formData.title && (
            <input
              type="text"
              className="edit-modal-textInput"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          )}
          {formData.price && (
            <input
              type="text"
              className="edit-modal-textInput"
              value={formData.price || ""}
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
          <button
            className="edit-button"
            id="edit-save"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "SAVING..." : "SAVE"}
          </button>
          <button
            type="button"
            className="edit-button"
            id="edit-cancel"
            onClick={closeModal}
            disabled={isSaving}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;

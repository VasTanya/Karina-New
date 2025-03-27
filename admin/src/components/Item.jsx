import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/Item.css";

function Item({ item, openEditModal, openDeleteModal }) {
  const navigate = useNavigate();

  const fetchItems = (id) => {
    navigate(`/albums/${id}`);
  };

  return (
    <tr>
      <td className="td">{item._id}</td>
      <td className="td">{item.display_number || item.album_number}</td>
      {item.title && <td className="td">{item.title}</td>}
      {item.price && <td className="td">{item.price}</td>}
      {item.src && (
        <td className="td">
          <img className="img" src={item.src.sm} alt="" />
        </td>
      )}
      <td className="td">
        <button className="data-edit" onClick={() => openEditModal(item)}>
          EDIT
        </button>
      </td>
      <td className="td">
        <button className="data-delete" onClick={() => openDeleteModal(item)}>
          DELETE
        </button>
      </td>
      {item.album_number && (
        <td className="td">
          <button className="data-delete" onClick={() => fetchItems(item._id)}>
            VIEW
          </button>
        </td>
      )}
    </tr>
  );
}

export default Item;

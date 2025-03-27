import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSlice } from "../redux/getAlbums";

import Item from "../components/Item";

import "../css/Products.css";
import { useOutletContext } from "react-router-dom";

function Albums() {
  const { openEditModal, openDeleteModal } = useOutletContext();

  const dispatch = useDispatch();
  const { data, status } = useSelector((store) => store.albums);

  useEffect(() => {
    dispatch(fetchSlice());
  }, [dispatch]);

  return (
    <div
      className="productsContainer"
      style={status !== "successful" ? { height: "100%" } : {}}
    >
      {status === "error" ? (
        <div className="status">Failed to load</div>
      ) : status === "loading" ? (
        <div className="status">Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="row">ID</th>
              <th className="row">ALBUM NUMBER</th>
              <th className="row">TITLE</th>
              <th className="row">BUTTONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <Item
                  key={item._id}
                  item={item}
                  openEditModal={openEditModal}
                  openDeleteModal={openDeleteModal}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Albums;

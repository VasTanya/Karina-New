import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import { fetchSlice } from "../redux/getBasics";

import Item from "../components/Item";

import "../css/Products.css";

function Basics() {
  const { openEditModal, openDeleteModal } = useOutletContext();

  const { type } = useParams();
  const dispatch = useDispatch();
  const { data, status } = useSelector((store) => store.basics);

  const fetchData = async () => dispatch(fetchSlice({ param: type }));

  useEffect(() => {
    fetchData();
  }, [dispatch, type]);

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
              <th className="row">DISPLAY NUMBER</th>
              <th className="row">TITLE</th>
              <th className="row">PRICE</th>
              <th className="row">IMAGE</th>
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
                  refresh={fetchData}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Basics;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import { fetchSlice } from "../redux/getAlbumItems";

import Item from "../components/Item";
import PaginationComponent from "../components/PaginationComponent";

import "../css/Products.css";

function AlbumItem() {
  const { openEditModal, openDeleteModal } = useOutletContext();

  const [page, setPage] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: { data, ...item },
    status,
  } = useSelector((store) => store.albumItems);

  const onPageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(fetchSlice({ param: id, page, size: 48 }));
  }, [dispatch, id, page]);

  return status === "error" ? (
    <div className="status">Failed to load</div>
  ) : status === "loading" ? (
    <div className="status">Loading...</div>
  ) : !data.length ? (
    <div className="status">No data to display</div>
  ) : (
    <div
      className="productsContainer"
      style={status !== "successful" ? { height: "100%" } : {}}
    >
      <table className="table">
        <thead>
          <tr>
            <th className="row">ID</th>
            <th className="row">DISPLAY NUMBER</th>
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
              />
            );
          })}
        </tbody>
      </table>
      <PaginationComponent
        currentPage={page}
        handleClick={(num) => onPageChange(num)}
        count={item.count}
      ></PaginationComponent>
    </div>
  );
}

export default AlbumItem;

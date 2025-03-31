import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

import "../css/Home.css";

function Home() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refresh, setRefresh] = useState([]);

  const openEditModal = (item, refresh) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
    setRefresh(() => refresh);
  };

  const openDeleteModal = (item, refresh) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
    setRefresh(() => refresh);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <Outlet context={{ openEditModal, openDeleteModal }} />
      </div>
      {isEditModalOpen && (
        <EditModal
          item={selectedItem}
          closeModal={() => closeModal(setIsEditModalOpen)}
          refresh={refresh}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          item={selectedItem}
          closeModal={() => closeModal(setIsDeleteModalOpen)}
          refresh={refresh}
        />
      )}
    </>
  );
}

export default Home;

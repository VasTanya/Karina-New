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

  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
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
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          item={selectedItem}
          closeModal={() => closeModal(setIsDeleteModalOpen)}
        />
      )}
    </>
  );
}

export default Home;

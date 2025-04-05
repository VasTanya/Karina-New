import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

import "../css/Home.css";
import ResetModal from "../components/ResetModal";

function Home() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
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

  const openResetModal = () => {
    setIsResetModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsResetModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Navbar openResetModal={openResetModal}></Navbar>
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
      {isResetModalOpen && (
        <ResetModal closeModal={() => closeModal(setIsResetModalOpen)} />
      )}
    </>
  );
}

export default Home;

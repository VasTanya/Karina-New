import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Basics from "./pages/Basics";
import Albums from "./pages/Albums";
import AlbumItems from "./pages/AlbumItems";
import AddProduct from "./pages/AddProduct";

import { defineUserStatus } from "./helpers/defineUserStatus";
import { checkAuth } from "./redux/userSlice";

import "./css/App.css";
import { serviceAccount } from "./firebase/config/firebase.config";

function App() {
  console.log(serviceAccount);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const status = defineUserStatus(user.status);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={status ? <Home /> : <Login />}>
          <Route path="/basics/:type" element={<Basics />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:id" element={<AlbumItems />} />
          <Route path="/add" element={<AddProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

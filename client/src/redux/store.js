import { configureStore } from "@reduxjs/toolkit";
import cakeSlice from "./slice/cakeSlice";
import getUrlSlice from "./slice/getUrlSlice";
import getUrlFirstFoto from "./slice/getUrlFirstFoto";
import getUrlRegular from "./slice/getUrlRegular";
import getUrlAlbums from "./slice/getUrlAlbums";
import getUrl_Id_Albums from "./slice/getUrl_Id_Albums";
import getUrl_Id_Item from "./slice/getUrl_Id_Item";
import getUrl_Search from "./slice/getUrl_Search";
import getUrl_Request from "./slice/getUrl_Request";
import getUrl_MyDesign from "./slice/getUrl_MyDesign";

export const store = configureStore({
  reducer: {
    cakeSlice,
    getUrlSlice,
    getUrlFirstFoto,
    getUrlRegular,
    getUrlAlbums,
    getUrl_Id_Albums,
    getUrl_Id_Item,
    getUrl_Search,
    getUrl_Request,
    getUrl_MyDesign
  },
});

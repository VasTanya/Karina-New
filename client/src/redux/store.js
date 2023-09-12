import { configureStore } from "@reduxjs/toolkit";
import cakeSlice from "./slice/cakeSlice";
import getUrlSlice from "./slice/getUrlSlice";
import getUrlFirstFoto from "./slice/getUrlFirstFoto";
import getUrlRegular from "./slice/getUrlRegular";
import getUrlAlbums from './slice/getUrlAlbums';
import getUrl_Id_Albums from "./slice/getUrl_Id_Albums";


export const store = configureStore({
    reducer:{
        cakeSlice,
        getUrlSlice,
        getUrlFirstFoto,
        getUrlRegular,
        getUrlAlbums,
        getUrl_Id_Albums,
               
    }
})
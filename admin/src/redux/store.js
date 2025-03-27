import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import basicsReducer from "./getBasics";
import albumsReducer from "./getAlbums";
import albumItemsReducer from "./getAlbumItems";

export default configureStore({
  reducer: {
    user: userReducer,
    basics: basicsReducer,
    albums: albumsReducer,
    albumItems: albumItemsReducer,
  },
});

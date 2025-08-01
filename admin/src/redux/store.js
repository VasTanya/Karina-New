import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import basicsReducer from "./getBasics";
import albumsReducer from "./getAlbums";
import albumItemsReducer from "./getAlbumItems";
import createReducer from "./createSlice";
import updateReducer from "./updateSlice";
import deleteReducer from "./deleteSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    basics: basicsReducer,
    albums: albumsReducer,
    albumItems: albumItemsReducer,
    create: createReducer,
    update: updateReducer,
    delete: deleteReducer,
  },
});

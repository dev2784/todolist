import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listReducer";

export default configureStore({
  reducer: {
    listing: listReducer,
  },
});

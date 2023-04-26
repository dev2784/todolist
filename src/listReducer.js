import { createSlice } from "@reduxjs/toolkit";

export const listReducer = createSlice({
  name: "listing",
  initialState: {
    list: [
      { id: "1", todo: "mytodo", time: "22:00", status: "pending" },
      { id: "2", todo: "yourtodo", time: "22:00", status: "pending" },
      { id: "3", todo: "ustodo", time: "22:00", status: "pending" },
    ],
  },
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
    edit: (state, action) => {
      let val = state.list;
      let id = val.findIndex((item) => item.id === action.payload.id);
      val[id] = action.payload;
      state.list = val;
    },
    statusChange: (state, action) => {
      let val = state.list;
      let id = val.findIndex((item) => item.id === action.payload);
      val[id].status = "completed";
      state.list = val;
    },
    completedRemove: (state) => {
      let val = state.list;
      let completedData = val.filter((item) => item.status === "pending");
      state.list = completedData;
    },
    remove: (state, action) => {
      let val = state.list;
      let id = val.filter((item) => item.id === action.payload.id);
      val.splice(id, 1);
      state.list = val;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, edit, remove, statusChange, completedRemove } =
  listReducer.actions;

export default listReducer.reducer;

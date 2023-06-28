import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  cord: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.cord = action.payload.cord;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.cord = null;
      state.token = null;
    },
    setCord: (state, action) => {
      state.cord = action.payload.cord;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setCord,

} = authSlice.actions;
export default authSlice.reducer;


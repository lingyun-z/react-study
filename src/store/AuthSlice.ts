import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../lib/request";

interface AuthState {
  userName: string;
}

const initialState: AuthState = {
  userName: "",
};

export const currentUserInfo = createAsyncThunk("auth/currentUserInfo", () => {
  return request({
    url: "/user/info",
  });
});

export const login = createAsyncThunk(
  "auth/login",
  (args: { userName: string }) => {
    return request({
      url: "/login",
      method: "POST",
      data: {
        userName: args.userName,
      },
    });
  }
);

const todoSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userName = action.payload.userName;
    });
    builder.addCase(login.rejected, (state, _action) => {
      state.userName = "";
    });

    builder.addCase(currentUserInfo.fulfilled, (state, action) => {
      state.userName = action.payload.userName;
    });
    builder.addCase(currentUserInfo.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export default todoSlice.reducer;

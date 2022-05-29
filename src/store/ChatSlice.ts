import { createSlice } from "@reduxjs/toolkit";
import { ChatRoom } from "../types";

interface AuthState {
  room: ChatRoom;
}

const initialState: AuthState = {
  room: null,
};

const todoSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatRoom: (state, action) => {
      return { ...state, room: { ...action.payload } };
    },

    removeChatRoom: (state, action) => {
      return { ...state, room: { ...action.payload } };
    },
  },
});

export const { setChatRoom, removeChatRoom } = todoSlice.actions;

export default todoSlice.reducer;

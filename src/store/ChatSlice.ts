import { createSlice } from "@reduxjs/toolkit";
import { ChatMessage, ChatRoom } from "../types";

interface AuthState {
  selectedRoom: ChatRoom;
  roomMessage: Record<string, ChatMessage[]>;
}

const initialState: AuthState = {
  selectedRoom: null,
  roomMessage: {},
};

const todoSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatRoom: (state, { payload }) => {
      state.selectedRoom = payload;
      if (!state.roomMessage[payload.id]) {
        state.roomMessage[payload.id] = [];
      }
    },
    addMessage: (state, { payload: { id, message } }) => {
      if (!state.roomMessage[id]) {
        state.roomMessage[id] = [message];
      } else {
        state.roomMessage[id].unshift(message);
      }
    },
    initMessage: (state, { payload: { id, messages } }) => {
      state.roomMessage[id] = messages;
    },
  },
});

export const { setChatRoom, addMessage, initMessage } = todoSlice.actions;

export default todoSlice.reducer;

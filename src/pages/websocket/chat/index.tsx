import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ChatRoom from "../../../component/chat/ChatRoom";
import ChatLayout from "../../../component/chat/Layout";
import RoomList from "../../../component/chat/RoomList";
import { useAppDispatch } from "../../../lib/reduxHook";
import useSocketSetup from "../../../lib/useSocketSetup";
import { addMessage } from "../../../store/ChatSlice";

const Chat = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const socket = useSocketSetup({
    errorHandler: () => router.push("/login"),
  });

  useEffect(() => {
    socket.on("chatMessage", (payload) => {
      dispatch(addMessage({ id: payload.from, message: payload }));
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(20%, 250px) auto",
      }}
    >
      <ChatLayout>
        <RoomList />
      </ChatLayout>
      <ChatRoom />
    </div>
  );
};

export default Chat;

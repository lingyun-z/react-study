import { useRouter } from "next/router";
import React from "react";
import ChatLayout from "../../../component/chat/Layout";
import RoomList from "../../../component/chat/RoomList";
import useScoketSetup from "../../../lib/useSocketSetup";

const Chat = () => {
  const router = useRouter();

  useScoketSetup({
    errorHandler: () => router.push("/login"),
  });

  return (
    <ChatLayout>
      <RoomList />
    </ChatLayout>
  );
};

export default Chat;

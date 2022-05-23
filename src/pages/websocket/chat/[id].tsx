import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ChatRoom from "../../../component/chat/ChatRoom";
import { useAppSelector } from "../../../lib/reduxHook";

const Case = () => {
  const { room } = useAppSelector((state) => state.chatSlice);
  const router = useRouter();

  useEffect(() => {
    if (!room) {
      router.push("/websocket/chat");
    }
  }, [room, router]);

  return room && <ChatRoom />;
};

export default Case;

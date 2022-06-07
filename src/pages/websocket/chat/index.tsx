import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ChatRoom from "../../../component/chat/ChatRoom";
import ChatLayout from "../../../component/chat/Layout";
import RoomList from "../../../component/chat/RoomList";
import { useChatMessageIDB } from "../../../lib/IDB/useIDB";
import { useAppDispatch } from "../../../lib/reduxHook";
import useSocketSetup from "../../../lib/useSocketSetup";
import { currentUserInfo } from "../../../store/AuthSlice";
import { addMessage } from "../../../store/ChatSlice";

const Chat = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const socket = useSocketSetup({
    errorHandler: () => router.push("/login"),
  });
  const { saveMessage } = useChatMessageIDB();

  useEffect(() => {
    socket.on("chatMessage", (payload: any) => {
      saveMessage(payload.timestamp, payload, payload.from);
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

const withAuthorize = (WrappedComponent) => {
  return React.memo(function Wrapper(props) {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
      const getUserInfo = async () => {
        try {
          await dispatch(currentUserInfo());
          setIsLoading(false);
        } catch (error) {
          router.push("/login");
        }
      };

      getUserInfo();
    }, []);

    return isLoading ? <>Loading...</> : <WrappedComponent {...props} />;
  });
};

export default withAuthorize(Chat);

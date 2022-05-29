import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../lib/reduxHook";
import socket from "../../lib/socket";
import { WebSocketEvent } from "../../types";

interface ChatMessage {
  from: string;
  message: string;
}

const ChatRoom = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const router = useRouter();
  const { room } = useAppSelector((state) => state.chatSlice);
  const userName = useAppSelector((state) => state.authSlice.userName);

  const sendChatMessage = (to: string, message: any) => {
    socket.emit("chatMessage", { to, message });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      sendChatMessage(room.id, value);
      setMessages((prevState) => [
        ...prevState,
        { from: userName, message: value },
      ]);
      setValue("");
    }
  };

  useEffect(() => {
    socket.on(WebSocketEvent.CHAT_MESSAGE, (payload) => {
      setMessages((prevState) => [...prevState, payload]);
    });

    return () => {
      socket.off(WebSocketEvent.CHAT_MESSAGE);
    };
  }, []);

  const backBtnClickHandler = () => {
    router.push("/websocket/chat");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "relative",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "3rem",
          borderBottom: "1px solid #cccccc",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0.5rem",
            cursor: "pointer",
          }}
          onClick={backBtnClickHandler}
        >
          back
        </div>
        <p
          style={{
            margin: 0,
          }}
        >
          {room?.name}
        </p>
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          background: "#eeeeee",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            flexGrow: "1",
            padding: "0.5rem",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                margin: "0.5rem 0",
                flexDirection:
                  message.from === userName ? "row-reverse" : "row",
              }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  background: message.from === userName ? "#223344" : "#00aa44",
                  borderRadius: "3px",
                }}
              />
              <div
                style={{
                  margin: "0 0.5rem",
                  padding: "0.5rem",
                  borderRadius: "3px",
                  background:
                    message.from === userName ? "rgb(125,233,108)" : "white",
                }}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #cccccc",
            padding: "0.5rem",
            flexShrink: 0,
          }}
        >
          <input
            value={value}
            onChange={changeHandler}
            style={{
              marginRight: ".5rem",
              flexGrow: "1",
              padding: ".5rem",
            }}
          />
          <button type="submit">Send!</button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;

import React, { useEffect, useState } from "react";
import { MessageValue, useChatMessageIDB } from "../../lib/IDB/useIDB";
import { useAppDispatch, useAppSelector } from "../../lib/reduxHook";
import socket from "../../lib/socket";
import { addMessage, initMessage } from "../../store/ChatSlice";

const ChatRoom = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const { selectedRoom, roomMessage } = useAppSelector(
    (state) => state.chatSlice
  );
  const userName = useAppSelector((state) => state.authSlice.userName);
  const { saveMessage, getRoomMessage } = useChatMessageIDB();

  const sendChatMessage = (message: MessageValue) => {
    socket.emit("chatMessage", message);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      const message = {
        content: value,
        timestamp: new Date().getTime(),
        from: userName,
        to: selectedRoom.id,
      };
      saveMessage(message.timestamp, message, message.to);
      sendChatMessage(message);
      dispatch(
        addMessage({
          id: selectedRoom.id,
          message,
        })
      );
      setValue("");
    }
  };

  const initRoom = async () => {
    if (selectedRoom?.id) {
      const result = await getRoomMessage(selectedRoom.id);
      dispatch(initMessage({ id: selectedRoom.id, messages: result }));
    }
  };

  useEffect(() => {
    initRoom();
  }, [selectedRoom?.id]);

  return selectedRoom ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "3rem",
          borderBottom: "1px solid #cccccc",
        }}
      >
        <p
          style={{
            margin: 0,
          }}
        >
          {selectedRoom?.name}
        </p>
      </div>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column-reverse",
          width: "100%",
          padding: "0 0.75rem",
          background: "#eeeeee",
          overflowX: "auto",
        }}
      >
        {roomMessage[selectedRoom.id].map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              margin: "0.5rem 0",
              flexDirection: message.from === userName ? "row-reverse" : "row",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                background: message.from === userName ? "#223344" : "#00aa44",
                borderRadius: "3px",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                margin: "0 0.5rem",
                padding: "0.5rem",
                borderRadius: "3px",
                background:
                  message.from === userName ? "rgb(125,233,108)" : "white",
                wordBreak: "break-word",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
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
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#999999",
      }}
    >
      没有选择聊天
    </div>
  );
};

export default ChatRoom;

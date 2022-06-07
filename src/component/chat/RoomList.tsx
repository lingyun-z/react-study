import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/reduxHook";
import request from "../../lib/request";
import socket from "../../lib/socket";
import { setChatRoom } from "../../store/ChatSlice";
import { ChatMessage, ChatRoom, WebSocketEvent } from "../../types";

interface RoomProps {
  room: ChatRoom;
  recentMessage: ChatMessage;
  isSelectedRoom: boolean;
}

const Room = (props: RoomProps) => {
  const { room, recentMessage, isSelectedRoom } = props;
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(setChatRoom(room));
  };

  return (
    <div
      style={{
        display: "flex",
        height: "4rem",
        width: "100%",
        padding: "0.5rem",
        borderBottom: "1px solid #24272c",
        cursor: "pointer",
        background: isSelectedRoom ? "#3a3f45" : "inherit",
      }}
      onClick={clickHandler}
    >
      <div
        style={{
          height: "3rem",
          width: "3rem",
          background: "#ff3344",
          borderRadius: "5px",
          flexShrink: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "0.5rem",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <p style={{ margin: 0 }}>{room.name}</p>
        <p
          style={{
            margin: 0,
            color: "#999999",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {recentMessage?.content}
        </p>
      </div>
    </div>
  );
};

const RoomList = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const { selectedRoom, roomMessage } = useAppSelector(
    (state) => state.chatSlice
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const fetchFriends = async () => {
    try {
      setIsLoading(true);
      setIsFailed(false);
      const data = await request({ url: "/chat/online-users" });
      setRooms(data.users);
    } catch (error) {
      setIsFailed(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();

    socket.on(WebSocketEvent.USER_ONLINE, (payload) => {
      const { userId } = payload;
      setRooms((prevState) => [...prevState, { id: userId, name: userId }]);
    });

    socket.on(WebSocketEvent.USER_OFFLINE, (payload) => {
      const { userId } = payload;
      setRooms((prevState) => prevState.filter(({ id }) => id !== userId));
    });

    return () => {
      socket.off(WebSocketEvent.USER_OFFLINE);
      socket.off(WebSocketEvent.USER_ONLINE);
    };
  }, []);

  return (
    <div>
      {rooms.map((room) => (
        <Room
          key={room.id}
          room={room}
          recentMessage={roomMessage[room.id]?.[0]}
          isSelectedRoom={selectedRoom?.id === room.id}
        />
      ))}
    </div>
  );
};

export default RoomList;

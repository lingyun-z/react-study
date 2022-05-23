import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../lib/reduxHook";
import request from "../../lib/request";
import { setChatRoom } from "../../store/ChatSlice";
import { ChatRoom } from "../../types";

interface FriendProps {
  room: ChatRoom;
}

const Room = (props: FriendProps) => {
  const { room } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const clickHandler = () => {
    dispatch(setChatRoom(room));
    router.push(`/websocket/chat/${room.id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "4rem",
        padding: "0.5rem",
        borderBottom: "1px solid #cccccc",
      }}
      onClick={clickHandler}
    >
      <div
        style={{
          height: "3rem",
          width: "3rem",
          background: "#223344",
          marginRight: "0.5rem",
          borderRadius: "5px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ margin: 0 }}>{room.name}</p>
      </div>
    </div>
  );
};

const RoomList = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
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
  }, []);

  return (
    <div>
      {rooms.map((room) => (
        <Room key={room.id} room={room} />
      ))}
      <button onClick={fetchFriends}>refresh</button>
    </div>
  );
};

export default RoomList;

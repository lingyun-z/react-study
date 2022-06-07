import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../types";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.NEXT_PUBLIC_API_URL,
  {
    autoConnect: false,
    withCredentials: true,
    transports: ["websocket"],
  }
);

export default socket;

import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../types";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:8080",
  {
    autoConnect: false,
    withCredentials: true,
    transports: ["websocket"],
  }
);

export default socket;

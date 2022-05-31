import { useEffect } from "react";
import socket from "./socket";

interface SocketSetupProps {
  connectHandler?: () => void;
  errorHandler?: () => void;
}

const useSocketSetup = (props: SocketSetupProps) => {
  const { connectHandler, errorHandler } = props;

  useEffect(() => {
    if (socket.disconnected) {
      socket.connect();
      socket.on("connect_error", (err) => {
        console.error(err);
        errorHandler?.();
      });

      socket.on("connect", () => {
        connectHandler?.();
      });

      return () => {
        socket.off("connect");
        socket.off("connect_error");
      };
    }
  }, []);

  return socket;
};

export default useSocketSetup;

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHook";
import socket from "./socket";

interface ScoketSetupProps {
  connectHandler?: () => void;
  errorHandler?: () => void;
}

const useScoketSetup = (props: ScoketSetupProps) => {
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
    }

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  return socket;
};

export default useScoketSetup;

import { io } from "socket.io-client";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function useSocket() {
  const socketRef = useRef();
  const [connected, setConnected] = useState(false);
  const [commandHandlers, setCommandHandlers] = useState(new Map());

  /** Dispatch */
  const dispatch = (data) => {
    if (socketRef.current.connected) {
      socketRef.current.send(data);
    }
  };

  /** Set command handlers */
  const addCommandHandlers = (handlersToAdd) => {
    setCommandHandlers((prev) => {
      const newMap = new Map(prev);

      Object.entries(handlersToAdd).forEach(([k, v]) => newMap.set(k, v));

      return newMap;
    });
  };

  /** Remove command handlers */
  const removeCommandHandlers = (handlersToRemove) => {
    setCommandHandlers((prev) => {
      const newMap = new Map(prev);

      Object.keys(handlersToRemove).forEach((k) => newMap.delete(k));

      return newMap;
    });
  };

  /** Instantiate Socket */
  useEffect(() => {
    const socket = (socketRef.current = io("ws://127.0.0.1:7777"));

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.removeAllListeners();
      socket.close();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    const actionHandler = (arg) => {
      const callback = commandHandlers.get(arg.action);
      if (callback) {
        callback(arg);
      }
    };

    socketRef.current?.on("command", actionHandler);

    return () => {
      socketRef.current?.off("command", actionHandler);
    };
  }, [commandHandlers]);

  return {
    addCommandHandlers,
    removeCommandHandlers,
    connected,
    dispatch,
  };
}

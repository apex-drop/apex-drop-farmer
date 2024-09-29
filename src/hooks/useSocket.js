import { io } from "socket.io-client";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function useSocket() {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [commandHandlers, setCommandHandlers] = useState(new Map());

  /** Dispatch */
  const dispatch = useCallback(
    (data) => {
      if (socketRef.current.connected) {
        socketRef.current.send(data);
      }
    },
    [socketRef]
  );

  /** Set command handlers */
  const addCommandHandlers = useCallback(
    (handlersToAdd) => {
      setCommandHandlers((prev) => {
        const newMap = new Map(prev);

        Object.entries(handlersToAdd).forEach(([k, v]) => newMap.set(k, v));

        return newMap;
      });
    },
    [setCommandHandlers]
  );

  /** Remove command handlers */
  const removeCommandHandlers = useCallback(
    (handlersToRemove) => {
      setCommandHandlers((prev) => {
        const newMap = new Map(prev);

        Object.keys(handlersToRemove).forEach((k) => newMap.delete(k));

        return newMap;
      });
    },
    [setCommandHandlers]
  );

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

  /** Handle Commands */
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
  }, [socketRef, commandHandlers]);

  return useMemo(
    () => ({
      addCommandHandlers,
      removeCommandHandlers,
      connected,
      dispatch,
    }),
    [addCommandHandlers, removeCommandHandlers, connected, dispatch]
  );
}

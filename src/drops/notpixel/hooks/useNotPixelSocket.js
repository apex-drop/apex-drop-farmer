import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function useNotPixelSocket(enabled, updatePixels) {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    if (enabled) {
      const socket = (socketRef.current = new WebSocket(
        "wss://notpx.app/api/v2/image/ws"
      ));

      const messageController = (message) => {
        let pixelUpdates = [];
        const actions = message.data.split("\n");

        for (let action of actions) {
          let [command, target, value] = action.split(":");

          if (command === "pixelUpdate") {
            pixelUpdates.push([target, value]);
          }
        }

        updatePixels(pixelUpdates);
      };

      /** Add Event Listener for Open */
      socket.addEventListener("open", () => {
        setConnected(true);
      });

      /** Add Event Listener for Message */
      socket.addEventListener("message", messageController);

      /** Add Event Listener for Close */
      socket.addEventListener("close", () => {
        setConnected(false);
      });
    }

    return () => {
      socketRef.current?.close();
    };
  }, [enabled, updatePixels]);

  return useMemo(() => ({ connected }), [connected]);
}

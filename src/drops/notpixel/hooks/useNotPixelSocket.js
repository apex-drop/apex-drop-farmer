import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";

import { getCoords } from "../lib/utils";

export default function useNotPixelSocket(enabled, updateWorldPixels) {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (enabled) {
      const socket = (socketRef.current = new WebSocket(
        "wss://notpx.app/api/v2/image/ws"
      ));

      const messageController = (message) => {
        let pixelUpdates = [];
        const actions = message.data.split("\n");

        for (let action of actions) {
          let [type, target, ...value] = action.split(":");

          if (type === "pixelUpdate") {
            pixelUpdates.push([target, ...value]);
          } else if (type === "event" && target === "Dynamite") {
            const SIZE = 5;
            const HALF = Math.floor(SIZE / 2);

            const position = value[1];
            const { x, y } = getCoords(position - 1, {
              x: 0,
              y: 0,
              size: 1000,
            });

            const startX = x - HALF;
            const startY = y - HALF;

            for (let i = 0; i < SIZE; i++) {
              for (let j = 0; j < SIZE; j++) {
                const currentX = startX + i;
                const currentY = startY + j;

                let offset = currentY * 1000 + currentX;
                let pixelId = offset + 1;

                pixelUpdates.push([pixelId, null]);
              }
            }
          }
        }

        if (pixelUpdates.length) {
          updateWorldPixels(pixelUpdates);
        }
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
      socketRef.current = null;
      setConnected(false);
    };
  }, [enabled, updateWorldPixels]);

  return useMemo(() => ({ connected }), [connected]);
}

import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";

import useMapState from "./useMapState";

export default function useMessagePort() {
  const [ports, setPorts] = useState(() => new Set());
  const {
    map: messageHandlers,
    addMapItems: addMessageHandlers,
    removeMapItems: removeMessageHandlers,
  } = useMapState();

  /** Dispatch */
  const dispatch = useCallback(
    (message) => {
      ports.forEach((port) => {
        port.portMessage(message);
      });
    },
    [ports]
  );

  /** Add a Port */
  const addPort = useCallback(
    (port) => {
      setPorts((oldPorts) => {
        const newPorts = new Set(oldPorts);

        newPorts.add(port);

        return newPorts;
      });
    },
    [setPorts]
  );

  /** Remove a Port */
  const removePort = useCallback(
    (port) => {
      /** Remove Listener */
      port.onDisconnect.removeListener(removePort);

      /** Set Ports */
      setPorts((oldPorts) => {
        const newPorts = new Set(oldPorts);

        newPorts.delete(port);

        return newPorts;
      });
    },
    [setPorts]
  );

  /** Instantiate Port Listener */
  useEffect(() => {
    const portConnectHandler = (port) => {
      /** Register Disconnect */
      port.onDisconnect.addListener(removePort);

      /** Add Port */
      addPort(port);
    };

    chrome?.runtime?.onConnect.addListener(portConnectHandler);

    return () => {
      chrome?.runtime?.onConnect.removeListener(portConnectHandler);
    };
  }, [addPort, removePort]);

  /** Handle Messages */
  useEffect(() => {
    const messageHandler = (message, port) => {
      const callback = messageHandlers.get(message.action);

      if (callback) {
        callback(message, port);
      }
    };

    ports.forEach((port) => {
      port.onMessage.addListener(messageHandler);
    });

    return () => {
      ports.forEach((port) => {
        port.onMessage.removeListener(messageHandler);
      });
    };
  }, [messageHandlers, ports]);

  return useMemo(
    () => ({
      ports,
      dispatch,
      addMessageHandlers,
      removeMessageHandlers,
    }),
    [ports, dispatch, addMessageHandlers, removeMessageHandlers]
  );
}

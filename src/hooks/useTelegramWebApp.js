import { useCallback, useMemo } from "react";
import { useState } from "react";

import useMessageHandlers from "./useMessageHandlers";

export default function useTelegramWebApp(host) {
  const [telegramWebApp, setTelegramWebApp] = useState(null);
  const [port, setPort] = useState(null);

  /** Reset TelegramWebApp */
  const resetTelegramWebApp = useCallback(() => {
    setTelegramWebApp(null);
    setPort(null);
  }, [setTelegramWebApp, setPort]);

  /** Get TelegramWebApp from Message */
  const getTelegramWebApp = useCallback(
    (message, port) => {
      /** Configure the App */
      setTelegramWebApp(message.data.telegramWebApp);

      /** Terminate Web App Dispatch */
      port.postMessage({
        action: "terminate-web-app-dispatch",
      });
    },
    [setTelegramWebApp]
  );

  /** Handle Message */
  useMessageHandlers(
    useMemo(
      () => ({
        [`set-port:${host}`]: (message, port) => {
          setPort(port);
        },
        [`set-telegram-web-app:${host}`]: (message, port) => {
          getTelegramWebApp(message, port);
        },
      }),
      [host, getTelegramWebApp, setPort]
    )
  );

  return useMemo(
    () => ({ port, telegramWebApp, resetTelegramWebApp }),
    [port, telegramWebApp, resetTelegramWebApp]
  );
}

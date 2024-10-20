import { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

import useMessageHandlers from "./useMessageHandlers";

export default function useTelegramWebApp(host, cache = true) {
  const [telegramWebApp, setTelegramWebApp] = useState(null);
  const storageKey = useMemo(() => `telegram-web-app:${host}`, [host]);

  /** Reset TelegramWebApp */
  const resetTelegramWebApp = useCallback(() => {
    setTelegramWebApp(null);
  }, [setTelegramWebApp]);

  /** Configure TelegramWebApp */
  const configureTelegramWebApp = useCallback(
    (data, cache = true) => {
      if (cache) {
        chrome?.storage?.local.set({
          [storageKey]: {
            data,
            updatedAt: Date.now(),
          },
        });
      }
      setTelegramWebApp(data);
    },
    [storageKey, setTelegramWebApp]
  );

  /** Get TelegramWebApp from Message */
  const getTelegramWebApp = useCallback(
    (message, port) => {
      /** Configure the App */
      configureTelegramWebApp(message.data.telegramWebApp, cache);

      /** Disconnect the Port */
      port.disconnect();
    },
    [host, cache, configureTelegramWebApp]
  );

  /** Handle Message */
  useMessageHandlers(
    useMemo(
      () => ({
        [`set-telegram-web-app:${host}`]: (message, port) => {
          getTelegramWebApp(message, port);
        },
      }),
      [host, getTelegramWebApp]
    )
  );

  /** Set from Cache */
  useEffect(() => {
    if (cache) {
      /** Get and Store Data */
      chrome?.storage?.local
        .get(storageKey)
        .then(({ [storageKey]: result }) => {
          if (result && result.updatedAt >= Date.now() - 60_000 * 10) {
            configureTelegramWebApp(result.data, false);
          }
        });
    }
  }, [cache, storageKey, configureTelegramWebApp]);

  return { telegramWebApp, resetTelegramWebApp };
}

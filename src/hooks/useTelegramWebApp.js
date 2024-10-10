import { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function useTelegramWebApp(host, cache = true) {
  const [telegramWebApp, setTelegramWebApp] = useState(null);
  const storageKey = useMemo(() => `telegram-web-app:${host}`, [host]);

  /** Reset TelegramWebApp */
  const resetTelegramWebApp = useCallback(() => {
    setTelegramWebApp(null);
  }, [setTelegramWebApp]);

  /** Configure TelegramWebApp */
  const configureTelegramWebApp = useCallback(
    (data, store = true) => {
      if (store) {
        chrome?.storage?.local.set({
          [storageKey]: data,
        });
      }
      setTelegramWebApp(data);
    },
    [storageKey, setTelegramWebApp]
  );

  /** Get TelegramWebApp from Message */
  const getTelegramWebApp = useCallback(
    (message, sender, sendResponse) => {
      if (
        message.action === "set-telegram-web-app" &&
        message.data.host === host
      ) {
        /** Return a Response */
        sendResponse({
          status: true,
        });

        /** Configure the App */
        configureTelegramWebApp(message.data.telegramWebApp, cache);

        /** Remove Listener */
        chrome?.runtime?.onMessage.removeListener(getTelegramWebApp);
      }
    },
    [host, cache, configureTelegramWebApp]
  );

  /** Listen for Message */
  useEffect(() => {
    if (!telegramWebApp) {
      /** Add Listener */
      chrome?.runtime?.onMessage.addListener(getTelegramWebApp);
    }

    return () => {
      /** Remove Listener */
      chrome?.runtime?.onMessage.removeListener(getTelegramWebApp);
    };
  }, [host, telegramWebApp, getTelegramWebApp]);

  /** Set from Cache */
  useEffect(() => {
    if (cache && !telegramWebApp) {
      /** Get and Store Data */
      chrome?.storage?.local.get(storageKey).then(({ [storageKey]: data }) => {
        if (data) {
          configureTelegramWebApp(data, false);
        }
      });
    }
  }, [cache, storageKey, telegramWebApp, configureTelegramWebApp]);

  return { telegramWebApp, resetTelegramWebApp };
}

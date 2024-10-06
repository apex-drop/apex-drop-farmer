import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function useTelegramWebApp(host, cache = true) {
  const [telegramWebApp, setTelegramWebApp] = useState(null);

  const resetTelegramWebApp = useCallback(() => {
    setTelegramWebApp(null);
  }, [setTelegramWebApp]);

  useEffect(() => {
    if (telegramWebApp) return;

    /** Storage Key */
    const storageKey = `telegram-web-app:${host}`;

    /** Configure TelegramWebApp */
    const configureTelegramWebApp = (data, store = true) => {
      if (store) {
        chrome?.storage?.local.set({
          [storageKey]: data,
        });
      }
      setTelegramWebApp(data);
    };

    /** Get TelegramWebApp from Message */
    const getTelegramWebApp = (message, sender, sendResponse) => {
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
    };

    if (cache) {
      /** Get and Store Data */
      chrome?.storage?.local.get(storageKey).then(({ [storageKey]: data }) => {
        if (data) {
          configureTelegramWebApp(data, false);
        }
      });
    }

    /** Add Listener */
    chrome?.runtime?.onMessage.addListener(getTelegramWebApp);

    return () => {
      /** Remove Listener */
      chrome?.runtime?.onMessage.removeListener(getTelegramWebApp);
    };
  }, [host, cache, telegramWebApp, setTelegramWebApp]);

  return { telegramWebApp, resetTelegramWebApp };
}

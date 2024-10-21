import { decryptData, encryptData } from "./content-script-utils";
import { uuid } from "./lib/utils";

if (location.hash.includes("tgWebAppData")) {
  const postWindowMessage = (data) => {
    return new Promise((resolve) => {
      const id = uuid();
      /**
       * @param {MessageEvent} ev
       */
      const respond = (ev) => {
        try {
          if (ev.data?.id === id && ev.data?.type === "response") {
            window.removeEventListener("message", respond);
            resolve(decryptData(ev.data.payload));
          }
        } catch {}
      };

      window.addEventListener("message", respond);
      window.postMessage(
        {
          id,
          payload: encryptData(data),
        },
        "*"
      );
    });
  };

  const getTelegramWebApp = async () => {
    return await postWindowMessage({
      action: "get-telegram-web-app",
    });
  };

  const getRequestData = async (url) => {
    return await postWindowMessage({
      action: "get-request-data",
      data: {
        url,
      },
    });
  };

  /** Connect to Messaging */
  const port = chrome.runtime.connect();

  /** Set Port */
  port.onMessage.addListener(async (message) => {
    const { id, action, data } = message;
    switch (action) {
      case "get-request-data":
        const response = await getRequestData(data.url);

        port.postMessage({
          id,
          data: response,
        });
        break;
    }
  });

  port.postMessage({
    action: `set-port:${location.host}`,
  });

  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      let timeout;
      let telegramWebApp;

      /** Dispatch the TelegramWebApp */
      const dispatchTelegramWebApp = async () => {
        if (!telegramWebApp) {
          telegramWebApp = await getTelegramWebApp();
        }

        try {
          if (telegramWebApp) {
            port.postMessage({
              action: `set-telegram-web-app:${location.host}`,
              data: {
                host: location.host,
                telegramWebApp,
              },
            });
          }
        } catch {}

        /** Beam again... */
        timeout = setTimeout(dispatchTelegramWebApp, 500);
      };

      /** Terminate Web App Dispatch */
      const terminateWebAppDispatch = (message) => {
        if (message.action === "terminate-web-app-dispatch") {
          clearTimeout(timeout);
          port.onMessage.removeListener(terminateWebAppDispatch);
        }
      };

      /** Add Listener to Stop Dispatching */
      port.onMessage.addListener(terminateWebAppDispatch);

      /** Send the WebApp Data */
      dispatchTelegramWebApp();
    }
  });
}

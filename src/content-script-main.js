import { decryptData, encryptData } from "./content-script-utils";

if (location.hash.includes("tgWebAppData")) {
  const watchURLs = new Map();

  const dispatchResponse = async (url, response) => {
    const data = await response;
    const id = watchURLs.get(url);

    /** Return Data */
    window.postMessage(
      {
        id,
        type: "response",
        payload: encryptData(data),
      },
      "*"
    );

    /** Stop Watching */
    watchURLs.delete(url);
  };

  /** Replace Platform */
  ["webk", "weba", "web"].forEach((platform) => {
    location.hash = location.hash.replace(
      `&tgWebAppPlatform=${platform}`,
      "&tgWebAppPlatform=android"
    );
  });

  /** Override User Agent */
  Object.defineProperty(navigator, "userAgent", {
    get: () =>
      "Mozilla/5.0 (Linux; Android 11; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.82 Safari/537.36",
    configurable: true,
  });

  /** Override fetch and XMLHttpRequest */
  const core = {
    fetch: window.fetch.bind(window),
    XMLHttpRequest: window.XMLHttpRequest.bind(window),
    postMessage: window.postMessage.bind(window),
  };

  /** Override XMLHttpRequest */
  window.XMLHttpRequest = class extends XMLHttpRequest {
    open(...args) {
      const [, url] = args;

      if (watchURLs.has(url)) {
        super.addEventListener("load", () => {
          dispatchResponse(url, JSON.parse(this.responseText));
        });
      }

      return super.open(...args);
    }
  };

  /** Override fetch */
  window.fetch = function (...args) {
    return core.fetch(...args).then(
      /**
       * @param {Response} response
       */
      (response) => {
        const url = typeof args[0] === "string" ? args[0] : args[0].url;

        if (watchURLs.has(url)) {
          dispatchResponse(url, response.clone().json());
        }

        return response;
      }
    );
  };

  /** Handle Messages */
  window.addEventListener("message", (ev) => {
    try {
      if (ev.source === window && ev.data?.payload) {
        const { id, payload } = ev.data;
        const { action, data } = decryptData(payload);

        switch (action) {
          case "get-telegram-web-app":
            window.postMessage(
              {
                id,
                type: "response",
                payload: encryptData(window.Telegram?.WebApp),
              },
              "*"
            );
            break;
          case "get-request-data":
            watchURLs.set(data.url, id);
            break;
          case "open-telegram-link":
            window.Telegram?.WebApp?.openTelegramLink(data.url);
            window.postMessage(
              {
                id,
                type: "response",
                payload: encryptData(true),
              },
              "*"
            );
            break;
        }
      }
    } catch {}
  });

  /** Add Telegram Web Script */
  document.addEventListener("readystatechange", (ev) => {
    if (document.readyState === "interactive") {
      const tgWebScriptSrc = "https://telegram.org/js/telegram-web-app.js";
      let tgWebScript = Array.prototype.find.call(
        document.scripts,
        (script) => script.src === tgWebScriptSrc
      );

      /** Add Telegram Web */
      if (!tgWebScript) {
        tgWebScript = document.createElement("script");
        tgWebScript.src = tgWebScriptSrc;

        document.head.appendChild(tgWebScript);
      }
    }
  });
}

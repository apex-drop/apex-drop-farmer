if (location.hash.includes("tgWebAppData")) {
  function getTelegramWebApp() {
    return JSON.parse(document.documentElement.dataset.telegramWebApp || null);
  }

  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      let timeout;
      const port = chrome.runtime.connect();

      /** Beam the TelegramWebApp */
      const beamTelegramWebApp = async () => {
        const telegramWebApp = getTelegramWebApp();

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
        timeout = setTimeout(beamTelegramWebApp, 500);
      };

      /** Send the WebApp Data */
      beamTelegramWebApp();

      /** Clear Timeout on Disconnect */
      port.onDisconnect.addListener(() => {
        clearTimeout(timeout);
      });
    }
  });
}

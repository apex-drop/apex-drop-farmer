/** Should Inject Telegram Web? */
const INJECT_TG_SCRIPT = true;

if (location.hash.includes("tgWebAppData")) {
  location.hash = location.hash.replace(
    "&tgWebAppPlatform=web",
    "&tgWebAppPlatform=android"
  );

  const currentWindow = window;

  /** Override window.top */
  Object.defineProperty(window, "top", {
    get: () => currentWindow,
    configurable: true,
  });

  /** Override window.parent */
  Object.defineProperty(window, "parent", {
    get: () => null,
    configurable: true,
  });

  /** Override User Agent */
  Object.defineProperty(navigator, "userAgent", {
    get: () =>
      "Mozilla/5.0 (Linux; Android 14; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.127 Mobile Safari/537.36",
    configurable: true,
  });

  document.addEventListener("readystatechange", (ev) => {
    if (document.readyState === "interactive") {
      const tgWebSrc = "https://telegram.org/js/telegram-web-app.js";
      let tgWeb = Array.prototype.find.call(
        document.scripts,
        (script) => script.src === tgWebSrc
      );

      /** Add Telegram Web */
      if (!tgWeb && INJECT_TG_SCRIPT) {
        tgWeb = document.createElement("script");
        tgWeb.src = tgWebSrc;

        document.head.appendChild(tgWeb);
      }
    } else if (document.readyState === "complete") {
      document.documentElement.dataset.telegramWebApp = JSON.stringify(
        window.Telegram?.WebApp
      );
    }
  });
}

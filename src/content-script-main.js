/** Should Inject Telegram Web? */
const INJECT_TG_SCRIPT = true;

if (location.hash.includes("tgWebAppData")) {
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
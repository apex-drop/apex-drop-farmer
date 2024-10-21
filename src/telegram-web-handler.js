window.addEventListener("message", (ev) => {
  const { action, data } = ev.data;
  switch (action) {
    case "open-telegram-link":
      window.Telegram?.WebApp?.openTelegramLink(data.url);
  }
});

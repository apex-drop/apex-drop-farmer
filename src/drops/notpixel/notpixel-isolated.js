function getNotPixel() {
  return JSON.parse(document.documentElement.dataset.notpixel || null);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "get-not-pixel") {
    sendResponse({
      notpixel: getNotPixel(),
    });
  }
});

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    /** Beam the NotPixel */
    const beamNotPixel = async () => {
      let response;
      const notpixel = getNotPixel();
      try {
        if (notpixel) {
          response = await chrome.runtime.sendMessage({
            action: "set-notpixel",
            data: {
              notpixel,
            },
          });
        }
      } catch {}

      if (response?.status) {
        clearInterval(interval);
      }
    };

    let interval = setInterval(beamNotPixel, 1000);
  }
});

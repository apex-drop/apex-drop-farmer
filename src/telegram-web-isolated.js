/** @type {HTMLIFrameElement} */
let iframe;
const port = chrome.runtime.connect(chrome.runtime.id, {
  name: "telegram-web",
});

port.onMessage.addListener((message) => {
  const { action } = message;

  switch (action) {
    case "open-telegram-link":
      iframe?.contentWindow?.postMessage(message, "*");
  }
});

document.addEventListener("readystatechange", () => {
  if (document.readyState === "interactive") {
    iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = chrome.runtime.getURL("connect.html");

    document.body.appendChild(iframe);
  }
});

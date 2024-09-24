/** Utils */
const styleElement = (elem, styles) =>
  Object.entries(styles).forEach(([k, v]) => (elem.style[k] = v));

/** Main IFrame */

const mobileIframeStyles = {
  inset: "0",
  width: "100%",
  height: "100%",
  maxHeight: "initial",
  borderRadius: "0px",
};

const tabletIframeStyles = {
  inset: "initial",
  width: "400px",
  height: "calc(100dvh - 100px)",
  maxHeight: "640px",
  bottom: "80px",
  right: "20px",
  borderRadius: "10px",
};
const tabletMedia = window.matchMedia("(min-width: 768px)");
const iframe = document.createElement("iframe");
iframe.src = chrome.runtime.getURL("/index.html");

styleElement(iframe, {
  ...(tabletMedia.matches ? tabletIframeStyles : mobileIframeStyles),
  position: "fixed",
  zIndex: "9999",
  visibility: "visible",
  border: "0",
});

tabletMedia.addEventListener("change", (ev) => {
  styleElement(iframe, ev.matches ? tabletIframeStyles : mobileIframeStyles);
});

/** Toggle Button */
const button = document.createElement("button");
styleElement(button, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: "99999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "52px",
  height: "52px",
  border: "0",
  outline: "0",
  background: "white",
  borderRadius: "100%",
  cursor: "pointer",
});

button.addEventListener("click", () => {
  styleElement(iframe, {
    visibility: iframe.style.visibility === "visible" ? "hidden" : "visible",
  });
});

/** Icon */
const img = document.createElement("img");
img.src = chrome.runtime.getURL("/icon.png");

styleElement(img, {
  width: "32px",
  height: "32px",
});

button.appendChild(img);
document.body.appendChild(button);
document.body.appendChild(iframe);

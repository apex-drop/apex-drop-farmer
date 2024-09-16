function getTomarket() {
  return JSON.parse(document.documentElement.dataset.tomarket || null);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "get_tomarket") {
    sendResponse({
      tomarket: getTomarket(),
    });
  }
});

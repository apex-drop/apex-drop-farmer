import defaultSettings from "@/default-settings";

const getSettings = () => {
  return new Promise((res, rej) => {
    chrome.storage.local
      .get("settings")
      .then(({ settings = defaultSettings }) => res(settings))
      .catch(rej);
  });
};

const openFarmerWindow = () => {
  chrome.windows.create({
    url: "index.html",
    width: 400,
    type: "popup",
  });
};

const configureExtension = (settings) => {
  chrome.sidePanel
    .setPanelBehavior({
      openPanelOnActionClick: !settings.openFarmerInNewWindow,
    })
    .catch(() => {});

  if (settings.openFarmerInNewWindow) {
    chrome.action.onClicked.addListener(openFarmerWindow);
  } else {
    chrome.action.onClicked.removeListener(openFarmerWindow);
  }
};

chrome.storage.local.onChanged.addListener(({ settings }) => {
  if (settings) {
    configureExtension(settings.newValue);
  }
});

getSettings().then((settings) => {
  configureExtension(settings);
});

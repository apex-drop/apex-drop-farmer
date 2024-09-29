import defaultSettings from "@/default-settings";

/** Get Settings */
const getSettings = () => {
  return new Promise((res, rej) => {
    chrome.storage.local
      .get("settings")
      .then(({ settings = defaultSettings }) => res(settings))
      .catch(rej);
  });
};

/** Open Farmer */
const openFarmerWindow = async () => {
  const display = await chrome.system.display.getInfo();
  chrome.windows.create({
    url: "index.html",
    width: 350,
    type: "popup",
  });
};

const configureExtension = async (settings) => {
  /** Configure Side Panel */
  await chrome.sidePanel
    .setPanelBehavior({
      openPanelOnActionClick: !settings.openFarmerInNewWindow,
    })
    .catch(() => {});

  /** Configure Action and Popup */
  chrome.runtime.getPlatformInfo().then(async (platform) => {
    if (platform.os === "android") return;

    /** Remove Popup */
    await chrome.action.setPopup({ popup: "" }).catch(() => {});

    /** Configure Action */
    if (settings.openFarmerInNewWindow) {
      chrome.action.onClicked.addListener(openFarmerWindow);
    } else {
      chrome.action.onClicked.removeListener(openFarmerWindow);
    }
  });
};

/** Watch Storage for Settings Change */
chrome.storage.local.onChanged.addListener(({ settings }) => {
  if (settings) {
    configureExtension(settings.newValue);
  }
});

getSettings().then((settings) => {
  configureExtension(settings);
});

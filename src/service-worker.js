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
  chrome.windows.create({
    url: "index.html",
    type: "popup",
    state: "maximized",
    focused: true,
  });
};

const configureExtension = async (settings) => {
  try {
    /** Configure Side Panel */
    await chrome.sidePanel
      .setPanelBehavior({
        openPanelOnActionClick: !settings.openFarmerInNewWindow,
      })
      .catch(() => {});
  } catch {}

  /** Configure Action and Popup */
  const platform = await chrome.runtime.getPlatformInfo();
  if (platform.os === "android") return;

  /** Remove Popup */
  await chrome.action.setPopup({ popup: "" }).catch(() => {});

  /** Configure Action */
  if (settings.openFarmerInNewWindow) {
    chrome.action.onClicked.addListener(openFarmerWindow);
  } else {
    chrome.action.onClicked.removeListener(openFarmerWindow);
  }
};

/** Watch Storage for Settings Change */
chrome.storage.local.onChanged.addListener(({ settings }) => {
  if (settings) {
    configureExtension(settings.newValue);
  }
});

/** Open Farmer on Install */
chrome.runtime.onInstalled.addListener(async () => {
  const settings = await getSettings();

  if (settings.openFarmerInNewWindow) {
    await openFarmerWindow();
  }
});

/** Open Farmer on Startup */
chrome.runtime.onStartup.addListener(async () => {
  const settings = await getSettings();

  if (settings.openFarmerOnStartup) {
    /** Main Window */
    const mainWindow = await chrome.windows.getCurrent();

    /** Open Farmer Window */
    await openFarmerWindow();

    /** Get Platform */
    const platform = await chrome.runtime.getPlatformInfo();

    /** When Not Android */
    if (platform.os !== "android") {
      try {
        if (settings.closeMainWindowOnStartup) {
          /** Close Main Window */
          if (mainWindow) {
            await chrome.windows.remove(mainWindow.id);
          }
        } else {
          /** Go to extensions page */
          const tabs = await chrome.tabs.query({});

          if (tabs[0]) {
            await chrome.tabs.update(tabs[0].id, {
              url: "chrome://extensions",
            });
          }
        }
      } catch {}
    }
  }
});

/** Configure Extension */
getSettings().then((settings) => {
  configureExtension(settings);
});

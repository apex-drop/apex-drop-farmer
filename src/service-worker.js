/** General Content Script */
chrome.scripting
  .registerContentScripts([
    {
      id: "content-script",
      js: ["content-script.js"],
      matches: chrome.runtime.getManifest()["host_permissions"],
      runAt: "document_start",
      allFrames: true,
    },
  ])
  .then(() => {})
  .catch((err) => {});

/** Tomarket Game Object Script */
[
  {
    id: "tomarket-world",
    src: "tomarket-world.js",
    world: "MAIN",
  },
  {
    id: "tomarket-isolated",
    src: "tomarket-isolated.js",
    world: "ISOLATED",
  },
].forEach((item) => {
  chrome.scripting
    .registerContentScripts([
      {
        id: item.id,
        js: [item.src],
        matches: ["*://*.tomarket.ai/*"],
        runAt: "document_start",
        allFrames: true,
        world: item.world,
      },
    ])
    .then(() => {})
    .catch((err) => {});
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch(() => {});

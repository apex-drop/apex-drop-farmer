import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import AppContext from "./contexts/AppContext";
import SyncControl from "./partials/SyncControl";
import TabButtonList from "./components/TabButtonList";
import TabContent from "./components/TabContent";
import defaultSettings from "./default-settings";
import useApp from "./hooks/useApp";
import { getSettings } from "./lib/utils";

function App() {
  const app = useApp();

  /** Resize window */
  useEffect(() => {
    (async function () {
      const currentWindow = await chrome?.windows?.getCurrent();

      if (
        currentWindow &&
        currentWindow.type === "popup" &&
        currentWindow.state === "maximized"
      ) {
        const settings = await getSettings();
        const width = Math.max(
          300,
          Math.floor(
            currentWindow.width /
              (settings.farmersPerWindow || defaultSettings.farmersPerWindow)
          )
        );

        const left = Math.floor(currentWindow.width / 2 - width / 2);

        chrome?.windows?.update(currentWindow.id, {
          state: "normal",
          width,
          left,
        });
      }
    })();
  }, []);

  return (
    <AppContext.Provider value={app}>
      <div className="flex flex-col h-dvh">
        {app.openedTabs.length > 1 ? (
          <TabButtonList tabs={app.openedTabs} />
        ) : null}

        {/* Tabs Contents Wrapper */}
        <div className="relative min-w-0 min-h-0 overflow-auto grow">
          {app.openedTabs.map((tab) => (
            <TabContent
              key={tab.reloadedAt ? `${tab.id}-${tab.reloadedAt}` : tab.id}
              tab={tab}
            />
          ))}
        </div>

        <SyncControl />
      </div>
      <Toaster position="top-center" />
    </AppContext.Provider>
  );
}

export default App;

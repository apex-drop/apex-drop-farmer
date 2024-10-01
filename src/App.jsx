import { Toaster } from "react-hot-toast";

import AppContext from "./contexts/AppContext";
import SyncControl from "./partials/SyncControl";
import TabButtonList from "./components/TabButtonList";
import TabContent from "./components/TabContent";
import useApp from "./hooks/useApp";
import { useEffect } from "react";

function App() {
  const app = useApp();

  useEffect(() => {
    chrome?.windows?.getCurrent().then((currentWindow) => {
      if (currentWindow.state === "maximized") {
        chrome?.windows?.update(currentWindow.id, {
          state: "normal",
          width: Math.max(300, Math.floor(currentWindow.width / 5)),
        });
      }
    });
  }, []);

  return (
    <AppContext.Provider value={app}>
      <div className="flex flex-col h-dvh">
        {app.tabs.length > 1 ? <TabButtonList tabs={app.tabs} /> : null}

        {/* Tabs Contents Wrapper */}
        <div className="relative min-w-0 min-h-0 overflow-auto grow">
          {app.tabs.map((tab) => (
            <TabContent key={tab.id} tab={tab} />
          ))}
        </div>

        <SyncControl />
      </div>
      <Toaster position="top-center" />
    </AppContext.Provider>
  );
}

export default App;

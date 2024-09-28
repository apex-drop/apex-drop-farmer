import { Toaster } from "react-hot-toast";

import AppContext from "./contexts/AppContext";
import TabContent from "./components/TabContent";
import TabButtonList from "./components/TabButtonList";
import useApp from "./hooks/useApp";

function App() {
  const app = useApp();

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
      </div>
      <Toaster position="top-center" />
    </AppContext.Provider>
  );
}

export default App;

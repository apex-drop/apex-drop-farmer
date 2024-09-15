import Agent301 from "@/drops/agent301/Agent301";
import Blum from "@/drops/blum/Blum";
import DropLayout from "@/layouts/DropLayout";
import Major from "@/drops/major/Major";
import Pumpad from "@/drops/pumpad/Pumpad";
import Welcome from "@/pages/Welcome";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Goats from "./drops/goats/Goats";
import Slotcoin from "./drops/slotcoin/Slotcoin";
import Truecoin from "./drops/truecoin/Truecoin";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Welcome />} />
        <Route element={<DropLayout />}>
          <Route path="/blum" element={<Blum />} />
          <Route path="/pumpad" element={<Pumpad />} />
          <Route path="/agent301" element={<Agent301 />} />
          <Route path="/major" element={<Major />} />
          <Route path="/slotcoin" element={<Slotcoin />} />
          <Route path="/goats" element={<Goats />} />
          <Route path="/truecoin" element={<Truecoin />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;

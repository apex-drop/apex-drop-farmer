import Blum from "@/drops/blum/Blum";
import Pumpad from "@/drops/pumpad/Pumpad";
import Welcome from "@/pages/Welcome";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Agent301 from "./drops/agent301/Agent301";
import DropLayout from "./layouts/DropLayout";

function App() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route element={<DropLayout />}>
        <Route path="/blum" element={<Blum />} />
        <Route path="/pumpad" element={<Pumpad />} />
        <Route path="/agent301" element={<Agent301 />} />
      </Route>
    </Routes>
  );
}

export default App;

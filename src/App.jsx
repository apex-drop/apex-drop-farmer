import Blum from "@/drops/blum/Blum";
import Pumpad from "@/drops/pumpad/Pumpad";
import Welcome from "@/pages/Welcome";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import DropLayout from "./layouts/DropLayout";

function App() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route element={<DropLayout />}>
        <Route path="/blum" element={<Blum />} />
        <Route path="/pumpad" element={<Pumpad />} />
      </Route>
    </Routes>
  );
}

export default App;

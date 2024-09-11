import Blum from "@/drops/blum/Blum";
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
      </Route>
    </Routes>
  );
}

export default App;

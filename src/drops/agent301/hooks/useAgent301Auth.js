import { useContext } from "react";

import Agent301AuthContext from "../context/Agent301AuthContext";

export default function useAgent301Auth() {
  return useContext(Agent301AuthContext);
}

import { useContext } from "react";

import BlumAuthContext from "../context/BlumAuthContext";

export default function useBlumAuth() {
  return useContext(BlumAuthContext);
}

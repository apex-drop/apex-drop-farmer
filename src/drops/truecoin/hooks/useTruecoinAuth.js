import { useContext } from "react";

import TruecoinAuthContext from "../context/TruecoinAuthContext";

export default function useTruecoinAuth() {
  return useContext(TruecoinAuthContext);
}

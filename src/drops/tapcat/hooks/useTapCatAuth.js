import { useContext } from "react";

import TapCatAuthContext from "../context/TapCatAuthContext";

export default function useTapCatAuth() {
  return useContext(TapCatAuthContext);
}

import { useContext } from "react";

import GoatsAuthContext from "../context/GoatsAuthContext";

export default function useGoatsAuth() {
  return useContext(GoatsAuthContext);
}

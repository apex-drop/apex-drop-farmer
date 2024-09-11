import { useContext } from "react";
import PumpadAuthContext from "../context/PumpadAuthContext";

export default function usePumpadAuth() {
  return useContext(PumpadAuthContext);
}

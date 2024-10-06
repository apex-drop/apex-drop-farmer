import { useContext } from "react";

import NotPixelFarmerContext from "../context/NotPixelFarmerContext";

export default function useNotPixelApi() {
  return useContext(NotPixelFarmerContext).api;
}

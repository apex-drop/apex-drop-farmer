import { useContext } from "react";

import YescoinFarmerContext from "../context/YescoinFarmerContext";

export default function useYescoinApi() {
  return useContext(YescoinFarmerContext).api;
}

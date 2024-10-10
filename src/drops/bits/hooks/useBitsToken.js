import { useContext } from "react";

import BitsFarmerContext from "../context/BitsFarmerContext";

export default function useBitsToken() {
  return useContext(BitsFarmerContext).authQuery?.data?.token;
}

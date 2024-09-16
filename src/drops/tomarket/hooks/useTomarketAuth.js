import { useContext } from "react";

import TomarketAuthContext from "../context/TomarketAuthContext";

export default function useTomarketAuth() {
  return useContext(TomarketAuthContext);
}

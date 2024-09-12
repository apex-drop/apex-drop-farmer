import { useContext } from "react";

import MajorAuthContext from "../context/MajorAuthContext";

export default function useMajorAuth() {
  return useContext(MajorAuthContext);
}

import { useEffect } from "react";

import useBirdTonFarmerContext from "./useBirdTonFarmerContext";

export default function useBirdTonHandlers(handlers) {
  const { addMessageHandlers, removeMessageHandlers } =
    useBirdTonFarmerContext();

  return useEffect(() => {
    /** Add Handlers */
    addMessageHandlers(handlers);

    /** Remove Handlers */
    return () => {
      removeMessageHandlers(handlers);
    };
  }, [handlers, addMessageHandlers, removeMessageHandlers]);
}

import { useEffect } from "react";
import { useState } from "react";

import SlotcoinIcon from "../assets/images/icon.png";

export default function useSlotcoinAuthorizationHeader() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const handleWebRequest = (details) => {
      let authorization = details.requestHeaders.find(
        (item) => item.name === "Authorization"
      )?.value;

      if (authorization && authorization !== auth) {
        setAuth(authorization);

        chrome.notifications.create("slotcoin-auth", {
          iconUrl: SlotcoinIcon,
          title: "Slotcoin Farmer",
          message: "Slotcoin Auth Detected",
          type: "basic",
        });
      }
    };

    chrome?.webRequest?.onSendHeaders.addListener(
      handleWebRequest,
      {
        urls: ["*://api.slotcoin.app/*"],
      },
      ["requestHeaders"]
    );

    return () =>
      chrome?.webRequest?.onSendHeaders.removeListener(handleWebRequest);
  }, [auth]);

  return auth;
}

import { useEffect } from "react";
import { useState } from "react";

import PumpadIcon from "../assets/images/icon.png";

export default function usePumpadAuthorizationHeader() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const handleWebRequest = (details) => {
      let authorization = details.requestHeaders.find(
        (item) => item.name === "Authorization"
      )?.value;

      if (authorization && authorization !== auth) {
        setAuth(authorization);

        chrome.notifications.create("pumpad-auth", {
          iconUrl: PumpadIcon,
          title: "Pumpad Farmer",
          message: "Pumpad Auth Detected",
          type: "basic",
        });
      }
    };

    chrome?.webRequest?.onSendHeaders.addListener(
      handleWebRequest,
      {
        urls: ["*://tg.pumpad.io/*"],
      },
      ["requestHeaders"]
    );

    return () =>
      chrome?.webRequest?.onSendHeaders.removeListener(handleWebRequest);
  }, [auth]);

  return auth;
}

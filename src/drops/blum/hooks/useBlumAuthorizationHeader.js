import { useEffect } from "react";
import { useState } from "react";

import BlumIcon from "../assets/images/icon.png";

export default function useBlumAuthorizationHeader() {
  const [authorizationHeader, setAuthorizationHeader] = useState(null);

  useEffect(() => {
    const handleWebRequest = (details) => {
      let authorization = details.requestHeaders.find(
        (item) => item.name === "Authorization"
      )?.value;

      if (authorization && authorization !== authorizationHeader) {
        setAuthorizationHeader(authorization);

        chrome.notifications.create("blum-auth", {
          iconUrl: BlumIcon,
          title: "Blum Farmer",
          message: "Blum Auth Detected",
          type: "basic",
        });
      }
    };

    chrome?.webRequest?.onSendHeaders.addListener(
      handleWebRequest,
      {
        urls: ["*://game-domain.blum.codes/*"],
      },
      ["requestHeaders"]
    );

    return () =>
      chrome?.webRequest?.onSendHeaders.removeListener(handleWebRequest);
  }, [authorizationHeader]);

  return authorizationHeader;
}

import { useEffect } from "react";
import { useState } from "react";

export default function useAuthorizationHeader() {
  const [authorizationHeader, setAuthorizationHeader] = useState(null);

  useEffect(() => {
    const handleWebRequest = (details) => {
      let header = details.requestHeaders.find(
        (item) => item.name === "Authorization"
      );

      if (header && header.value && header.value !== authorizationHeader) {
        setAuthorizationHeader(header.value);
        chrome.notifications.create("blum-auth", {
          iconUrl: "/icon.png",
          title: "Blum Farmer",
          message: "Blum Auth Detected",
          type: "basic",
        });
      }
    };

    chrome.webRequest.onSendHeaders.addListener(
      handleWebRequest,
      {
        urls: ["*://game-domain.blum.codes/*"],
      },
      ["requestHeaders"]
    );

    return () =>
      chrome.webRequest.onSendHeaders.removeListener(handleWebRequest);
  }, []);

  return authorizationHeader;
}

import { useEffect } from "react";
import { useState } from "react";

import Agent301Icon from "../assets/images/icon.png";

export default function useAgent301AuthorizationHeader() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const handleWebRequest = (details) => {
      let authorization = details.requestHeaders.find(
        (item) => item.name === "Authorization"
      )?.value;

      if (authorization && authorization !== auth) {
        setAuth(authorization);

        chrome.notifications.create("agent301-auth", {
          iconUrl: Agent301Icon,
          title: "Agent301 Farmer",
          message: "Agent301 Auth Detected",
          type: "basic",
        });
      }
    };

    chrome?.webRequest?.onSendHeaders.addListener(
      handleWebRequest,
      {
        urls: ["*://api.agent301.org/*"],
      },
      ["requestHeaders"]
    );

    return () =>
      chrome?.webRequest?.onSendHeaders.removeListener(handleWebRequest);
  }, [auth]);

  return auth;
}

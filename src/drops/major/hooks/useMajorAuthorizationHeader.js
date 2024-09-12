import { useEffect } from "react";
import { useState } from "react";

import MajorIcon from "../assets/images/icon.png";

export default function useMajorAuthorizationHeader() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const handleWebRequest = (details) => {
      let authorization = details.requestHeaders.find(
        (item) => item.name === "Authorization"
      )?.value;

      if (authorization && authorization !== auth) {
        setAuth(authorization);

        chrome.notifications.create("major-auth", {
          iconUrl: MajorIcon,
          title: "Major Farmer",
          message: "Major Auth Detected",
          type: "basic",
        });
      }
    };

    chrome?.webRequest?.onSendHeaders.addListener(
      handleWebRequest,
      {
        urls: ["*://major.bot/*"],
      },
      ["requestHeaders"]
    );

    return () =>
      chrome?.webRequest?.onSendHeaders.removeListener(handleWebRequest);
  }, [auth]);

  return auth;
}

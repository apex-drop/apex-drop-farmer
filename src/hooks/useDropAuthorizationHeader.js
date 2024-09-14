import { useEffect } from "react";
import { useState } from "react";

export default function useDropAuthorizationHeader({
  urls = [],
  notification = {},
  getAuth,
  compareAuth,
}) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const handleWebRequest = (details) => {
      let newAuth = getAuth
        ? getAuth(details)
        : details.requestHeaders.find((item) => item.name === "Authorization")
            ?.value;

      if (
        compareAuth ? compareAuth(auth, newAuth) : newAuth && newAuth !== auth
      ) {
        setAuth(newAuth);

        chrome.notifications.create(notification.id, {
          iconUrl: notification.icon,
          title: notification.title,
          message: notification.message,
          type: "basic",
        });
      }
    };

    chrome?.webRequest?.onSendHeaders.addListener(
      handleWebRequest,
      {
        urls,
      },
      ["requestHeaders"]
    );

    return () =>
      chrome?.webRequest?.onSendHeaders.removeListener(handleWebRequest);
  }, [auth]);

  return auth;
}

import axios from "axios";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";

export default function useDropFarmer({
  id,
  urls = [],
  notification = {},
  getAuth,
  compareAuth,
}) {
  /** Auth */
  const [auth, setAuth] = useState(null);

  /** Axios Instance */
  const api = useMemo(
    () =>
      axios.create({
        withCredentials: true,
      }),
    []
  );

  /** Configure Authorization */
  const configureAuthorization = (auth, store = true) => {
    if (auth) {
      api.defaults.headers.common["Authorization"] = auth;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }

    if (store) {
      chrome.storage.local.set({
        [`${id}-auth`]: auth,
      });
    }

    setAuth(auth);
  };

  /** Interceptor */
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => Promise.resolve(response),
      (error) => {
        if ([401, 403].includes(error?.response?.status)) {
          configureAuthorization(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [api]);

  /** Chrome Web Request */
  useEffect(() => {
    const handleWebRequest = (details) => {
      let newAuth = getAuth
        ? getAuth(details)
        : details.requestHeaders.find((item) => item.name === "Authorization")
            ?.value;

      if (
        compareAuth ? compareAuth(auth, newAuth) : newAuth && newAuth !== auth
      ) {
        /** Set New Auth */
        configureAuthorization(newAuth);

        /** Create Notification */
        chrome.notifications.create(`${id}-auth`, {
          iconUrl: notification.icon,
          title: notification.title,
          message: notification.message,
          type: "basic",
        });
      }
    };

    /** Add Listener */
    if (!auth) {
      chrome?.webRequest?.onSendHeaders.addListener(
        handleWebRequest,
        {
          urls,
        },
        ["requestHeaders"]
      );
    }

    return () => {
      /** Remove Listener */
      chrome?.webRequest?.onSendHeaders.removeListener(handleWebRequest);
    };
  }, [auth]);

  /** Set Auth */
  useEffect(() => {
    const key = `${id}-auth`;

    chrome?.storage?.local.get(key).then((item) => {
      const value = item[key];
      if (value) {
        configureAuthorization(value, false);
      }
    });
  }, []);

  /** Return API and Auth */
  return useMemo(() => ({ api, auth }), [api, auth]);
}

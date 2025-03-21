import axios from "axios";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import useTelegramWebApp from "./useTelegramWebApp";

export default function useDropFarmer({
  id,
  host,
  domains = [],
  authHeaders = ["authorization"],
  extractAuthHeaders,
  notification,
}) {
  /** TelegramWebApp */
  const { port, telegramWebApp, resetTelegramWebApp } = useTelegramWebApp(host);

  /** Auth */
  const [auth, setAuth] = useState(false);

  /** QueryClient */
  const queryClient = useQueryClient();

  /** Axios Instance */
  const api = useMemo(() => axios.create(), []);

  /** Status */
  const status = useMemo(
    () => (!telegramWebApp ? "pending-webapp" : "pending-auth"),
    [telegramWebApp]
  );

  /** Domain Matches */
  const domainMatches = useMemo(
    () => domains.map((domain) => `*://${domain}/*`),
    [domains]
  );

  /** Reset Auth */
  const resetAuth = useCallback(() => {
    setAuth(false);
  }, [setAuth]);

  /** Enforce only one request */

  useEffect(() => {
    let isRequestInProgress = false;
    let requestQueue = [];

    const processNextRequest = () => {
      if (requestQueue.length === 0) {
        isRequestInProgress = false;
        return;
      }

      const { config, resolve } = requestQueue.shift();

      isRequestInProgress = true;

      resolve(config);
    };

    api.interceptors.request.use(
      (config) => {
        if (isRequestInProgress) {
          return new Promise((resolve, reject) => {
            requestQueue.push({ config, resolve, reject });
          });
        }

        isRequestInProgress = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => {
        processNextRequest();
        return response;
      },
      (error) => {
        processNextRequest();
        return Promise.reject(error);
      }
    );
  }, [api]);

  /** Response Interceptor */
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => Promise.resolve(response),
      (error) => {
        if ([401, 403, 418].includes(error?.response?.status)) {
          toast.dismiss();
          toast.error("Unauthenticated - Please reload the Farmer");
          resetAuth();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [queryClient, api, resetAuth]);

  /** Handle Web Request */
  useEffect(() => {
    const handleWebRequest = (details) => {
      const headers = extractAuthHeaders
        ? extractAuthHeaders(details.requestHeaders, telegramWebApp)
        : details.requestHeaders.filter((header) => {
            return authHeaders.includes(header.name.toLowerCase());
          });

      headers.forEach((header) => {
        if (header.value !== api.defaults.headers.common[header.name]) {
          api.defaults.headers.common[header.name] = header.value;

          if (header.value) {
            setAuth(true);
          }
        }
      });
    };

    if (domainMatches.length) {
      chrome.webRequest.onSendHeaders.addListener(
        handleWebRequest,
        {
          urls: domainMatches,
        },
        ["requestHeaders"]
      );
    }

    return () =>
      chrome.webRequest.onSendHeaders.removeListener(handleWebRequest);
  }, [
    domainMatches,
    authHeaders,
    extractAuthHeaders,
    telegramWebApp,
    api,
    setAuth,
  ]);

  /** Create Notification */
  useEffect(() => {
    if (auth) {
      chrome?.notifications?.create(`${id}-farmer`, {
        iconUrl: notification.icon,
        title: notification.title,
        message: "Farmer Started",
        type: "basic",
      });
    }

    return () => {
      chrome?.notifications?.clear(`${id}-farmer`);
    };
  }, [id, auth]);

  /** Remove Queries */
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: [id] });
    };
  }, [id, queryClient]);

  /** Return API and Auth */
  return useMemo(
    () => ({
      id,
      api,
      auth,
      queryClient,
      port,
      telegramWebApp,
      resetAuth,
      resetTelegramWebApp,
      status,
    }),
    [
      id,
      api,
      auth,
      queryClient,
      port,
      telegramWebApp,
      resetAuth,
      resetTelegramWebApp,
      status,
    ]
  );
}

import axios from "axios";
import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import useTelegramWebApp from "./useTelegramWebApp";

export default function useDropFarmer({
  id,
  host,
  cache = true,
  authHeader,
  fetchAuth,
  extractAuth,
  notification,
}) {
  /** TelegramWebApp */
  const { telegramWebApp, resetTelegramWebApp } = useTelegramWebApp(
    host,
    cache
  );

  /** Auth */
  const [auth, setAuth] = useState(null);

  /** QueryClient */
  const queryClient = useQueryClient();

  /** Query Key */
  const queryKey = useMemo(
    () => [id, "auth", telegramWebApp?.initDataUnsafe?.["auth_date"]],
    [id, telegramWebApp]
  );

  /** Axios Instance */
  const api = useMemo(() => axios.create(), []);

  /** Status */
  const status = useMemo(
    () => (!telegramWebApp ? "pending-webapp" : "pending-auth"),
    [telegramWebApp]
  );

  /** QueryFn */
  const queryFn = useCallback(
    () => fetchAuth(api, telegramWebApp),
    [api, telegramWebApp, fetchAuth]
  );

  /** Auth */
  const authQuery = useQuery({
    enabled: Boolean(telegramWebApp),
    queryKey,
    queryFn,
  });

  /** Reset Auth */
  const resetAuth = useCallback(() => {
    queryClient.resetQueries({
      queryKey,
    });
    setAuth(null);
  }, [queryClient, queryKey, setAuth]);

  /** Response Interceptor */
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => Promise.resolve(response),
      (error) => {
        if ([401, 403, 418].includes(error?.response?.status)) {
          resetTelegramWebApp();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [queryClient, api, resetTelegramWebApp]);

  /** Request Header */
  useEffect(() => {
    if (authQuery.data) {
      /** Extract and Set Authorization Header */
      let Authorization = extractAuth(authQuery.data);
      if (Authorization) {
        api.defaults.headers.common[authHeader || "Authorization"] =
          Authorization;
      }
      /** Set Auth */
      setAuth(authQuery.data);
    } else {
      /** Remove Authorization Header */
      delete api.defaults.headers.common[authHeader || "Authorization"];

      /** Remove Auth */
      setAuth(null);
    }
  }, [api, authQuery.data, setAuth, extractAuth, authHeader]);

  /** Create Notification */
  useEffect(() => {
    if (authQuery.status === "success") {
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
  }, [id, authQuery.status]);

  /** Remove Queries */
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: [id] });
    };
  }, [id, queryClient]);

  /** Return API and Auth */
  return useMemo(
    () => ({
      api,
      auth,
      authQuery,
      queryClient,
      queryKey,
      telegramWebApp,
      resetAuth,
      resetTelegramWebApp,
      status,
    }),
    [
      api,
      auth,
      authQuery,
      queryClient,
      queryKey,
      telegramWebApp,
      resetAuth,
      resetTelegramWebApp,
      status,
    ]
  );
}

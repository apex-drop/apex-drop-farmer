import useDropFarmer from "@/hooks/useDropFarmer";

import YescoinIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useYescoinFarmer() {
  return useDropFarmer({
    id: "yescoin",
    host: "www.yescoin.gold",
    notification: {
      icon: YescoinIcon,
      title: "Yescoin Farmer",
    },
    authHeader: "Token",
    fetchAuth: (api, telegramWebApp) =>
      api
        .post("https://api-backend.yescoin.gold/user/login", {
          code: decodeURIComponent(telegramWebApp.initData),
        })
        .then((res) => res.data.data),
    extractAuth: (data) => `${data?.["token"]}`,
  });
}

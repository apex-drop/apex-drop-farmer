import useDropFarmer from "@/hooks/useDropFarmer";

import TadaIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useTadaFarmer() {
  return useDropFarmer({
    id: "tada",
    host: "tada-mini.mvlchain.io",
    notification: {
      icon: TadaIcon,
      title: "Tada Farmer",
    },
    fetchAuth: (api, telegramWebApp) =>
      api
        .post("https://backend.clutchwalletserver.xyz/tada-ton/v1/auth/login", {
          initData: telegramWebApp.initData,
        })
        .then((res) => res.data),
    extractAuth: (data) => `Bearer ${data?.accessToken}`,
  });
}

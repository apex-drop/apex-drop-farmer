import useDropFarmer from "@/hooks/useDropFarmer";

import WontonIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useWontonFarmer() {
  return useDropFarmer({
    id: "wonton",
    host: "www.wonton.restaurant",
    notification: {
      icon: WontonIcon,
      title: "Wonton Farmer",
    },
    fetchAuth: (api, telegramWebApp) =>
      api
        .post("https://wonton.food/api/v1/user/auth", {
          initData: telegramWebApp.initData,
          inviteCode: "",
          newUserPromoteCode: "",
        })
        .then((res) => res.data),
    extractAuth: (data) => `bearer ${data?.tokens?.accessToken}`,
  });
}

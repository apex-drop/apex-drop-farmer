import useDropFarmer from "@/hooks/useDropFarmer";

import BitsIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useBitsFarmer() {
  return useDropFarmer({
    id: "bits",
    host: "bits.apps-tonbox.me",
    notification: {
      icon: BitsIcon,
      title: "Bits Farmer",
    },
    fetchAuth: (api, telegramWebApp) =>
      api
        .post("https://api-bits.apps-tonbox.me/api/v1/auth", {
          data: telegramWebApp.initData,
          device: "Android",
        })
        .then((res) => res.data),
    extractAuth: (data) => null,
  });
}

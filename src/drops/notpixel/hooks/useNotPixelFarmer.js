import useDropFarmer from "@/hooks/useDropFarmer";

import NotPixelIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useNotPixelFarmer() {
  return useDropFarmer({
    id: "notpixel",
    host: "app.notpx.app",
    notification: {
      icon: NotPixelIcon,
      title: "NotPixel Farmer",
    },
    cache: false,
    fetchAuth: (api, telegramWebApp) =>
      Promise.resolve({ auth: telegramWebApp.initData }),
    extractAuth: (data) => `initData ${data.auth}`,
  });
}
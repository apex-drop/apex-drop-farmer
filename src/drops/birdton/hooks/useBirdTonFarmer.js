import useDropFarmer from "@/hooks/useDropFarmer";

import BirdTonIcon from "../assets/images/icon.png?format=webp";

export default function useBirdTonFarmer() {
  return useDropFarmer({
    id: "birdton",
    host: "birdton.site",
    notification: {
      icon: BirdTonIcon,
      title: "BirdTon Farmer",
    },
    fetchAuth: (api, telegramWebApp) =>
      api
        .post("https://birdton.site/auth", telegramWebApp)
        .then((res) => res.data),
    extractAuth: (data) => null,
  });
}

import useDropFarmer from "@/hooks/useDropFarmer";

import HrumIcon from "../assets/images/icon.png?format=webp";
import { getHrumHeaders } from "../lib/utils";

export default function useHrumFarmer() {
  return useDropFarmer({
    id: "hrum",
    host: "game.hrum.me",
    notification: {
      icon: HrumIcon,
      title: "Hrum Farmer",
    },
    fetchAuth: (api, telegramWebApp) => {
      const body = {
        data: {
          initData: telegramWebApp.initData,
          startParam: telegramWebApp.initDataUnsafe["start_param"],
          platform: telegramWebApp.platform,
          chatId: "",
          chatType: telegramWebApp.initDataUnsafe["chat_type"],
          chatInstance: telegramWebApp.initDataUnsafe["chat_instance"],
        },
      };

      return api
        .post("https://api.hrum.me/telegram/auth", body, {
          headers: getHrumHeaders(body),
        })
        .then((res) => res.data.data);
    },
    extractAuth: (data) => null,
  });
}

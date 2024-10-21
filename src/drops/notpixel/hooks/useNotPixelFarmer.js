import useDropFarmer from "@/hooks/useDropFarmer";
import useRequestData from "@/hooks/useRequestData";
import { useMemo } from "react";

import NotPixelIcon from "../assets/images/icon.png?format=webp&w=80";

export default function useNotPixelFarmer() {
  const farmer = useDropFarmer({
    id: "notpixel",
    host: "app.notpx.app",
    notification: {
      icon: NotPixelIcon,
      title: "NotPixel Farmer",
    },
    domains: ["notpx.app"],
  });

  const user = useRequestData("https://notpx.app/api/v1/users/me", farmer.port);

  return useMemo(
    () => ({
      ...farmer,
      user,
    }),
    [farmer, user]
  );
}

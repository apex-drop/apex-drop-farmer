import useDropAuthorizationHeader from "@/hooks/useDropAuthorizationHeader";

import TruecoinIcon from "../assets/images/icon.png";

export default function useTruecoinAuthorizationHeader() {
  return useDropAuthorizationHeader({
    urls: ["*://api.true.world/*"],
    notification: {
      id: "truecoin-auth",
      icon: TruecoinIcon,
      title: "Truecoin Farmer",
      message: "Truecoin Auth Detected",
    },
    getAuth(details) {
      let Authorization = details.requestHeaders.find(
        (item) => item.name === "Authorization"
      )?.value;

      let AuthKey = details.requestHeaders.find(
        (item) => item.name === "auth-key"
      )?.value;

      if (Authorization && AuthKey) {
        return {
          Authorization,
          "auth-key": AuthKey,
        };
      }
    },
    compareAuth(oldAuth, newAuth) {
      return (
        oldAuth?.Authorization !== newAuth?.Authorization ||
        oldAuth?.["auth-key"] !== newAuth?.["auth-key"]
      );
    },
  });
}

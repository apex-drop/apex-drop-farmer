import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import useMajorUserQuery from "./useMajorUserQuery";

export default function useMajorGame() {
  const client = useQueryClient();
  const user = useMajorUserQuery();

  return async (start, claim) => {
    try {
      await start();
      await claim();
      await user.refetch();

      toast.success("Claimed Successfully!");
    } catch (e) {
      // Catch Blocked
      const blocked = e.response?.data?.detail?.["blocked_until"];
      if (blocked) {
        toast.error(`Please wait until ${new Date(blocked * 1000)}`, {
          duration: 3000,
        });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
}

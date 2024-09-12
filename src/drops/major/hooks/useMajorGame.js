import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function useMajorGame() {
  const client = useQueryClient();
  return async (start, claim) => {
    try {
      await start();
      await claim();

      toast.success("Claimed Successfully!");

      client.refetchQueries({
        queryKey: ["major", "user"],
      });
    } catch (e) {
      // Catch Blocked
      const blocked = e.response?.data?.detail?.["blocked_until"];
      if (blocked) {
        toast.error(`Please wait until ${new Date(blocked)}`, {
          duration: 3000,
        });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
}

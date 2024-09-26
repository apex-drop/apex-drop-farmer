import toast from "react-hot-toast";
import { formatRelative } from "date-fns";
import useMajorUserQuery from "./useMajorUserQuery";

export default function useMajorGame() {
  const user = useMajorUserQuery();

  return async (start, claim) => {
    try {
      await start();
      await claim();
      await user.refetch();

      toast.success("Claimed Successfully!", {
        style: {
          fontWeight: "bold",
        },
      });
    } catch (e) {
      // Catch Blocked
      const blocked = e.response?.data?.detail?.["blocked_until"];
      if (blocked) {
        toast.error(
          `Please wait till - ${formatRelative(
            new Date(blocked * 1000),
            new Date()
          )}`,
          {
            duration: 3000,
            style: {
              fontWeight: "bold",
            },
          }
        );
      } else {
        toast.error("Something went wrong!", {
          style: {
            fontWeight: "bold",
          },
        });
      }
    }
  };
}

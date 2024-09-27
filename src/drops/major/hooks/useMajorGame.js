import toast from "react-hot-toast";

import useMajorGameErrorHandler from "./useMajorGameErrorHandler";
import useMajorUserQuery from "./useMajorUserQuery";

export default function useMajorGame() {
  const user = useMajorUserQuery();
  const handleError = useMajorGameErrorHandler();

  return async (start, claim) => {
    try {
      await start();
      await claim();
      await user.refetch();

      toast.success("Claimed Successfully!", {
        className: "font-bold font-sans",
      });
    } catch (e) {
      handleError(e);
    }
  };
}

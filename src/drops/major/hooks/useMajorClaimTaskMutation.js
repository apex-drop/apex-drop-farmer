import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useMajorAuth from "./useMajorAuth";

export default function useMajorClaimTaskMutation() {
  const Authorization = useMajorAuth();

  return useMutation({
    mutationKey: ["major", "task", "claim"],
    mutationFn: (id) =>
      axios
        .post(
          "https://major.bot/api/tasks/",
          { task_id: id },
          {
            withCredentials: true,
            headers: {
              Authorization,
            },
          }
        )
        .then((res) => res.data),
  });
}

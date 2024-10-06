import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useNotPixelConfigQuery() {
  return useQuery({
    queryKey: ["notpx", "config"],
    queryFn: ({ signal }) =>
      axios
        .get(
          "https://npx-cdn.fra1.cdn.digitaloceanspaces.com/base/config.yml",
          {
            signal,
          }
        )
        .then((res) => res.data),
  });
}

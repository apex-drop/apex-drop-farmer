import { useMutation } from "@tanstack/react-query";

import useNotPixelApi from "./useNotPixelApi";

export default function useNotPixelRepaintMutation() {
  const api = useNotPixelApi();
  return useMutation({
    mutationKey: ["notpixel", "repaint"],
    mutationFn: (data = { newColor: null, pixelId: null }) =>
      api
        .post("https://notpx.app/api/v1/repaint/start", data)
        .then((res) => res.data),
  });
}

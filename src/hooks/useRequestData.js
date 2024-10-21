import { postPortMessage } from "@/lib/utils";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";

export default function useRequestData(url, port) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (url && port) {
      postPortMessage(port, {
        action: "get-request-data",
        data: {
          url,
        },
      }).then((message) => {
        setData(message.data);
      });
    }
  }, [url, port]);

  return useMemo(() => [data, setData], [data, setData]);
}

import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

import { getCoords } from "../lib/utils";

export default function useNotPixelDiff(items) {
  const [diff, setDiff] = useState([]);

  /** Update the diff */
  const updateDiff = useCallback(
    (updates) => {
      const result = [];

      items?.forEach((item) => {
        for (let i = 0; i < item.pixels.length; i++) {
          let { offset } = getCoords(i, item);
          let pixelId = offset + 1;

          if (pixelId in updates && updates[pixelId] !== item.pixels[i]) {
            result.push([pixelId, item.pixels[i]]);
          }
        }
      });

      setDiff(result >= 50 ? result : []);
    },
    [items, setDiff]
  );

  /** Reset the diff */
  const resetDiff = useCallback(() => {
    setDiff([]);
  }, [setDiff]);

  return useMemo(
    () => ({
      diff,
      updateDiff,
      resetDiff,
    }),
    [diff, updateDiff, resetDiff]
  );
}

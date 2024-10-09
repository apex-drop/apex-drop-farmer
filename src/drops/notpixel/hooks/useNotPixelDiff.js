import { useEffect } from "react";
import { useState } from "react";

import { getCoords } from "../lib/utils";

export default function useNotPixelDiff(items, worldPixels, worldUpdatedAt) {
  const [diff, setDiff] = useState([]);

  useEffect(() => {
    if (!items || !worldPixels) {
      return;
    }

    const result = [];

    items.forEach((item) => {
      for (let i = 0; i < item.pixels.length; i++) {
        let { offset } = getCoords(i, item);

        if (worldPixels[offset].color !== item.pixels[i].color) {
          result.push([offset + 1, item.pixels[i]]);
        }
      }
    });

    /** Sort the result */
    result.sort((a, b) => b[1].updatedAt - a[1].updatedAt);

    setDiff(result);
  }, [items, worldPixels, worldUpdatedAt, setDiff]);

  return diff;
}

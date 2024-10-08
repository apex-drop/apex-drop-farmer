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

    if (worldUpdatedAt >= Date.now() - 100) {
      items.forEach((item) => {
        for (let i = 0; i < item.pixels.length; i++) {
          let { offset } = getCoords(i, item);

          if (
            worldPixels[offset].color !== item.pixels[i].color &&
            worldPixels[offset].updatedAt >= Date.now() - 100
          ) {
            result.push([offset + 1, item.pixels[i]]);
          }
        }
      });
    }

    setDiff(result);
  }, [items, worldPixels, worldUpdatedAt, setDiff]);

  return diff;
}

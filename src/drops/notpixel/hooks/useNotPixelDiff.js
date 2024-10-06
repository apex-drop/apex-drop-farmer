import { useEffect } from "react";
import { useState } from "react";

export default function useNotPixelDiff(items, worldData) {
  const [diff, setDiff] = useState([]);

  useEffect(() => {
    if (!items || !worldData) {
      return;
    }

    const result = [];

    items.forEach((item) => {
      for (let i = 0; i < item.imageData.length; i++) {
        let x = i % item.size;
        let y = Math.floor(i / item.size);

        let positionX = item.x + x;
        let positionY = item.y + y;

        let offset = positionY * 1000 + positionX;

        if (worldData[offset] !== item.imageData[i]) {
          result.push([offset, item.imageData[i]]);
        }
      }
    });

    if (result.length) {
      setDiff(result);
    }
  }, [items, worldData, setDiff]);

  return diff;
}

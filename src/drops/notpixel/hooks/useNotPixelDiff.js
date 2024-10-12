import { useEffect } from "react";
import { useState } from "react";

export default function useNotPixelDiff(pixels, worldPixels) {
  const [diff, setDiff] = useState([]);

  useEffect(() => {
    const result = [];

    for (let pixelId in pixels) {
      if (pixels[pixelId].color !== worldPixels[pixelId]?.color) {
        result.push(pixels[pixelId]);
      }
    }

    setDiff(result);
  }, [pixels, worldPixels, setDiff]);

  return diff;
}

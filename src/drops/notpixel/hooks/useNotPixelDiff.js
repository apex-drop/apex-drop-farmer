import { useEffect } from "react";
import { useState } from "react";

export default function useNotPixelDiff(pixels, worldPixels) {
  const [diff, setDiff] = useState([]);

  useEffect(() => {
    const result = [];

    for (let pixelId in pixels) {
      if (worldPixels[pixelId] !== pixels[pixelId]) {
        result.push([pixelId, pixels[pixelId]]);
      }
    }

    setDiff(result);
  }, [pixels, worldPixels, setDiff]);

  return diff;
}

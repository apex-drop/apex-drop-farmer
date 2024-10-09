import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

import { imageDataToHex, loadImage } from "../lib/utils";

export default function useNotPixelData() {
  const [started, setStarted] = useState(false);
  const [items, setItems] = useState(null);

  /** Configure Not Pixel Images */
  const configureNotPixel = useCallback(
    (data) => {
      Promise.all(
        data.map((item) => loadImage("https://app.notpx.app" + item.image))
      )
        .then((images) => {
          const offscreenCanvas = new OffscreenCanvas(1000, 1000);
          const offscreenCtx = offscreenCanvas.getContext("2d", {
            willReadFrequently: true,
          });

          /** Items */
          const items = images.map((image, index) => {
            const item = data[index];

            const x =
              Math.sign(item.x) === -1
                ? offscreenCanvas.width + item.x
                : item.x;
            const y =
              Math.sign(item.y) === -1
                ? offscreenCanvas.height + item.y
                : item.y;

            /** Draw Image */
            offscreenCtx.drawImage(image, x, y, item.size, item.size);

            return {
              x,
              y,
              size: item.size,
              image,
              pixels: imageDataToHex(
                offscreenCtx.getImageData(x, y, item.size, item.size).data
              ),
            };
          });

          /** Set Items */
          setItems(items);

          /** Start */
          setStarted(true);
        })
        .catch((e) => {});
    },
    [setItems, setStarted]
  );

  return useMemo(
    () => ({
      started,
      items,
      configureNotPixel,
    }),
    [started, items, configureNotPixel]
  );
}

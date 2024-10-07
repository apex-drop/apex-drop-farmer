import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

import {
  getCoords,
  imageDataToPixel,
  loadImage,
  rgbToPixel,
} from "../lib/utils";

export default function useNotPixelData() {
  const [started, setStarted] = useState(false);
  const [worldPixels, setWorldPixels] = useState(null);
  const [worldUpdatedAt, setWorldUpdatedAt] = useState(() => Date.now());
  const [items, setItems] = useState(null);

  const updatePixels = useCallback(
    (updates) => {
      if (updates.length < 1) return;
      setWorldPixels((prev) => {
        let newWorldPixels = { ...prev };

        for (let [pos, color] of updates) {
          const offset = pos - 1;
          if (offset in newWorldPixels) {
            newWorldPixels[offset].color = color;
            newWorldPixels[offset].updatedAt = Date.now();
          }
        }

        return newWorldPixels;
      });

      setWorldUpdatedAt(Date.now());
    },
    [setWorldPixels]
  );

  /** Configure Not Pixel Images */
  const configureNotPixel = useCallback((data) => {
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
            Math.sign(item.x) === -1 ? offscreenCanvas.width + item.x : item.x;
          const y =
            Math.sign(item.y) === -1 ? offscreenCanvas.height + item.y : item.y;

          /** Draw Image */
          offscreenCtx.drawImage(image, x, y, item.size, item.size);

          return {
            x,
            y,
            size: item.size,
            image,
            pixels: imageDataToPixel(
              offscreenCtx.getImageData(x, y, item.size, item.size).data
            ),
          };
        });

        /** Set Items */
        setItems(items);

        /** Load Current World */
        loadImage("https://image.notpx.app/api/v2/image").then((image) => {
          offscreenCtx.drawImage(image, 0, 0);
          const worldImageData = offscreenCtx.getImageData(
            0,
            0,
            offscreenCanvas.width,
            offscreenCanvas.height
          ).data;

          let result = {};

          items.forEach((item) => {
            for (let i = 0; i < item.pixels.length; i++) {
              let { offset } = getCoords(i, item);
              let imageDataOffset = offset * 4;
              let [r, g, b, a] = [
                worldImageData[imageDataOffset + 0],
                worldImageData[imageDataOffset + 1],
                worldImageData[imageDataOffset + 2],
                worldImageData[imageDataOffset + 3],
              ];

              result[offset] = rgbToPixel(r, g, b);
            }
          });

          setWorldPixels(result);
          setStarted(true);
        });
      })
      .catch((e) => {});
  }, []);

  return useMemo(
    () => ({
      started,
      items,
      worldPixels,
      worldUpdatedAt,
      configureNotPixel,
      updatePixels,
    }),
    [
      started,
      items,
      worldPixels,
      configureNotPixel,
      updatePixels,
      worldUpdatedAt,
    ]
  );
}

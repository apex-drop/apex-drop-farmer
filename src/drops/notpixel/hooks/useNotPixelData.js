import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

import { imageDataToHex, loadImage } from "../lib/utils";

export default function useNotPixelData() {
  const [started, setStarted] = useState(false);
  const [worldData, setWorldData] = useState(null);
  const [items, setItems] = useState(null);

  const updatePixels = useCallback(
    (updates) => {
      if (updates.length < 1) return;
      setWorldData((prev) => {
        let newWorldData = [...prev];

        for (let [pos, color] of updates) {
          newWorldData[pos] = color;
        }

        return newWorldData;
      });
    },
    [setWorldData]
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

        /** Set Items */
        setItems(
          images.map((image, index) => {
            const item = data[index];
            let imageData;

            const x =
              Math.sign(item.x) === -1
                ? offscreenCanvas.width + item.x
                : item.x;
            const y =
              Math.sign(item.y) === -1
                ? offscreenCanvas.width + item.y
                : item.y;

            offscreenCtx.drawImage(image, x, y, item.size, item.size);

            imageData = imageDataToHex(
              offscreenCtx.getImageData(x, y, item.size, item.size).data
            );

            return {
              x,
              y,
              size: item.size,
              image,
              imageData,
            };
          })
        );

        /** Load Current World */
        loadImage("https://image.notpx.app/api/v2/image").then((image) => {
          offscreenCtx.drawImage(image, 0, 0);
          setWorldData(
            imageDataToHex(
              offscreenCtx.getImageData(
                0,
                0,
                offscreenCanvas.width,
                offscreenCanvas.height
              ).data
            )
          );
          setStarted(true);
        });
      })
      .catch((e) => {});
  }, []);

  return useMemo(
    () => ({
      started,
      items,
      worldData,
      configureNotPixel,
      updatePixels,
    }),
    [started, items, worldData, configureNotPixel, updatePixels]
  );
}
